import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material'
import { ExpandMoreOutlined, AssignmentOutlined, RateReviewOutlined, HelpOutlined, SupportOutlined } from '@mui/icons-material'

export default function NavBar({ user, onLogout, onNavigate }) {
  const [moreAnchorEl, setMoreAnchorEl] = useState(null)
  const openMore = Boolean(moreAnchorEl)

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget)
  }

  const handleMoreClose = () => {
    setMoreAnchorEl(null)
  }

  const handleMoreItemClick = (action) => {
    handleMoreClose()
    // Handle different menu item actions
    switch (action) {
      case 'fill-form':
        onNavigate && onNavigate('fill-form')
        break
      case 'testimonials':
        onNavigate && onNavigate('testimonials')
        break
      case 'help':
        onNavigate && onNavigate('help-center')
        break
      case 'support':
        onNavigate && onNavigate('support')
        break
      default:
        break
    }
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.35), rgba(2,6,23,0.25))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.35)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        backdropSaturation: '120%'
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Typography
          variant="h6"
          onClick={() => onNavigate && onNavigate('dashboard')}
          sx={{ flex: 1, letterSpacing: 0.5, fontWeight: 700, background: 'linear-gradient(90deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', userSelect: 'none' }}
        >
          EventEye
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={() => onNavigate && onNavigate('home')}
            sx={{ color: 'rgba(255,255,255,0.9)', textTransform: 'none' }}
          >
            Home
          </Button>
          <Button
            onClick={() => onNavigate && onNavigate('about')}
            sx={{ color: 'rgba(255,255,255,0.9)', textTransform: 'none' }}
          >
            About
          </Button>
          <Button
            onClick={() => onNavigate && onNavigate('contact')}
            sx={{ color: 'rgba(255,255,255,0.9)', textTransform: 'none' }}
          >
            Contact
          </Button>
          
          {/* More Dropdown Menu */}
          <Button
            onClick={handleMoreClick}
            endIcon={<ExpandMoreOutlined />}
            sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            More
          </Button>
          
          <Menu
            anchorEl={moreAnchorEl}
            open={openMore}
            onClose={handleMoreClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              '& .MuiPaper-root': {
                background: 'linear-gradient(135deg, rgba(30,30,30,0.95), rgba(15,23,42,0.95))',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 2,
                mt: 1,
                minWidth: 200,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }
            }}
          >
            <MenuItem 
              onClick={() => handleMoreItemClick('fill-form')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(167,139,250,0.2)'
                }
              }}
            >
              <AssignmentOutlined sx={{ mr: 2, color: '#a78bfa' }} />
              Fill Form
            </MenuItem>
            
            <MenuItem 
              onClick={() => handleMoreItemClick('testimonials')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(34,211,238,0.2)'
                }
              }}
            >
              <RateReviewOutlined sx={{ mr: 2, color: '#22d3ee' }} />
              Testimonials
            </MenuItem>
            
            <MenuItem 
              onClick={() => handleMoreItemClick('help')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(52,211,153,0.2)'
                }
              }}
            >
              <HelpOutlined sx={{ mr: 2, color: '#34d399' }} />
              Help Center
            </MenuItem>
            
            <MenuItem 
              onClick={() => handleMoreItemClick('support')}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(245,158,11,0.2)'
                }
              }}
            >
              <SupportOutlined sx={{ mr: 2, color: '#f59e0b' }} />
              Support
            </MenuItem>
          </Menu>
          
          {!!user?.email && (
            <Typography component="span" sx={{ color: 'rgba(255,255,255,0.9)' }}>{user.email}</Typography>
          )}
          <Button
            onClick={onLogout}
            sx={{
              color: 'white',
              px: 2,
              borderRadius: 999,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.35), rgba(34,197,94,0.35))',
              border: '1px solid rgba(255,255,255,0.25)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(34,197,94,0.5))',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}