import { useState } from 'react'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../auth'
import { Box, Button, Container, Paper, Stack, TextField, Typography, Alert } from '@mui/material'
import { LoginOutlined } from '@mui/icons-material'

export default function Login({ onSuccess, onSignup, onForgot }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email.trim(), password)
      onSuccess?.(res.user)
    } catch (e) {
      setError(e?.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setBusy(true)
    try {
      const provider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, provider)
      onSuccess?.(res.user)
    } catch (e) {
      setError(e?.message || 'Google sign-in failed')
    } finally {
      setBusy(false)
    }
  }


  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Paper sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', color: 'white' }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 700 }}>
          <LoginOutlined sx={{ mr: 1, verticalAlign: 'middle' }} />
          Login to EventEye
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField 
              label="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              fullWidth 
              variant="outlined" 
              InputLabelProps={{ style: { color: '#e5e7eb' } }} 
              InputProps={{ style: { color: 'white' } }} 
            />
            <TextField 
              label="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              fullWidth 
              variant="outlined" 
              InputLabelProps={{ style: { color: '#e5e7eb' } }} 
              InputProps={{ style: { color: 'white' } }} 
            />
            <Button 
              disabled={busy} 
              type="submit" 
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                '&:hover': {
                  background: 'linear-gradient(135deg, #059669, #0891b2)',
                }
              }}
            >
              {busy ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button 
              disabled={busy} 
              variant="outlined" 
              onClick={handleGoogle}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.5)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Continue with Google
            </Button>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button size="small" variant="text" onClick={onSignup} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Create account
              </Button>
              <Button size="small" variant="text" onClick={onForgot} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Forgot password?
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}


