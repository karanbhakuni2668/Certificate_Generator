import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Button,
  TextField,
  Rating
} from '@mui/material'
import {
  RateReviewOutlined,
  StarOutlined,
  PersonOutlined,
  BusinessOutlined,
  SchoolOutlined,
  EmojiEventsOutlined,
  ThumbUpOutlined,
  SendOutlined
} from '@mui/icons-material'

export default function Testimonials() {
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    company: '',
    rating: 5,
    comment: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      company: 'Tech University',
      role: 'Event Coordinator',
      rating: 5,
      comment: 'EventEye transformed our hackathon management completely. The automated certificate generation saved us hours of manual work, and the participant tracking system is incredibly intuitive.',
      avatar: 'SJ',
      verified: true
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      company: 'Innovation Labs',
      role: 'CEO',
      rating: 5,
      comment: 'Outstanding platform! The real-time analytics helped us make data-driven decisions during our tech conference. The team support was exceptional throughout the event.',
      avatar: 'RK',
      verified: true
    },
    {
      id: 3,
      name: 'Emily Chen',
      company: 'Startup Accelerator',
      role: 'Program Manager',
      rating: 4,
      comment: 'Great tool for managing multiple events simultaneously. The dashboard gives us complete visibility into all our programs. Highly recommended for event organizers.',
      avatar: 'EC',
      verified: true
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      company: 'Digital Marketing Agency',
      role: 'Events Director',
      rating: 5,
      comment: 'EventEye made our workshop series seamless. The participant management features are top-notch, and the certificate customization options are fantastic.',
      avatar: 'MR',
      verified: true
    },
    {
      id: 5,
      name: 'Priya Sharma',
      company: 'Educational Institute',
      role: 'Training Head',
      rating: 5,
      comment: 'We\'ve used EventEye for 6 months now, and it has revolutionized our training programs. The automated workflows and participant tracking are game-changers.',
      avatar: 'PS',
      verified: true
    },
    {
      id: 6,
      name: 'David Thompson',
      company: 'Corporate Events Ltd',
      role: 'Event Manager',
      rating: 4,
      comment: 'Excellent platform with great customer support. The Firebase integration works flawlessly, and the real-time updates keep everyone informed.',
      avatar: 'DT',
      verified: true
    }
  ]

  const stats = [
    { label: 'Happy Clients', value: '500+', icon: <PersonOutlined /> },
    { label: 'Events Managed', value: '2000+', icon: <EmojiEventsOutlined /> },
    { label: 'Certificates Generated', value: '50K+', icon: <StarOutlined /> },
    { label: 'Satisfaction Rate', value: '98%', icon: <ThumbUpOutlined /> }
  ]

  const handleSubmitTestimonial = (e) => {
    e.preventDefault()
    console.log('New testimonial:', newTestimonial)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setNewTestimonial({ name: '', company: '', rating: 5, comment: '' })
    }, 3000)
  }

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
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent)',
          animation: 'float 10s ease-in-out infinite'
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
            <RateReviewOutlined sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2.5rem' }} />
            Testimonials
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8, fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}>
            See what our clients say about EventEye and how we've helped them create amazing events
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: 3,
                  textAlign: 'center',
                  p: 3
                }}
              >
                <Avatar sx={{ 
                  bgcolor: 'rgba(167,139,250,0.2)', 
                  mx: 'auto', 
                  mb: 2,
                  width: 56,
                  height: 56
                }}>
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" sx={{ color: '#a78bfa', fontWeight: 700, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials Grid */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} key={testimonial.id}>
              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: 'rgba(167,139,250,0.2)', 
                        width: 48, 
                        height: 48,
                        fontSize: '1.2rem',
                        fontWeight: 600
                      }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                      {testimonial.verified && (
                        <Chip 
                          label="Verified" 
                          size="small" 
                          sx={{ 
                            bgcolor: 'rgba(52,211,153,0.2)', 
                            color: '#34d399',
                            fontSize: '0.75rem'
                          }} 
                        />
                      )}
                    </Box>

                    <Rating 
                      value={testimonial.rating} 
                      readOnly 
                      sx={{ 
                        '& .MuiRating-icon': { color: '#fbbf24' },
                        '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.3)' }
                      }} 
                    />

                    <Typography sx={{ 
                      color: '#fff', 
                      opacity: 0.9, 
                      lineHeight: 1.6,
                      fontStyle: 'italic'
                    }}>
                      "{testimonial.comment}"
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Testimonial Section */}
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
          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Share Your Experience
          </Typography>
          
          {submitted ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <StarOutlined sx={{ fontSize: 60, color: '#34d399', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 2 }}>
                Thank You for Your Feedback!
              </Typography>
              <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                Your testimonial will be reviewed and published soon.
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmitTestimonial}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                    required
                    sx={{
                      '& .MuiInputBase-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a78bfa' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company/Organization"
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, company: e.target.value }))}
                    sx={{
                      '& .MuiInputBase-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22d3ee' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography sx={{ color: '#fff', opacity: 0.8 }}>
                      Rating:
                    </Typography>
                    <Rating
                      value={newTestimonial.rating}
                      onChange={(event, newValue) => {
                        setNewTestimonial(prev => ({ ...prev, rating: newValue || 5 }))
                      }}
                      sx={{ 
                        '& .MuiRating-icon': { color: '#fbbf24' }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Testimonial"
                    value={newTestimonial.comment}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell us about your experience with EventEye..."
                    required
                    sx={{
                      '& .MuiInputBase-input': { color: '#fff' },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#34d399' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SendOutlined />}
                    sx={{
                      background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #9333ea, #0891b2)'
                      }
                    }}
                  >
                    Submit Testimonial
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>

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
