import React, { useState, useEffect } from 'react'
import { 
  Snackbar, 
  Alert, 
  Button, 
  Box, 
  Typography,
  IconButton,
  Slide
} from '@mui/material'
import { 
  UpdateOutlined, 
  CloseOutlined, 
  RefreshOutlined 
} from '@mui/icons-material'

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function PWAUpdateNotification() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg)
        
        // Check for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true)
                setShowUpdateNotification(true)
              }
            })
          }
        })
      })
    }
  }, [])

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      // Tell the waiting service worker to skip waiting and become active
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      
      // Reload the page to use the updated service worker
      window.location.reload()
    }
  }

  const handleDismiss = () => {
    setShowUpdateNotification(false)
  }

  return (
    <Snackbar
      open={showUpdateNotification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      sx={{
        '& .MuiSnackbarContent-root': {
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 2,
          maxWidth: 400
        }
      }}
    >
      <Alert
        severity="info"
        variant="filled"
        sx={{
          background: 'transparent',
          color: 'white',
          '& .MuiAlert-icon': {
            color: '#22d3ee'
          },
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              onClick={handleUpdate}
              startIcon={<RefreshOutlined />}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                background: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              Update
            </Button>
            <IconButton
              size="small"
              onClick={handleDismiss}
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            <UpdateOutlined sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
            New Version Available
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            EventEye has been updated with new features and improvements.
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  )
}
