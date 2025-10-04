import { useEffect, useState } from 'react'
import { Alert, Box, Button, Chip, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TextField, Snackbar, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailOutlined from '@mui/icons-material/EmailOutlined'
import { listenParticipants, setDeliveryStatus, queueSendCertificate, updateParticipant } from '../services/db'
import { sendCertificateEmail, initEmailJS, isEmailJSConfigured } from '../services/emailService'
import { generateCertificate } from '../services/certService'

export default function ParticipantTable({ eventId }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' })

  useEffect(() => {
    if (!eventId) return
    try {
      const off = listenParticipants(eventId, setRows)
      return () => off?.()
    } catch (e) {
      setError(e?.message || 'Failed to load participants')
    }
  }, [eventId])

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS()
  }, [])

  const handleQueue = async (p, channel) => {
    if (channel === 'email') {
      await handleSendEmail(p)
    } else {
      await queueSendCertificate(eventId, p.id, channel, { email: p.email, phone: p.phone })
      await setDeliveryStatus(eventId, p.id, 'queued')
    }
  }

  const handleSendEmail = async (participant) => {
    if (!participant.email) {
      setSnackbar({
        open: true,
        message: 'Email address is required to send certificate',
        severity: 'warning'
      })
      return
    }

    if (!isEmailJSConfigured()) {
      setSnackbar({
        open: true,
        message: 'EmailJS configuration incomplete. Please set PUBLIC_KEY in emailService.js',
        severity: 'error'
      })
      return
    }

    setLoading(prev => ({ ...prev, [participant.id]: true }))

    try {
      // Generate certificate first
      const certificateResult = await generateCertificate({
        participant,
        event: { 
          id: eventId, 
          title: 'EventEye Hackathon 2024', 
          date: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        },
        organizer: 'EventEye',
        verifyUrl: `https://eventeye.example.com/verify?event=${encodeURIComponent(eventId)}&p=${encodeURIComponent(participant.id)}`,
        templateId: 1,
      })

      // Prepare event details
      const eventDetails = {
        id: eventId,
        title: 'EventEye Hackathon 2024',
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        organizer: 'EventEye Team'
      }

      // Send email with certificate data
      const emailResult = await sendCertificateEmail(participant, eventDetails, certificateResult)

      if (emailResult.success) {
        await setDeliveryStatus(eventId, participant.id, 'sent')
        setSnackbar({
          open: true,
          message: `Certificate email sent successfully to ${participant.name}`,
          severity: 'success'
        })
      } else {
        await setDeliveryStatus(eventId, participant.id, 'failed')
        setSnackbar({
          open: true,
          message: `Failed to send email to ${participant.name}: ${emailResult.message}`,
          severity: 'error'
        })
      }

    } catch (error) {
      console.error('Email sending error:', error)
      await setDeliveryStatus(eventId, participant.id, 'failed')
      setSnackbar({
        open: true,
        message: `Error sending email to ${participant.name}: ${error.message}`,
        severity: 'error'
      })
    } finally {
      setLoading(prev => ({ ...prev, [participant.id]: false }))
    }
  }

  const handleInlineChange = (pid, field, value) => {
    setRows((prev) => prev.map((r) => (r.id === pid ? { ...r, [field]: value } : r)))
  }

  const handleSaveRow = async (row) => {
    await updateParticipant(eventId, row)
  }

  if (error) return <Alert severity="error">{error}</Alert>
  if (!rows.length) return <Alert severity="info">No participants yet. Upload a CSV first.</Alert>

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id} hover>
              <TableCell>
                <TextField size="small" value={p.name || ''} onChange={(e) => handleInlineChange(p.id, 'name', e.target.value)} />
              </TableCell>
              <TableCell>
                <TextField size="small" value={p.email || ''} onChange={(e) => handleInlineChange(p.id, 'email', e.target.value)} />
              </TableCell>
              <TableCell>
                <TextField size="small" value={p.phone || ''} onChange={(e) => handleInlineChange(p.id, 'phone', e.target.value)} />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined" onClick={() => handleSaveRow(p)}>Save</Button>
                  <Tooltip title="Send Certificate Email">
                    <span>
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => handleQueue(p, 'email')} 
                        disabled={!p.email || loading[p.id]}
                      >
                        {loading[p.id] ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <EmailOutlined fontSize="small" />
                        )}
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Queue WhatsApp">
                    <span>
                      <IconButton size="small" color="success" onClick={() => handleQueue(p, 'whatsapp')} disabled={!p.phone}>
                        <WhatsAppIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}


