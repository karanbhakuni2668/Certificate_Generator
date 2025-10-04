import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Paper,
  Fade,
  IconButton
} from '@mui/material'
import {
  PaletteOutlined,
  CheckCircleOutlined,
  VisibilityOutlined,
  StarOutlined
} from '@mui/icons-material'
import { getCertificateTemplates } from '../services/certService'

export default function TemplateSelector({ selectedTemplate, onTemplateSelect, onPreview }) {
  const [hoveredTemplate, setHoveredTemplate] = useState(null)
  const templates = getCertificateTemplates()

  const getTemplatePreview = (templateId) => {
    const template = templates[templateId]
    return (
      <Box
        sx={{
          width: '100%',
          height: 120,
          background: `linear-gradient(135deg, ${template.backgroundColors[0]}, ${template.backgroundColors[1]})`,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          border: `2px solid ${template.primaryColor}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 8,
            left: 8,
            right: 8,
            bottom: 8,
            border: `1px solid ${template.secondaryColor}`,
            borderRadius: 1
          }
        }}
      >
        {/* Template preview elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 2,
            backgroundColor: template.accentColor
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 10,
            color: templateId === 7 ? '#111827' : '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          CERTIFICATE
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 50,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 1,
            backgroundColor: template.primaryColor
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 8,
            color: templateId === 7 ? '#111827' : '#ffffff',
            textAlign: 'center'
          }}
        >
          Participant Name
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 30,
            height: 1,
            backgroundColor: template.secondaryColor
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 15,
            right: 15,
            width: 12,
            height: 12,
            backgroundColor: template.accentColor,
            borderRadius: '50%'
          }}
        />
      </Box>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 3
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <PaletteOutlined sx={{ color: '#a78bfa', fontSize: 28 }} />
        <Box>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
            Choose Certificate Template
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Select from 7 professional designs
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {Object.entries(templates).map(([id, template]) => {
          const templateId = parseInt(id)
          const isSelected = selectedTemplate === templateId
          const isHovered = hoveredTemplate === templateId

          return (
            <Grid item xs={12} sm={6} md={4} key={templateId}>
              <Fade in={true} timeout={300 + templateId * 100}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(34,211,238,0.2))'
                      : 'rgba(255,255,255,0.05)',
                    border: isSelected 
                      ? '2px solid #a78bfa' 
                      : isHovered 
                        ? '2px solid rgba(167,139,250,0.5)'
                        : '2px solid rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    '&:hover': {
                      borderColor: 'rgba(167,139,250,0.7)',
                      background: 'rgba(255,255,255,0.08)'
                    }
                  }}
                  onClick={() => onTemplateSelect(templateId)}
                  onMouseEnter={() => setHoveredTemplate(templateId)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <CardContent sx={{ p: 2 }}>
                    {/* Template Preview */}
                    {getTemplatePreview(templateId)}

                    {/* Template Info */}
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            color: '#fff', 
                            fontWeight: 600,
                            fontSize: '0.9rem'
                          }}
                        >
                          {template.name}
                        </Typography>
                        {isSelected && (
                          <CheckCircleOutlined sx={{ color: '#a78bfa', fontSize: 20 }} />
                        )}
                      </Box>
                      
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.75rem',
                          display: 'block',
                          mb: 1
                        }}
                      >
                        {template.description}
                      </Typography>

                      {/* Color Palette */}
                      <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: template.primaryColor,
                            border: '1px solid rgba(255,255,255,0.2)'
                          }}
                        />
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: template.secondaryColor,
                            border: '1px solid rgba(255,255,255,0.2)'
                          }}
                        />
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: template.accentColor,
                            border: '1px solid rgba(255,255,255,0.2)'
                          }}
                        />
                      </Stack>

                      {/* Action Buttons */}
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant={isSelected ? "contained" : "outlined"}
                          startIcon={isSelected ? <CheckCircleOutlined /> : <StarOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            onTemplateSelect(templateId)
                          }}
                          sx={{
                            flex: 1,
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            ...(isSelected ? {
                              background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #9333ea, #0891b2)'
                              }
                            } : {
                              color: '#fff',
                              borderColor: 'rgba(255,255,255,0.3)',
                              '&:hover': {
                                borderColor: '#a78bfa',
                                backgroundColor: 'rgba(167,139,250,0.1)'
                              }
                            })
                          }}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </Button>
                        
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            onPreview(templateId)
                          }}
                          sx={{
                            color: 'rgba(255,255,255,0.7)',
                            '&:hover': {
                              color: '#22d3ee',
                              backgroundColor: 'rgba(34,211,238,0.1)'
                            }
                          }}
                        >
                          <VisibilityOutlined fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          )
        })}
      </Grid>

      {/* Selected Template Summary */}
      {selectedTemplate && (
        <Box sx={{ mt: 3, p: 2, background: 'rgba(167,139,250,0.1)', borderRadius: 2, border: '1px solid rgba(167,139,250,0.3)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CheckCircleOutlined sx={{ color: '#a78bfa' }} />
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
                Template Selected: {templates[selectedTemplate].name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {templates[selectedTemplate].description}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
