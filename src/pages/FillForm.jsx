import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  Avatar,
  Divider
} from '@mui/material'
import {
  AssignmentOutlined,
  PersonOutlined,
  EmailOutlined,
  PhoneOutlined,
  MessageOutlined,
  SendOutlined,
  CheckCircleOutlined,
  StarOutlined,
  BadgeOutlined,
  SchoolOutlined
} from '@mui/icons-material'

export default function FillForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeRegNo: '',
    college: '',
    eventType: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setBusy(false)
  }

  const eventTypes = [
    'Workshop',
    'Conference',
    'Hackathon',
    'Seminar',
    'Training',
    'Webinar',
    'Other'
  ]

  const punjabColleges = [
    'Lovely Professional University (LPU)',
    'Punjab Engineering College (PEC)',
    'Guru Nanak Dev University (GNDU)',
    'Panjab University (PU)',
    'Thapar Institute of Engineering and Technology',
    'Chandigarh University',
    'Guru Gobind Singh Indraprastha University',
    'Punjab Agricultural University (PAU)',
    'Guru Jambheshwar University of Science and Technology',
    'Baba Farid University of Health Sciences',
    'Maharaja Ranjit Singh Punjab Technical University',
    'Punjabi University',
    'Punjab Technical University (PTU)',
    'Rayat Bahra University',
    'Amity University Punjab',
    'Lala Lajpat Rai Institute of Engineering and Technology',
    'Guru Nanak Dev Engineering College',
    'Punjab College of Engineering and Technology',
    'Desh Bhagat University',
    'Akal University',
    'Other'
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
          top: '10%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 10s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent)',
          animation: 'float 8s ease-in-out infinite'
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              letterSpacing: 0.5,
              background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            <AssignmentOutlined sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2.5rem' }} />
            Fill Form
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8, fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}>
            Tell us about your event requirements and we'll help you create an amazing experience
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)'
              }}
            >
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircleOutlined sx={{ fontSize: 80, color: '#34d399', mb: 2 }} />
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
                    Form Submitted Successfully!
                  </Typography>
                  <Typography sx={{ color: '#fff', opacity: 0.8, mb: 3 }}>
                    Thank you for your submission. We'll get back to you within 24 hours.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        collegeRegNo: '',
                        college: '',
                        eventType: '',
                        message: ''
                      })
                    }}
                    sx={{
                      background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #9333ea, #0891b2)'
                      }
                    }}
                  >
                    Submit Another Form
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
                    Event Details
                  </Typography>
                  
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      required
                      InputProps={{
                        startAdornment: <PersonOutlined sx={{ color: '#a78bfa', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a78bfa' }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      required
                      InputProps={{
                        startAdornment: <EmailOutlined sx={{ color: '#22d3ee', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22d3ee' }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      InputProps={{
                        startAdornment: <PhoneOutlined sx={{ color: '#34d399', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#34d399' }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="College Registration Number"
                      value={formData.collegeRegNo}
                      onChange={handleInputChange('collegeRegNo')}
                      placeholder="Enter your college registration/roll number"
                      InputProps={{
                        startAdornment: <BadgeOutlined sx={{ color: '#f59e0b', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f59e0b' }
                      }}
                    />

                    <TextField
                      fullWidth
                      select
                      label="College/University (Punjab)"
                      value={formData.college}
                      onChange={handleInputChange('college')}
                      SelectProps={{
                        native: true
                      }}
                      InputProps={{
                        startAdornment: <SchoolOutlined sx={{ color: '#8b5cf6', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#8b5cf6' }
                      }}
                    >
                      <option value="" style={{ color: '#000' }}>Select Your College/University</option>
                      {punjabColleges.map((college) => (
                        <option key={college} value={college} style={{ color: '#000' }}>
                          {college}
                        </option>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      select
                      label="Event Type"
                      value={formData.eventType}
                      onChange={handleInputChange('eventType')}
                      SelectProps={{
                        native: true
                      }}
                      InputProps={{
                        startAdornment: <AssignmentOutlined sx={{ color: '#f59e0b', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f59e0b' }
                      }}
                    >
                      <option value="" style={{ color: '#000' }}>Select Event Type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type} style={{ color: '#000' }}>
                          {type}
                        </option>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Message / Requirements"
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      placeholder="Tell us about your event requirements, expected attendees, special needs, etc."
                      InputProps={{
                        startAdornment: <MessageOutlined sx={{ color: '#f59e0b', mr: 1, mt: 2 }} />
                      }}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f59e0b' }
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={busy}
                      startIcon={<SendOutlined />}
                      fullWidth
                      sx={{
                        py: 2,
                        background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #9333ea, #0891b2)'
                        },
                        '&:disabled': {
                          background: 'rgba(255,255,255,0.2)'
                        }
                      }}
                    >
                      {busy ? 'Submitting...' : 'Submit Form'}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Info Section */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.1))',
                  border: '1px solid rgba(167,139,250,0.3)',
                  borderRadius: 3
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
                    <StarOutlined sx={{ color: '#a78bfa', mr: 1 }} />
                    Why Choose EventEye?
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', width: 32, height: 32 }}>
                        <CheckCircleOutlined sx={{ color: '#a78bfa', fontSize: 20 }} />
                      </Avatar>
                      <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
                        Professional Event Management
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', width: 32, height: 32 }}>
                        <CheckCircleOutlined sx={{ color: '#a78bfa', fontSize: 20 }} />
                      </Avatar>
                      <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
                        Automated Certificate Generation
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', width: 32, height: 32 }}>
                        <CheckCircleOutlined sx={{ color: '#a78bfa', fontSize: 20 }} />
                      </Avatar>
                      <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>
                        24/7 Customer Support
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(34,211,238,0.1))',
                  border: '1px solid rgba(34,211,238,0.3)',
                  borderRadius: 3
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
                    Quick Response
                  </Typography>
                  <Typography sx={{ color: '#fff', opacity: 0.8, fontSize: '0.9rem', mb: 2 }}>
                    We typically respond within 24 hours
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label="Email" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                    <Chip label="Phone" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                    <Chip label="WhatsApp" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </Container>
    </Box>
  )
}
