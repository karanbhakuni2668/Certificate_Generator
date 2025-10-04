import React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  Stack,
  Avatar
} from '@mui/material'
import {
  LanguageOutlined,
  TranslateOutlined
} from '@mui/icons-material'
import { getAvailableLanguages, getLanguageInfo } from '../services/certService'

export default function LanguageSelector({ selectedLanguage, onLanguageChange }) {
  const languages = getAvailableLanguages()

  const languageOptions = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'hi', flag: '🇮🇳', name: 'हिंदी' }
  ]

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ 
          bgcolor: 'rgba(167,139,250,0.2)', 
          width: 40, 
          height: 40 
        }}>
          <LanguageOutlined sx={{ color: '#a78bfa' }} />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ 
            color: '#fff', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            Certificate Language
          </Typography>
          <Typography variant="body2" sx={{ 
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.85rem'
          }}>
            Choose the language for certificate text
          </Typography>
        </Box>
      </Stack>

      <FormControl 
        fullWidth 
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255,255,255,0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#a78bfa',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255,255,255,0.8)',
            '&.Mui-focused': {
              color: '#a78bfa',
            },
          },
          '& .MuiSelect-icon': {
            color: '#fff',
          }
        }}
      >
        <InputLabel id="language-select-label">Select Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={selectedLanguage}
          label="Select Language"
          onChange={(e) => onLanguageChange(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }
          }}
        >
          {languageOptions.map((option) => {
            const langInfo = getLanguageInfo(option.code)
            return (
              <MenuItem 
                key={option.code} 
                value={option.code}
                sx={{
                  color: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(167,139,250,0.2)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(167,139,250,0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(167,139,250,0.4)',
                    }
                  }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ fontSize: '1.2rem' }}>
                    {option.flag}
                  </Typography>
                  <Box>
                    <Typography sx={{ 
                      color: '#fff', 
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}>
                      {option.name}
                    </Typography>
                    <Typography sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.75rem'
                    }}>
                      {langInfo.certificateTitle}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

      {/* Selected Language Info */}
      <Box sx={{ 
        mt: 2, 
        p: 2, 
        background: 'rgba(167,139,250,0.1)', 
        borderRadius: 2, 
        border: '1px solid rgba(167,139,250,0.3)' 
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ 
            bgcolor: 'rgba(167,139,250,0.2)', 
            width: 32, 
            height: 32 
          }}>
            <TranslateOutlined sx={{ color: '#a78bfa', fontSize: 18 }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ 
              color: '#fff', 
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              Selected: {getLanguageInfo(selectedLanguage).name}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.75rem'
            }}>
              Certificate will be generated in {getLanguageInfo(selectedLanguage).name}
            </Typography>
          </Box>
          <Chip
            label={languageOptions.find(opt => opt.code === selectedLanguage)?.flag}
            size="small"
            sx={{
              backgroundColor: 'rgba(167,139,250,0.2)',
              border: '1px solid rgba(167,139,250,0.5)',
              fontSize: '1rem'
            }}
          />
        </Stack>
      </Box>

      {/* Language Preview */}
      <Box sx={{ 
        mt: 2, 
        p: 2, 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: 2, 
        border: '1px solid rgba(255,255,255,0.1)' 
      }}>
        <Typography variant="subtitle2" sx={{ 
          color: '#fff', 
          fontWeight: 600,
          mb: 1,
          fontSize: '0.85rem'
        }}>
          Language Preview:
        </Typography>
        <Stack spacing={1}>
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.8rem'
          }}>
            <strong>Title:</strong> {getLanguageInfo(selectedLanguage).certificateTitle}
          </Typography>
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.8rem'
          }}>
            <strong>Subtitle:</strong> {getLanguageInfo(selectedLanguage).subtitle}
          </Typography>
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.8rem'
          }}>
            <strong>Participation:</strong> {getLanguageInfo(selectedLanguage).participationText}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}
