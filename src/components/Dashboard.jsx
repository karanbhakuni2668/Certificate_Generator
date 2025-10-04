import { useEffect, useMemo, useState } from 'react'
import { 
  Box, 
  Button, 
  Container, 
  Divider, 
  Paper, 
  Stack, 
  TextField, 
  Typography, 
  Tabs, 
  Tab, 
  Snackbar, 
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  Fade,
  Slide
} from '@mui/material'
import {
  CloudUploadOutlined,
  PeopleOutlined,
  PreviewOutlined,
  ScienceOutlined,
  EventOutlined,
  TrendingUpOutlined,
  CheckCircleOutlined,
  ScheduleOutlined
} from '@mui/icons-material'
import UploadCsv from './UploadCsv'
import ParticipantTable from './ParticipantTable'
import CertificatePreview from './CertificatePreview'
import { listenDeliveryStatuses, queueSendCertificate, listenParticipants } from '../services/db'
import { sendBulkCertificateEmails, initEmailJS, isEmailJSConfigured } from '../services/emailService'
import { generateCertificate } from '../services/certService'

export default function Dashboard() {
  const [eventId, setEventId] = useState('demo-event')
  const [tab, setTab] = useState(0)
  const [deliveries, setDeliveries] = useState({})
  const [participants, setParticipants] = useState([])
  const [toast, setToast] = useState(null)
  const [bulkLoading, setBulkLoading] = useState(false)

  useEffect(() => {
    if (!eventId) return
    const off = listenDeliveryStatuses(eventId, setDeliveries)
    return () => off?.()
  }, [eventId])

  useEffect(() => {
    if (!eventId) return
    const off = listenParticipants(eventId, setParticipants)
    return () => off?.()
  }, [eventId])

  // Initialize EmailJS on component mount
  useEffect(() => {
    initEmailJS()
  }, [])

  const stats = useMemo(() => {
    const vals = Object.values(deliveries)
    return vals.reduce(
      (acc, d) => {
        acc[d.status] = (acc[d.status] || 0) + 1
        return acc
      },
      { queued: 0, sent: 0, bounced: 0, failed: 0, pending: 0 }
    )
  }, [deliveries])

  const handleBulkSend = async (channel) => {
    if (channel === 'email') {
      await handleBulkEmailSend()
    } else {
      setToast({ severity: 'info', msg: `Queued all visible participants for ${channel}` })
      // WhatsApp bulk functionality can be added later
    }
  }

  const handleBulkEmailSend = async () => {
    if (participants.length === 0) {
      setToast({ severity: 'warning', msg: 'No participants found. Please upload CSV first.' })
      return
    }

    if (!isEmailJSConfigured()) {
      setToast({ severity: 'error', msg: 'EmailJS configuration incomplete. Please set PUBLIC_KEY in emailService.js' })
      return
    }

    const participantsWithEmail = participants.filter(p => p.email && p.email.trim())
    
    if (participantsWithEmail.length === 0) {
      setToast({ severity: 'warning', msg: 'No participants with email addresses found.' })
      return
    }

    setBulkLoading(true)
    setToast({ severity: 'info', msg: `Sending emails to ${participantsWithEmail.length} participants...` })

    try {
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

      // Generate certificates for all participants
      const certificateData = {}
      for (const participant of participantsWithEmail) {
        try {
          const certificateResult = await generateCertificate({
            participant,
            event: eventDetails,
            organizer: 'EventEye',
            verifyUrl: `https://eventeye.example.com/verify?event=${encodeURIComponent(eventId)}&p=${encodeURIComponent(participant.id)}`,
            templateId: 1,
          })
          certificateData[participant.id] = certificateResult
        } catch (error) {
          console.error(`Failed to generate certificate for ${participant.name}:`, error)
        }
      }

      // Send bulk emails
      const results = await sendBulkCertificateEmails(participantsWithEmail, eventDetails, certificateData)
      
      // Count results
      const successful = results.filter(r => r.success).length
      const failed = results.filter(r => !r.success).length

      setToast({ 
        severity: successful > 0 ? 'success' : 'error', 
        msg: `Bulk email completed: ${successful} sent, ${failed} failed` 
      })

    } catch (error) {
      console.error('Bulk email error:', error)
      setToast({ severity: 'error', msg: `Bulk email failed: ${error.message}` })
    } finally {
      setBulkLoading(false)
    }
  }

  const tabIcons = [
    <CloudUploadOutlined />,
    <PeopleOutlined />,
    <PreviewOutlined />
  ]

  const tabLabels = [
    'Upload CSV',
    'Participants', 
    'Preview'
  ]

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <Box sx={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '40%',
          right: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          left: '15%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent)',
          animation: 'float 10s ease-in-out infinite'
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              letterSpacing: 0.5,
              background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '2.5rem' },
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            EventEye Dashboard
          </Typography>
          
          <Paper 
            elevation={0} 
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              animation: 'fadeInUp 1.2s ease-out'
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                  Event Management Center
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Manage your event participants, certificates, and analytics all in one place
                </Typography>
              </Box>
              
              <TextField 
                size="medium" 
                label="Event ID" 
                value={eventId} 
                onChange={(e) => setEventId(e.target.value)}
                sx={{
                  minWidth: 200,
                  '& .MuiInputBase-input': { color: '#fff' },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                  '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a78bfa' }
                }}
              />
        </Stack>
      </Paper>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <Card 
              sx={{ 
                background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.1))',
                border: '1px solid rgba(167,139,250,0.3)',
                animation: 'fadeInUp 1.4s ease-out'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', mx: 'auto', mb: 2 }}>
                  <ScheduleOutlined sx={{ color: '#a78bfa' }} />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#a78bfa', fontWeight: 700, mb: 1 }}>
                  {stats.queued}
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>Queued</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Card 
              sx={{ 
                background: 'linear-gradient(135deg, rgba(34,211,153,0.2), rgba(34,211,153,0.1))',
                border: '1px solid rgba(34,211,153,0.3)',
                animation: 'fadeInUp 1.6s ease-out'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: 'rgba(34,211,153,0.2)', mx: 'auto', mb: 2 }}>
                  <CheckCircleOutlined sx={{ color: '#22c55e' }} />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#22c55e', fontWeight: 700, mb: 1 }}>
                  {stats.sent}
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>Sent</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Card 
              sx={{ 
                background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.1))',
                border: '1px solid rgba(239,68,68,0.3)',
                animation: 'fadeInUp 1.8s ease-out'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: 'rgba(239,68,68,0.2)', mx: 'auto', mb: 2 }}>
                  <TrendingUpOutlined sx={{ color: '#ef4444' }} />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 700, mb: 1 }}>
                  {stats.bounced}
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>Bounced</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Card 
              sx={{ 
                background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.1))',
                border: '1px solid rgba(245,158,11,0.3)',
                animation: 'fadeInUp 2s ease-out'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: 'rgba(245,158,11,0.2)', mx: 'auto', mb: 2 }}>
                  <EventOutlined sx={{ color: '#f59e0b' }} />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#f59e0b', fontWeight: 700, mb: 1 }}>
                  {stats.pending}
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>Pending</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mb: 4 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large"
              onClick={() => handleBulkSend('email')}
              disabled={bulkLoading}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #9333ea, #0891b2)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {bulkLoading ? 'Sending Emails...' : 'Bulk Send Email'}
            </Button>
            
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => handleBulkSend('whatsapp')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#34d399',
                  backgroundColor: 'rgba(52,211,153,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Bulk Send WhatsApp
            </Button>
          </Stack>
        </Box>

        {/* Main Content */}
        <Paper 
          elevation={0} 
          sx={{
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            overflow: 'hidden',
            animation: 'fadeInUp 2.2s ease-out'
          }}
        >
          <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Tabs 
              value={tab} 
              onChange={(e, v) => setTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'none',
                  fontWeight: 500,
                  minHeight: 64,
                  '&.Mui-selected': {
                    color: '#a78bfa'
                  }
                },
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                  height: 3,
                  borderRadius: 2
                }
              }}
            >
              {tabLabels.map((label, index) => (
                <Tab 
                  key={index}
                  label={label} 
                  icon={tabIcons[index]}
                  iconPosition="start"
                  sx={{ minWidth: 150 }}
                />
              ))}
        </Tabs>
          </Box>
          
          <Box sx={{ p: 4, minHeight: 500 }}>
            <Fade in={tab === 0} timeout={300}>
              <Box sx={{ display: tab === 0 ? 'block' : 'none' }}>
                <UploadCsv eventId={eventId} />
              </Box>
            </Fade>
            
            <Fade in={tab === 1} timeout={300}>
              <Box sx={{ display: tab === 1 ? 'block' : 'none' }}>
                <ParticipantTable eventId={eventId} onQueue={(pid, channel) => queueSendCertificate(eventId, pid, channel)} />
              </Box>
            </Fade>
            
            <Fade in={tab === 2} timeout={300}>
              <Box sx={{ display: tab === 2 ? 'block' : 'none' }}>
                <CertificatePreview eventId={eventId} />
              </Box>
            </Fade>
          </Box>
      </Paper>

        {/* Toast Notifications */}
        <Snackbar 
          open={!!toast} 
          autoHideDuration={3000} 
          onClose={() => setToast(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            severity={toast?.severity || 'info'} 
            variant="filled"
            sx={{
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: '1.2rem'
              }
            }}
          >
            {toast?.msg}
          </Alert>
      </Snackbar>
    </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  )
}



