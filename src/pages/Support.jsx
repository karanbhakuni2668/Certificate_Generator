import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Avatar,
  Chip,
  Divider,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'
import {
  SupportOutlined,
  EmailOutlined,
  PhoneOutlined,
  ChatOutlined,
  ScheduleOutlined,
  CheckCircleOutlined,
  BugReportOutlined,
  QuestionMarkOutlined,
  RequestQuoteOutlined,
  FeedbackOutlined,
  SendOutlined,
  LocationOnOutlined,
  AccessTimeOutlined,
  LanguageOutlined
} from '@mui/icons-material'

export default function Support() {
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    priority: 'medium',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)

  const supportCategories = [
    { value: 'general', label: 'General Inquiry', icon: <QuestionMarkOutlined /> },
    { value: 'technical', label: 'Technical Issue', icon: <BugReportOutlined /> },
    { value: 'billing', label: 'Billing & Pricing', icon: <RequestQuoteOutlined /> },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: <FeedbackOutlined /> }
  ]

  const priorityLevels = [
    { value: 'low', label: 'Low', color: '#34d399' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#ef4444' },
    { value: 'urgent', label: 'Urgent', color: '#dc2626' }
  ]

  const contactMethods = [
    {
      title: 'Email Support',
      icon: <EmailOutlined />,
      contact: 'support@eventeye.com',
      description: 'Send us an email and we\'ll respond within 24 hours',
      responseTime: '24 hours',
      availability: '24/7',
      color: '#a78bfa'
    },
    {
      title: 'Phone Support',
      icon: <PhoneOutlined />,
      contact: '+1 (555) 123-4567',
      description: 'Speak directly with our support team',
      responseTime: 'Immediate',
      availability: 'Mon-Fri, 9AM-6PM EST',
      color: '#22d3ee'
    },
    {
      title: 'Live Chat',
      icon: <ChatOutlined />,
      contact: 'Available on website',
      description: 'Chat with us in real-time',
      responseTime: 'Immediate',
      availability: '24/7',
      color: '#34d399'
    },
    {
      title: 'Emergency Support',
      icon: <SupportOutlined />,
      contact: '+1 (555) 911-SUPPORT',
      description: 'Critical issues only',
      responseTime: 'Immediate',
      availability: '24/7',
      color: '#ef4444'
    }
  ]

  const handleInputChange = (field) => (event) => {
    setSupportForm(prev => ({
      ...prev,
      [field]: event.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Support ticket submitted:', supportForm)
    setSubmitted(true)
    setBusy(false)
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
          top: '12%',
          left: '12%',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '40%',
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
          width: 160,
          height: 160,
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
            <SupportOutlined sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2.5rem' }} />
            Support
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8, fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}>
            Get help from our dedicated support team. We're here to assist you 24/7
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Methods */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                mb: 4
              }}
            >
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
                Contact Methods
              </Typography>
              
              <Grid container spacing={3}>
                {contactMethods.map((method, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card 
                      sx={{ 
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 3,
                        p: 3,
                        height: '100%',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          background: 'rgba(255,255,255,0.08)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: `${method.color}20`, 
                          width: 40, 
                          height: 40 
                        }}>
                          <Box sx={{ color: method.color }}>
                            {method.icon}
                          </Box>
                        </Avatar>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                          {method.title}
                        </Typography>
                      </Box>
                      
                      <Typography sx={{ color: method.color, fontWeight: 600, mb: 1 }}>
                        {method.contact}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', mb: 2 }}>
                        {method.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeOutlined sx={{ color: method.color, fontSize: 16 }} />
                          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>
                            {method.responseTime}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ScheduleOutlined sx={{ color: method.color, fontSize: 16 }} />
                          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>
                            {method.availability}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Support Form */}
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
                    Support Ticket Submitted!
                  </Typography>
                  <Typography sx={{ color: '#fff', opacity: 0.8, mb: 3 }}>
                    We've received your support request and will respond within 24 hours.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSubmitted(false)
                      setSupportForm({
                        name: '',
                        email: '',
                        subject: '',
                        category: 'general',
                        priority: 'medium',
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
                    Submit Another Ticket
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 3 }}>
                    Submit Support Ticket
                  </Typography>
                  
                  <Stack spacing={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={supportForm.name}
                          onChange={handleInputChange('name')}
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
                          label="Email Address"
                          type="email"
                          value={supportForm.email}
                          onChange={handleInputChange('email')}
                          required
                          sx={{
                            '& .MuiInputBase-input': { color: '#fff' },
                            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22d3ee' }
                          }}
                        />
                      </Grid>
                    </Grid>

                    <TextField
                      fullWidth
                      label="Subject"
                      value={supportForm.subject}
                      onChange={handleInputChange('subject')}
                      required
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#34d399' }
                      }}
                    />

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                            Category
                          </FormLabel>
                          <RadioGroup
                            value={supportForm.category}
                            onChange={handleInputChange('category')}
                          >
                            {supportCategories.map((category) => (
                              <FormControlLabel
                                key={category.value}
                                value={category.value}
                                control={<Radio sx={{ color: '#a78bfa' }} />}
                                label={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ color: '#a78bfa' }}>{category.icon}</Box>
                                    <Typography sx={{ color: '#fff' }}>{category.label}</Typography>
                                  </Box>
                                }
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>
                            Priority Level
                          </FormLabel>
                          <RadioGroup
                            value={supportForm.priority}
                            onChange={handleInputChange('priority')}
                          >
                            {priorityLevels.map((priority) => (
                              <FormControlLabel
                                key={priority.value}
                                value={priority.value}
                                control={<Radio sx={{ color: priority.color }} />}
                                label={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                      width: 8, 
                                      height: 8, 
                                      borderRadius: '50%', 
                                      backgroundColor: priority.color 
                                    }} />
                                    <Typography sx={{ color: '#fff' }}>{priority.label}</Typography>
                                  </Box>
                                }
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Message"
                      value={supportForm.message}
                      onChange={handleInputChange('message')}
                      placeholder="Please describe your issue or question in detail..."
                      required
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
                      {busy ? 'Submitting Ticket...' : 'Submit Support Ticket'}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Sidebar */}
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
                    <LanguageOutlined sx={{ color: '#a78bfa', mr: 1 }} />
                    Support Hours
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#fff', opacity: 0.8 }}>Email Support:</Typography>
                      <Typography sx={{ color: '#a78bfa', fontWeight: 600 }}>24/7</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#fff', opacity: 0.8 }}>Phone Support:</Typography>
                      <Typography sx={{ color: '#a78bfa', fontWeight: 600 }}>Mon-Fri, 9AM-6PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#fff', opacity: 0.8 }}>Live Chat:</Typography>
                      <Typography sx={{ color: '#a78bfa', fontWeight: 600 }}>24/7</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: '#fff', opacity: 0.8 }}>Emergency:</Typography>
                      <Typography sx={{ color: '#a78bfa', fontWeight: 600 }}>24/7</Typography>
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
                    <LocationOnOutlined sx={{ color: '#22d3ee', mr: 1 }} />
                    Office Location
                  </Typography>
                  <Typography sx={{ color: '#fff', opacity: 0.8, mb: 2 }}>
                    123 Innovation Street<br />
                    Tech City, TC 12345<br />
                    United States
                  </Typography>
                  <Typography sx={{ color: '#22d3ee', fontSize: '0.9rem' }}>
                    📞 +1 (555) 123-4567<br />
                    📧 support@eventeye.com
                  </Typography>
                </CardContent>
              </Card>

              <Alert 
                severity="info" 
                sx={{ 
                  background: 'rgba(34,211,238,0.1)',
                  border: '1px solid rgba(34,211,238,0.3)',
                  color: '#fff',
                  '& .MuiAlert-icon': { color: '#22d3ee' }
                }}
              >
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  Quick Tip
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  For faster resolution, please include screenshots and detailed error messages when reporting technical issues.
                </Typography>
              </Alert>
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
