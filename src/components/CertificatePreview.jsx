import { useEffect, useMemo, useState } from 'react'
import { 
  Alert, 
  Box, 
  Button, 
  Stack, 
  Typography, 
  Autocomplete, 
  TextField, 
  Card, 
  CardContent,
  Grid,
  Chip,
  Avatar,
  Divider,
  Paper
} from '@mui/material'
import {
  PersonOutlined,
  EventOutlined,
  DownloadOutlined,
  PreviewOutlined,
  SearchOutlined
} from '@mui/icons-material'
import { listenParticipants } from '../services/db'
import { generateCertificate, getTemplateInfo, getLanguageInfo } from '../services/certService'
import TemplateSelector from './TemplateSelector'
import LanguageSelector from './LanguageSelector'

export default function CertificatePreview({ eventId }) {
  const [rows, setRows] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [busy, setBusy] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [generatedCertificates, setGeneratedCertificates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  useEffect(() => {
    if (!eventId) return
    console.log('Listening for participants in event:', eventId)
    const off = listenParticipants(eventId, (participants) => {
      console.log('Received participants data:', participants)
      setRows(participants)
    })
    return () => off?.()
  }, [eventId])

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return rows
    return rows.filter(student => 
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [rows, searchTerm])

  const generateCertificateForStudent = async (student) => {
    if (!student) return
    setBusy(true)
    try {
      const { dataUrl, blob } = await generateCertificate({
        participant: student,
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
        verifyUrl: `https://eventeye.example.com/verify?event=${encodeURIComponent(eventId)}&p=${encodeURIComponent(student.id)}`,
        templateId: selectedTemplate,
      })
      
      setPreviewUrl(dataUrl)
      
      // Add to generated certificates list
      setGeneratedCertificates(prev => [...prev, {
        id: student.id,
        name: student.name,
        email: student.email,
        generatedAt: new Date().toLocaleString(),
        templateId: selectedTemplate,
        templateName: getTemplateInfo(selectedTemplate).name,
        dataUrl,
        blob
      }])
      
      return { dataUrl, blob }
    } catch (error) {
      console.error('Certificate generation failed:', error)
      throw error
    } finally {
      setBusy(false)
    }
  }

  const downloadCertificate = (certificate) => {
    const link = document.createElement('a')
    link.href = certificate.dataUrl
    link.download = `${certificate.name}_Certificate_${eventId}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadAllCertificates = async () => {
    if (!generatedCertificates.length) return
    
    for (const cert of generatedCertificates) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Delay between downloads
      downloadCertificate(cert)
    }
  }

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    setPreviewUrl(null) // Clear preview when template changes
  }

  const handleTemplatePreview = (templateId) => {
    // Generate a preview with sample data
    const sampleStudent = {
      name: 'Sample Participant',
      email: 'sample@example.com',
      id: 'preview'
    }
    
    generateCertificateForStudent(sampleStudent)
  }

  // Debug info
  console.log('Current rows:', rows)
  console.log('Event ID:', eventId)
  console.log('Filtered students:', filteredStudents)

  if (!rows.length) {
    return (
      <Stack spacing={3}>
        <Alert 
          severity="info" 
          sx={{ 
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(167,139,250,0.1))',
            border: '1px solid rgba(34,211,238,0.3)',
            color: '#fff'
          }}
        >
          No participants found for event "{eventId}". Please upload a CSV file first to see students and generate certificates.
        </Alert>
        
        {/* Debug Information */}
        <Paper 
          elevation={0}
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 3
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
            Debug Information
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8, mb: 1 }}>
            Event ID: {eventId || 'Not set'}
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8, mb: 1 }}>
            Participants loaded: {rows.length}
          </Typography>
          <Typography sx={{ color: '#fff', opacity: 0.8 }}>
            Raw data: {JSON.stringify(rows, null, 2)}
          </Typography>
        </Paper>
      </Stack>
    )
  }

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Certificate Generator
        </Typography>
        <Typography sx={{ color: '#fff', opacity: 0.8 }}>
          Select a student to generate and preview their certificate
        </Typography>
        <Typography sx={{ color: '#fff', opacity: 0.6, fontSize: '0.9rem', mt: 1 }}>
          Found {rows.length} participants for event "{eventId}"
        </Typography>
      </Box>

      {/* Template Selector */}
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        onTemplateSelect={handleTemplateSelect}
        onPreview={handleTemplatePreview}
      />

      {/* Debug Info (only show if there are issues) */}
      {rows.length > 0 && rows.some(row => !row.name) && (
        <Alert 
          severity="warning" 
          sx={{ 
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.1))',
            border: '1px solid rgba(245,158,11,0.3)',
            color: '#fff'
          }}
        >
          Some participants may be missing names. Check console for details.
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Left Column - Student Selection */}
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#fff', 
                  fontWeight: 600, 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <SearchOutlined sx={{ color: '#a78bfa' }} />
                Search & Select Student
              </Typography>

              <Autocomplete
                options={filteredStudents}
                getOptionLabel={(option) => {
                  const name = option.name || 'Unknown Name'
                  const email = option.email || 'No Email'
                  return `${name} (${email})`
                }}
                value={selectedStudent}
                onChange={(event, newValue) => setSelectedStudent(newValue)}
                filterOptions={(options, { inputValue }) => {
                  return options.filter(option => {
                    const name = option.name || ''
                    const email = option.email || ''
                    return name.toLowerCase().includes(inputValue.toLowerCase()) ||
                           email.toLowerCase().includes(inputValue.toLowerCase())
                  })
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search by name or email..."
                    sx={{
                      '& .MuiInputBase-input': { 
                        color: '#fff !important',
                        '&::placeholder': { color: 'rgba(255,255,255,0.6) !important' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.8)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a78bfa' },
                      '& .MuiAutocomplete-popupIndicator': { color: '#fff' },
                      '& .MuiAutocomplete-clearIndicator': { color: '#fff' },
                      '& .MuiInputBase-root': {
                        color: '#fff',
                        '& input': { color: '#fff !important' }
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Box 
                    component="li" 
                    {...props} 
                    sx={{ 
                      color: '#fff !important',
                      backgroundColor: 'rgba(255,255,255,0.05) !important',
                      '&:hover': {
                        backgroundColor: 'rgba(167,139,250,0.2) !important'
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(167,139,250,0.3) !important'
                      }
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', mr: 2, width: 32, height: 32 }}>
                      <PersonOutlined sx={{ color: '#a78bfa', fontSize: 20 }} />
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#fff !important' }}>
                        {option.name || 'Unknown Name'}
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7) !important' }}>
                        {option.email || 'No Email'}
                      </Typography>
                      {option.id && (
                        <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5) !important' }}>
                          ID: {option.id}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
                sx={{ 
                  mb: 3,
                  '& .MuiAutocomplete-paper': {
                    backgroundColor: 'rgba(30,30,30,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    '& .MuiAutocomplete-listbox': {
                      backgroundColor: 'transparent'
                    }
                  }
                }}
              />

              {/* Simple List View as Fallback */}
              <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                Or click on a student below:
              </Typography>
              <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 3 }}>
                <Stack spacing={1}>
                  {filteredStudents.slice(0, 10).map((student, index) => (
                    <Paper
                      key={student.id || index}
                      elevation={0}
                      onClick={() => setSelectedStudent(student)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        background: selectedStudent?.id === student.id 
                          ? 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(34,211,238,0.2))'
                          : 'rgba(255,255,255,0.05)',
                        border: selectedStudent?.id === student.id 
                          ? '1px solid rgba(167,139,250,0.5)' 
                          : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 2,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.1)',
                          borderColor: 'rgba(167,139,250,0.3)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', width: 32, height: 32 }}>
                          <PersonOutlined sx={{ color: '#a78bfa', fontSize: 20 }} />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                            {student.name || 'Unknown Name'}
                          </Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                            {student.email || 'No Email'}
                          </Typography>
                        </Box>
                        {selectedStudent?.id === student.id && (
                          <Box sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            background: '#a78bfa' 
                          }} />
                        )}
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {selectedStudent && (
                <Paper 
                  elevation={0}
                  sx={{
                    p: 3,
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(34,211,238,0.1))',
                    border: '1px solid rgba(167,139,250,0.3)',
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ color: '#fff', fontWeight: 600 }}
                    >
                      Selected Student
                    </Typography>
                    <Chip
                      label={getTemplateInfo(selectedTemplate).name}
                      size="small"
                      sx={{
                        color: '#fff',
                        backgroundColor: 'rgba(167,139,250,0.2)',
                        border: '1px solid rgba(167,139,250,0.5)'
                      }}
                    />
                  </Box>
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)' }}>
                        <PersonOutlined sx={{ color: '#a78bfa' }} />
                      </Avatar>
                      <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 600 }}>
                          {selectedStudent.name || 'Unknown Name'}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                          {selectedStudent.email || 'No Email'}
                        </Typography>
                        {selectedStudent.id && (
                          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                            ID: {selectedStudent.id}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    
                    {selectedStudent.phone && (
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                        📞 {selectedStudent.phone}
                      </Typography>
                    )}
                  </Stack>

                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => generateCertificateForStudent(selectedStudent)}
                      disabled={busy}
                      startIcon={<PreviewOutlined />}
                      sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #9333ea, #0891b2)'
                        }
                      }}
                    >
                      {busy ? 'Generating...' : 'Generate Certificate'}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      onClick={() => setSelectedStudent(null)}
                      sx={{
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.3)',
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: '#ef4444',
                          backgroundColor: 'rgba(239,68,68,0.1)'
                        }
                      }}
                    >
                      Clear
                    </Button>
                  </Stack>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Certificate Preview */}
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#fff', 
                  fontWeight: 600, 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <EventOutlined sx={{ color: '#22d3ee' }} />
                Certificate Preview
              </Typography>

              {previewUrl ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      borderRadius: 2, 
                      overflow: 'hidden',
                      mb: 3
                    }}
                  >
                    <iframe 
                      title="certificate-preview" 
                      src={previewUrl} 
                      style={{ 
                        width: '100%', 
                        height: 400, 
                        border: 'none',
                        borderRadius: '8px'
                      }} 
                    />
                  </Box>
                  
                  <Button
                    variant="contained"
                    onClick={() => {
                      const cert = generatedCertificates[generatedCertificates.length - 1]
                      if (cert) downloadCertificate(cert)
                    }}
                    startIcon={<DownloadOutlined />}
                    sx={{
                      background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 4,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669, #0891b2)'
                      }
                    }}
                  >
                    Download Certificate
                  </Button>
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed rgba(255,255,255,0.3)',
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.05)'
                  }}
                >
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                    Select a student and generate their certificate to see the preview here
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Generated Certificates Summary */}
      {generatedCertificates.length > 0 && (
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 3
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ color: '#fff', fontWeight: 600 }}
              >
                Generated Certificates ({generatedCertificates.length})
              </Typography>
              
              {generatedCertificates.length > 1 && (
                <Button
                  variant="outlined"
                  onClick={downloadAllCertificates}
                  startIcon={<DownloadOutlined />}
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#34d399',
                      backgroundColor: 'rgba(52,211,153,0.1)'
                    }
                  }}
                >
                  Download All
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              {generatedCertificates.map((cert, index) => (
                <Grid item xs={12} sm={6} md={4} key={cert.id}>
                  <Paper
                    elevation={0}
                    onClick={() => downloadCertificate(cert)}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.1)',
                        borderColor: 'rgba(167,139,250,0.3)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', width: 32, height: 32 }}>
                        <PersonOutlined sx={{ color: '#a78bfa', fontSize: 20 }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                          {cert.name}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                          {cert.templateName}
                        </Typography>
                      </Box>
                      <Chip
                        label="Download"
                        size="small"
                        sx={{
                          color: '#fff',
                          borderColor: 'rgba(167,139,250,0.5)',
                          backgroundColor: 'rgba(167,139,250,0.1)',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                      Generated: {cert.generatedAt}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Stack>
  )
}


