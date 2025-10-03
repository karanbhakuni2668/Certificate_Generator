import React from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Stack, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  Avatar,
  Divider
} from '@mui/material'
import {
  CheckCircleOutlineOutlined,
  TimelineOutlined,
  GroupOutlined,
  SchoolOutlined,
  EmojiEventsOutlined,
  TrendingUpOutlined,
  CodeOutlined,
  CloudQueueOutlined
} from '@mui/icons-material'

export default function About() {
  const timeline = [
    {
      year: '2024',
      title: 'EventEye Launch',
      description: 'Started with a vision to revolutionize event management',
      icon: <CodeOutlined sx={{ color: '#a78bfa' }} />
    },
    {
      year: '2024',
      title: 'First Hackathon',
      description: 'Successfully organized our first tech hackathon with 500+ participants',
      icon: <GroupOutlined sx={{ color: '#22d3ee' }} />
    },
    {
      year: '2024',
      title: 'Platform Expansion',
      description: 'Added advanced features like real-time analytics and automated certificates',
      icon: <TrendingUpOutlined sx={{ color: '#34d399' }} />
    },
    {
      year: '2024',
      title: 'Cloud Integration',
      description: 'Migrated to Firebase for enhanced scalability and security',
      icon: <CloudQueueOutlined sx={{ color: '#f59e0b' }} />
    }
  ]

  const team = [
    {
      name: 'Tech Visionaries',
      role: 'Development Team',
      description: 'Passionate developers building the future of event management',
      avatar: '👨‍💻'
    },
    {
      name: 'Event Experts',
      role: 'Operations Team',
      description: 'Experienced organizers ensuring seamless event execution',
      avatar: '🎯'
    },
    {
      name: 'Design Innovators',
      role: 'UI/UX Team',
      description: 'Creative minds crafting beautiful and intuitive interfaces',
      avatar: '🎨'
    }
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
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '40%',
          right: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '10%',
          left: '15%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent)',
          animation: 'float 10s ease-in-out infinite'
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
            About EventEye
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
            variant="h5" 
            sx={{ 
              color: '#fff', 
              opacity: 0.9, 
              mb: 4,
              fontWeight: 400,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              animation: 'fadeInUp 1.4s ease-out'
            }}
          >
            Revolutionizing Event Management with Smart Technology
          </Typography>
        </Box>

        {/* Mission Section */}
        <Paper 
          elevation={0} 
          sx={{
            p: { xs: 4, md: 6 },
            mb: 8,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            animation: 'fadeInUp 1.6s ease-out'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#fff', 
              fontWeight: 700, 
              mb: 4, 
              textAlign: 'center',
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            Our Mission
          </Typography>
          
          <Typography 
            sx={{ 
              color: '#fff', 
              opacity: 0.9, 
              mb: 4,
              fontSize: '1.1rem',
              lineHeight: 1.8,
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto'
            }}
          >
            EventEye ek smart event management platform hai jo hackathons ko plan,
            organize aur execute karne me madad karta hai — registrations se lekar
            judging, certificates aur analytics tak sab kuch ek hi jagah.
          </Typography>

          <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CheckCircleOutlineOutlined sx={{ color: '#a78bfa', mt: 0.5, fontSize: 24 }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                  Easy Onboarding
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  CSV upload, email invites, automated confirmations - seamless participant registration
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CheckCircleOutlineOutlined sx={{ color: '#22d3ee', mt: 0.5, fontSize: 24 }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                  Real-time Updates
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Live schedules, tracks, announcements - keep everyone informed instantly
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CheckCircleOutlineOutlined sx={{ color: '#34d399', mt: 0.5, fontSize: 24 }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                  Judging Workflow
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Custom criteria, scorer dashboards, instant results - fair and transparent evaluation
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <CheckCircleOutlineOutlined sx={{ color: '#f59e0b', mt: 0.5, fontSize: 24 }} />
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                  Automated Certificates
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  Personalized, secure, instantly downloadable certificates with QR verification
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* Timeline Section */}
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
            Our Journey
          </Typography>
          
          <Grid container spacing={4}>
            {timeline.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp ${2 + index * 0.2}s ease-out`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', mr: 2, width: 48, height: 48 }}>
                        {item.icon}
                      </Avatar>
                      <Chip 
                        label={item.year} 
                        sx={{ 
                          bgcolor: 'rgba(167,139,250,0.2)', 
                          color: '#a78bfa',
                          fontWeight: 600
                        }} 
                      />
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#fff', fontWeight: 600, mb: 2 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: '#fff', opacity: 0.8, lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
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
            Our Team
          </Typography>
          
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp ${2.5 + index * 0.2}s ease-out`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 3,
                        fontSize: '2rem',
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#fff', fontWeight: 600, mb: 1 }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      sx={{ color: '#a78bfa', mb: 2, fontWeight: 500 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography sx={{ color: '#fff', opacity: 0.8, lineHeight: 1.6 }}>
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Vision Section */}
        <Paper 
          elevation={0} 
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            textAlign: 'center',
            animation: 'fadeInUp 3s ease-out'
          }}
        >
          <EmojiEventsOutlined sx={{ fontSize: 60, color: '#f59e0b', mb: 3 }} />
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#fff', 
              fontWeight: 700, 
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}
          >
            Our Vision
          </Typography>
          
          <Typography 
            sx={{ 
              color: '#fff', 
              opacity: 0.9, 
              fontSize: '1.1rem',
              lineHeight: 1.8,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Chahe aap campus level ka hackathon kara rahe ho ya national scale par,
            EventEye aapke event ko smooth, engaging aur impact-driven banata hai.
            Hum har event organizer ko powerful tools provide karte hain jo 
            seamless participant experience aur successful events guarantee karte hain.
          </Typography>
        </Paper>
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