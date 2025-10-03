import React, { useState } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Divider, 
  IconButton, 
  Tooltip,
  Card,
  CardContent,
  Stack,
  Chip,
  Fade,
  Slide
} from '@mui/material'
import {
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  AccessTimeOutlined,
  SendOutlined,
  MessageOutlined,
  BusinessOutlined,
  SupportAgentOutlined,
  WhatsApp,
  Telegram,
  LinkedIn,
  GitHub
} from '@mui/icons-material'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', form)
      setForm({ name: '', email: '', message: '' })
      setSubmitStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' })
      setIsSubmitting(false)
      
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: <EmailOutlined sx={{ fontSize: 40, color: '#a78bfa' }} />,
      title: 'Email Support',
      description: 'Get help via email',
      value: 'support@eventeye.dev',
      action: 'mailto:support@eventeye.dev'
    },
    {
      icon: <PhoneOutlined sx={{ fontSize: 40, color: '#22d3ee' }} />,
      title: 'Phone Support',
      description: 'Call us directly',
      value: '+91 98765 43210',
      action: 'tel:+919876543210'
    },
    {
      icon: <WhatsApp sx={{ fontSize: 40, color: '#34d399' }} />,
      title: 'WhatsApp',
      description: 'Quick chat support',
      value: '+91 98765 43210',
      action: 'https://wa.me/919876543210'
    },
    {
      icon: <LocationOnOutlined sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Office Location',
      description: 'Visit our office',
      value: 'Bengaluru, India',
      action: null
    }
  ]

  const socialLinks = [
    { icon: <LinkedIn sx={{ fontSize: 24 }} />, label: 'LinkedIn', url: 'https://linkedin.com/company/eventeye' },
    { icon: <GitHub sx={{ fontSize: 24 }} />, label: 'GitHub', url: 'https://github.com/eventeye' },
    { icon: <Telegram sx={{ fontSize: 24 }} />, label: 'Telegram', url: 'https://t.me/eventeye' },
    { icon: <WhatsApp sx={{ fontSize: 24 }} />, label: 'WhatsApp', url: 'https://wa.me/919876543210' }
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
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 10s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent)',
          animation: 'float 8s ease-in-out infinite'
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 2, 
              letterSpacing: 0.5,
              background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '4rem' },
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            Get In Touch
          </Typography>
          
          <Box sx={{ 
            width: 100, 
            height: 4, 
            mx: 'auto', 
            borderRadius: 999, 
            mb: 4, 
            background: 'linear-gradient(90deg, rgba(167,139,250,0.9), rgba(34,211,238,0.9))',
            animation: 'fadeInUp 1.2s ease-out'
          }} />
          
          <Typography 
            sx={{ 
              color: '#fff', 
              opacity: 0.9, 
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              maxWidth: 600,
              mx: 'auto',
              animation: 'fadeInUp 1.4s ease-out'
            }}
          >
            Ready to revolutionize your events? Have questions about EventEye? 
            We're here to help you create amazing experiences!
          </Typography>
        </Box>

        {/* Contact Methods Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#fff', 
              fontWeight: 700, 
              mb: 6, 
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            Multiple Ways to Reach Us
          </Typography>
          
          <Grid container spacing={4}>
            {contactMethods.map((method, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp ${1.6 + index * 0.1}s ease-out`,
                    cursor: method.action ? 'pointer' : 'default',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      borderColor: 'rgba(167,139,250,0.5)'
                    }
                  }}
                  onClick={() => method.action && window.open(method.action, '_blank')}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      {method.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#fff', fontWeight: 600, mb: 2 }}
                    >
                      {method.title}
                    </Typography>
                    <Typography 
                      sx={{ color: '#fff', opacity: 0.8, mb: 2 }}
                    >
                      {method.description}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: '#a78bfa', 
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}
                    >
                      {method.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Form */}
        <Grid container spacing={6} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                animation: 'fadeInUp 1.8s ease-out',
                height: '100%'
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#fff', 
                  fontWeight: 700, 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <MessageOutlined sx={{ color: '#a78bfa' }} />
                Send us a Message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
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
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
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
                    label="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    multiline
                    minRows={5}
                    required
                    sx={{
                      '& .MuiInputBase-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#34d399' }
                    }}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      color: '#fff',
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, rgba(167,139,250,0.5), rgba(34,211,238,0.5))',
                      border: '1px solid rgba(255,255,255,0.25)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(167,139,250,0.7), rgba(34,211,238,0.7))',
                        transform: 'translateY(-2px)'
                      },
                      '&:disabled': {
                        opacity: 0.6
                      },
                      transition: 'all 0.3s ease'
                    }}
                    startIcon={<SendOutlined />}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  
                  {submitStatus && (
                    <Fade in={!!submitStatus}>
                      <Box 
                        sx={{ 
                          p: 2, 
                          borderRadius: 2,
                          bgcolor: submitStatus.type === 'success' ? 'rgba(34,211,153,0.2)' : 'rgba(239,68,68,0.2)',
                          border: `1px solid ${submitStatus.type === 'success' ? '#34d399' : '#ef4444'}`,
                          color: '#fff'
                        }}
                      >
                        <Typography sx={{ textAlign: 'center', fontWeight: 500 }}>
                          {submitStatus.message}
                        </Typography>
                      </Box>
                    </Fade>
                  )}
                </Stack>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={4} sx={{ height: '100%' }}>
              {/* Office Hours */}
              <Paper 
                elevation={0} 
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  animation: 'fadeInUp 2s ease-out'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#fff', 
                    fontWeight: 700, 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <AccessTimeOutlined sx={{ color: '#22d3ee' }} />
                  Office Hours
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#fff', opacity: 0.9 }}>Monday - Friday</Typography>
                    <Chip 
                      label="10:00 AM - 6:00 PM IST" 
                      sx={{ 
                        bgcolor: 'rgba(34,211,238,0.2)', 
                        color: '#22d3ee',
                        fontWeight: 500
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#fff', opacity: 0.9 }}>Saturday</Typography>
                    <Chip 
                      label="10:00 AM - 2:00 PM IST" 
                      sx={{ 
                        bgcolor: 'rgba(167,139,250,0.2)', 
                        color: '#a78bfa',
                        fontWeight: 500
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#fff', opacity: 0.9 }}>Sunday</Typography>
                    <Chip 
                      label="Closed" 
                      sx={{ 
                        bgcolor: 'rgba(239,68,68,0.2)', 
                        color: '#ef4444',
                        fontWeight: 500
                      }} 
                    />
                  </Box>
                </Stack>
              </Paper>

              {/* Social Links */}
              <Paper 
                elevation={0} 
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  animation: 'fadeInUp 2.2s ease-out'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#fff', 
                    fontWeight: 700, 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <BusinessOutlined sx={{ color: '#34d399' }} />
                  Connect With Us
                </Typography>
                
                <Typography 
                  sx={{ 
                    color: '#fff', 
                    opacity: 0.8, 
                    mb: 3,
                    fontSize: '0.95rem'
                  }}
                >
                  Follow us on social media for updates, tips, and community discussions.
                </Typography>
                
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      size="small"
                      startIcon={social.icon}
                      onClick={() => window.open(social.url, '_blank')}
                      sx={{
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.3)',
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        '&:hover': {
                          borderColor: '#a78bfa',
                          backgroundColor: 'rgba(167,139,250,0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {social.label}
                    </Button>
                  ))}
                </Stack>
              </Paper>

              {/* Quick Support */}
              <Paper 
                elevation={0} 
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  animation: 'fadeInUp 2.4s ease-out'
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#fff', 
                    fontWeight: 700, 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <SupportAgentOutlined sx={{ color: '#f59e0b' }} />
                  Need Quick Help?
                </Typography>
                
                <Typography 
                  sx={{ 
                    color: '#fff', 
                    opacity: 0.8, 
                    mb: 3,
                    fontSize: '0.95rem'
                  }}
                >
                  For urgent support or immediate assistance, reach out to us directly.
                </Typography>
                
                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<WhatsApp />}
                    onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                    sx={{
                      background: 'linear-gradient(135deg, #25d366, #128c7e)',
                      color: '#fff',
                      textTransform: 'none',
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #128c7e, #075e54)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Chat on WhatsApp
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PhoneOutlined />}
                    onClick={() => window.open('tel:+919876543210', '_blank')}
                    sx={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.3)',
                      textTransform: 'none',
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: '#22d3ee',
                        backgroundColor: 'rgba(34,211,238,0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Call Now
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
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