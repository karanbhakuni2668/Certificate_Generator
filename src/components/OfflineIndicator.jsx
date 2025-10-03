import React, { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  Chip,
  Fade,
  Slide
} from '@mui/material'
import { 
  WifiOffOutlined, 
  WifiOutlined,
  CloudOffOutlined,
  CloudDoneOutlined
} from '@mui/icons-material'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowIndicator(true)
      // Hide indicator after 3 seconds when coming back online
      setTimeout(() => setShowIndicator(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowIndicator(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showIndicator) return null

  return (
    <Fade in={showIndicator}>
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      >
        <Slide direction="down" in={showIndicator}>
          <Chip
            icon={isOnline ? <WifiOutlined /> : <WifiOffOutlined />}
            label={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {isOnline ? 'Back Online' : 'You\'re Offline'}
              </Typography>
            }
            sx={{
              background: isOnline 
                ? 'linear-gradient(135deg, rgba(52,211,153,0.9), rgba(34,197,94,0.9))'
                : 'linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,0.9))',
              color: 'white',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              '& .MuiChip-icon': {
                color: 'white'
              }
            }}
          />
        </Slide>
      </Box>
    </Fade>
  )
}
