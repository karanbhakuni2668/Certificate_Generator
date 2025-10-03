import React from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  Stack,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  EventOutlined,
  PeopleOutlined,
  AssessmentOutlined,
  EmailOutlined,
  SpeedOutlined,
  SecurityOutlined,
  CloudOutlined,
  SmartphoneOutlined
} from '@mui/icons-material'

export default function Home() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const features = [
    {
      icon: <PeopleOutlined sx={{ fontSize: 40, color: '#a78bfa' }} />,
      title: 'Participant Management',
      description: 'Upload CSV files, manage participants, and track registrations seamlessly.'
    },
    {
      icon: <EventOutlined sx={{ fontSize: 40, color: '#22d3ee' }} />,
      title: 'Event Organization',
      description: 'Create and manage hackathons, workshops, and tech events with ease.'
    },
    {
      icon: <AssessmentOutlined sx={{ fontSize: 40, color: '#34d399' }} />,
      title: 'Real-time Analytics',
      description: 'Track participant engagement, delivery status, and event metrics.'
    },
    {
      icon: <EmailOutlined sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Automated Certificates',
      description: 'Generate and send personalized certificates via email and WhatsApp.'
    },
    {
      icon: <SpeedOutlined sx={{ fontSize: 40, color: '#ef4444' }} />,
      title: 'Lightning Fast',
      description: 'Built with modern tech stack for optimal performance and reliability.'
    },
    {
      icon: <SecurityOutlined sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'Secure & Reliable',
      description: 'Powered by Firebase with enterprise-grade security and data protection.'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background Elements */}
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
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent)',
          animation: 'float 10s ease-in-out infinite'
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          py: { xs: 8, md: 12 },
          '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(30px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #34d399)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '4rem' },
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            EventEye
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#fff', 
              opacity: 0.9, 
              mb: 4,
              fontWeight: 400,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              animation: 'fadeInUp 1.2s ease-out'
            }}
          >
            Smart Event Management Platform
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#fff', 
              opacity: 0.8, 
              mb: 6,
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6,
              animation: 'fadeInUp 1.4s ease-out'
            }}
          >
            Organize hackathons, workshops, and tech events with ease. From participant registration 
            to certificate generation - all in one powerful platform.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
            sx={{ animation: 'fadeInUp 1.6s ease-out' }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                border: 'none',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 8px 32px rgba(167,139,250,0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #9333ea, #0891b2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(167,139,250,0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#fff',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#a78bfa',
                  backgroundColor: 'rgba(167,139,250,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Why Choose EventEye?
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp ${1.8 + index * 0.1}s ease-out`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      borderColor: 'rgba(167,139,250,0.5)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#fff', 
                        fontWeight: 600, 
                        mb: 2,
                        fontSize: '1.1rem'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: '#fff', 
                        opacity: 0.8,
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box sx={{ py: 8 }}>
          <Paper 
            elevation={0}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 4
            }}
          >
            <Grid container spacing={4} sx={{ textAlign: 'center' }}>
              <Grid item xs={6} md={3}>
                <Typography variant="h3" sx={{ color: '#a78bfa', fontWeight: 800, mb: 1 }}>
                  100+
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Events Organized
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h3" sx={{ color: '#22d3ee', fontWeight: 800, mb: 1 }}>
                  10K+
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Participants
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h3" sx={{ color: '#34d399', fontWeight: 800, mb: 1 }}>
                  99.9%
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Uptime
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="h3" sx={{ color: '#f59e0b', fontWeight: 800, mb: 1 }}>
                  24/7
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Support
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#fff', 
              fontWeight: 700, 
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            Ready to Transform Your Events?
        </Typography>
          
          <Typography 
            sx={{ 
              color: '#fff', 
              opacity: 0.8, 
              mb: 4,
              maxWidth: 500,
              mx: 'auto',
              fontSize: '1.1rem'
            }}
          >
            Join thousands of organizers who trust EventEye for their event management needs.
        </Typography>
          
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 600,
              boxShadow: '0 8px 32px rgba(167,139,250,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #9333ea, #0891b2)',
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 40px rgba(167,139,250,0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Start Your Event Today
          </Button>
      </Box>
    </Container>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  )
}


