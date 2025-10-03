import { useEffect, useState } from 'react'
import { Alert, Box, Button, Chip, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { listenParticipants, setDeliveryStatus, queueSendCertificate, updateParticipant } from '../services/db'

export default function ParticipantTable({ eventId }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!eventId) return
    try {
      const off = listenParticipants(eventId, setRows)
      return () => off?.()
    } catch (e) {
      setError(e?.message || 'Failed to load participants')
    }
  }, [eventId])

  const handleQueue = async (p, channel) => {
    await queueSendCertificate(eventId, p.id, channel, { email: p.email, phone: p.phone })
    await setDeliveryStatus(eventId, p.id, 'queued')
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
                  <Tooltip title="Queue Email">
                    <span>
                      <IconButton size="small" color="primary" onClick={() => handleQueue(p, 'email')} disabled={!p.email}>
                        <SendIcon fontSize="small" />
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
    </Box>
  )
}


