import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
  TextField,
  Chip,
  Avatar,
  Divider
} from '@mui/material'
import {
  HelpOutlined,
  ExpandMoreOutlined,
  SearchOutlined,
  QuestionAnswerOutlined,
  VideoLibraryOutlined,
  ArticleOutlined,
  SupportAgentOutlined,
  EmailOutlined,
  PhoneOutlined,
  ChatOutlined,
  SchoolOutlined,
  SettingsOutlined,
  SecurityOutlined,
  CloudUploadOutlined
} from '@mui/icons-material'

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState(false)

  const faqs = [
    {
      id: 1,
      question: 'How do I upload a CSV file with participant data?',
      answer: 'To upload a CSV file, go to the Dashboard → Upload CSV tab. Click "Select CSV" and choose your file. The CSV should have columns for name, email, and phone. Our system will automatically validate and process the data.',
      category: 'Getting Started'
    },
    {
      id: 2,
      question: 'How does certificate generation work?',
      answer: 'EventEye automatically generates certificates for all participants. Go to Dashboard → Preview tab, select a participant, and click "Generate Certificate". You can download individual certificates or bulk download all at once.',
      category: 'Certificates'
    },
    {
      id: 3,
      question: 'Can I customize certificate templates?',
      answer: 'Yes! You can customize certificate templates by modifying the design, adding logos, changing colors, and including event-specific information. Contact our support team for advanced customization options.',
      category: 'Certificates'
    },
    {
      id: 4,
      question: 'How do I track participant attendance?',
      answer: 'The Dashboard provides real-time tracking of participant status including queued, sent, bounced, and failed deliveries. You can monitor progress and resend certificates as needed.',
      category: 'Tracking'
    },
    {
      id: 5,
      question: 'What file formats are supported for CSV upload?',
      answer: 'We support standard CSV files (.csv) with UTF-8 encoding. Ensure your file has headers for name, email, and phone columns. Maximum file size is 10MB.',
      category: 'Technical'
    },
    {
      id: 6,
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and check your inbox for reset instructions. If you don\'t receive the email, check your spam folder.',
      category: 'Account'
    },
    {
      id: 7,
      question: 'Can I integrate EventEye with other platforms?',
      answer: 'EventEye supports Firebase integration and can be connected to various third-party platforms. Contact our technical team for custom integration requirements.',
      category: 'Integration'
    },
    {
      id: 8,
      question: 'What happens if a certificate delivery fails?',
      answer: 'Failed deliveries are automatically retried. You can also manually resend certificates from the Participants tab. Check the delivery status and contact support if issues persist.',
      category: 'Troubleshooting'
    }
  ]

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <SchoolOutlined />,
      description: 'Learn the basics of EventEye',
      color: '#a78bfa'
    },
    {
      title: 'Certificates',
      icon: <ArticleOutlined />,
      description: 'Certificate generation and customization',
      color: '#22d3ee'
    },
    {
      title: 'Dashboard',
      icon: <SettingsOutlined />,
      description: 'Managing your events and participants',
      color: '#34d399'
    },
    {
      title: 'Technical Support',
      icon: <SupportAgentOutlined />,
      description: 'Technical issues and troubleshooting',
      color: '#f59e0b'
    }
  ]

  const supportOptions = [
    {
      title: 'Email Support',
      icon: <EmailOutlined />,
      description: 'Get help via email',
      contact: 'support@eventeye.com',
      response: 'Within 24 hours'
    },
    {
      title: 'Phone Support',
      icon: <PhoneOutlined />,
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      response: 'Mon-Fri, 9AM-6PM'
    },
    {
      title: 'Live Chat',
      icon: <ChatOutlined />,
      description: 'Instant chat support',
      contact: 'Available 24/7',
      response: 'Immediate response'
    }
  ]

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFAQChange = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false)
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
          top: '8%',
          left: '8%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.1), transparent)',
          animation: 'float 9s ease-in-out infinite'
        }} />
        <Box sx={{
          position: 'absolute',
          top: '35%',
          right: '12%',
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1), transparent)',
          animation: 'float 11s ease-in-out infinite reverse'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '18%',
          left: '18%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1), transparent)',
          animation: 'float 7s ease-in-out infinite'
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
            <HelpOutlined sx={{ mr: 2, verticalAlign: 'middle', fontSize: '2.5rem' }} />
            Help Center
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8, fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}>
            Find answers to common questions and get the support you need
          </Typography>
        </Box>

        {/* Search */}
        <Paper 
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            mb: 4
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchOutlined sx={{ color: '#a78bfa', fontSize: 28 }} />
            <TextField
              fullWidth
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a78bfa' }
              }}
            />
          </Box>
        </Paper>

        {/* Help Categories */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {helpCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: 3,
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Avatar sx={{ 
                  bgcolor: `${category.color}20`, 
                  mx: 'auto', 
                  mb: 2,
                  width: 56,
                  height: 56
                }}>
                  <Box sx={{ color: category.color, fontSize: '1.5rem' }}>
                    {category.icon}
                  </Box>
                </Avatar>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                  {category.title}
                </Typography>
                <Typography sx={{ color: '#fff', opacity: 0.7, fontSize: '0.9rem' }}>
                  {category.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)',
            mb: 6
          }}
        >
          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <QuestionAnswerOutlined sx={{ color: '#a78bfa' }} />
            Frequently Asked Questions
          </Typography>

          <Stack spacing={2}>
            {filteredFAQs.map((faq) => (
              <Accordion
                key={faq.id}
                expanded={expandedFAQ === faq.id}
                onChange={handleFAQChange(faq.id)}
                sx={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px !important',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    background: 'rgba(255,255,255,0.08)'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreOutlined sx={{ color: '#a78bfa' }} />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Chip 
                      label={faq.category} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(167,139,250,0.2)', 
                        color: '#a78bfa',
                        fontSize: '0.75rem'
                      }} 
                    />
                    <Typography sx={{ color: '#fff', fontWeight: 500, flex: 1 }}>
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: '#fff', opacity: 0.9, lineHeight: 1.6 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Paper>

        {/* Contact Support */}
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(14px)'
          }}
        >
          <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Still Need Help?
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8, textAlign: 'center', mb: 4 }}>
            Our support team is here to help you succeed
          </Typography>

          <Grid container spacing={3}>
            {supportOptions.map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      background: 'rgba(255,255,255,0.08)'
                    }
                  }}
                >
                  <Avatar sx={{ 
                    bgcolor: 'rgba(167,139,250,0.2)', 
                    mx: 'auto', 
                    mb: 2,
                    width: 48,
                    height: 48
                  }}>
                    <Box sx={{ color: '#a78bfa', fontSize: '1.2rem' }}>
                      {option.icon}
                    </Box>
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                    {option.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', mb: 2 }}>
                    {option.description}
                  </Typography>
                  <Typography sx={{ color: '#a78bfa', fontWeight: 600, mb: 1 }}>
                    {option.contact}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                    {option.response}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
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
