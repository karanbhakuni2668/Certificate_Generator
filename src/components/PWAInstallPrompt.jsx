import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography, 
  Box, 
  IconButton,
  Chip,
  Avatar,
  Stack
} from '@mui/material'
import { 
  GetAppOutlined, 
  CloseOutlined, 
  PhoneAndroidOutlined, 
  ComputerOutlined,
  StarOutlined 
} from '@mui/icons-material'

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true)
        return true
      }
      return false
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Only show prompt if not already installed and user hasn't dismissed it recently
      const lastDismissed = localStorage.getItem('pwa-install-dismissed')
      const shouldShow = !checkIfInstalled() && 
                        (!lastDismissed || Date.now() - parseInt(lastDismissed) > 7 * 24 * 60 * 60 * 1000) // 7 days
      
      if (shouldShow) {
        setTimeout(() => setShowInstallPrompt(true), 3000) // Show after 3 seconds
      }
    }

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
      console.log('PWA was installed successfully!')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if already installed on mount
    checkIfInstalled()

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  if (isInstalled || !showInstallPrompt) {
    return null
  }

  return (
    <Dialog 
      open={showInstallPrompt} 
      onClose={handleDismiss}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.95))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 3
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: 'white',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ 
            background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
            width: 48,
            height: 48
          }}>
            <GetAppOutlined sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Install EventEye
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Get the full app experience
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={handleDismiss}
          sx={{ color: 'rgba(255,255,255,0.7)' }}
        >
          <CloseOutlined />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ color: 'white', pt: 2 }}>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Install EventEye as a native app for the best experience:
          </Typography>

          <Box>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(167,139,250,0.2)', width: 40, height: 40 }}>
                  <PhoneAndroidOutlined sx={{ color: '#a78bfa' }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Access from home screen
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Quick launch like any other app
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(34,211,238,0.2)', width: 40, height: 40 }}>
                  <ComputerOutlined sx={{ color: '#22d3ee' }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Works offline
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Use without internet connection
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgba(52,211,153,0.2)', width: 40, height: 40 }}>
                  <StarOutlined sx={{ color: '#34d399' }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Faster performance
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Optimized loading and caching
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ 
            background: 'rgba(167,139,250,0.1)', 
            borderRadius: 2, 
            p: 2,
            border: '1px solid rgba(167,139,250,0.2)'
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
              <strong>Free to install</strong> • No app store required • Updates automatically
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleDismiss}
          sx={{ 
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'none'
          }}
        >
          Maybe later
        </Button>
        <Button
          onClick={handleInstall}
          variant="contained"
          startIcon={<GetAppOutlined />}
          sx={{
            background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            '&:hover': {
              background: 'linear-gradient(135deg, #9333ea, #0891b2)'
            }
          }}
        >
          Install App
        </Button>
      </DialogActions>
    </Dialog>
  )
}
