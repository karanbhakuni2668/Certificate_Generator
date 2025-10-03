import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../auth'
import { Box, Button, Container, Paper, Stack, TextField, Typography, Alert } from '@mui/material'

export default function Signup({ onSuccess, onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email.trim(), password)
      if (name.trim()) {
        await updateProfile(res.user, { displayName: name.trim() })
      }
      onSuccess?.(res.user)
    } catch (e) {
      setError(e?.message || 'Signup failed')
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
      <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', color: 'white' }}>
        <Typography variant="h6" gutterBottom>Create account</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth variant="outlined" InputLabelProps={{ style: { color: '#e5e7eb' } }} InputProps={{ style: { color: 'white' } }} />
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth variant="outlined" InputLabelProps={{ style: { color: '#e5e7eb' } }} InputProps={{ style: { color: 'white' } }} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth variant="outlined" InputLabelProps={{ style: { color: '#e5e7eb' } }} InputProps={{ style: { color: 'white' } }} />
            <Button disabled={busy} type="submit" variant="contained">Sign Up</Button>
            <Button disabled={busy} variant="outlined" onClick={handleGoogle}>Continue with Google</Button>
            <Button size="small" variant="text" onClick={onLogin}>Back to login</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}


