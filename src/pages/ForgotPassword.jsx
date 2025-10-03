import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../auth'
import { Box, Button, Container, Paper, Stack, TextField, Typography, Alert } from '@mui/material'

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMsg(null)
    setBusy(true)
    try {
      await sendPasswordResetEmail(auth, email.trim())
      setMsg('Password reset link sent. Check your email.')
    } catch (e) {
      setError(e?.message || 'Failed to send reset email')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', color: 'white' }}>
        <Typography variant="h6" gutterBottom>Reset password</Typography>
        {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth variant="outlined" InputLabelProps={{ style: { color: '#e5e7eb' } }} InputProps={{ style: { color: 'white' } }} />
            <Button disabled={busy} type="submit" variant="contained">Send reset link</Button>
            <Button disabled={busy} variant="text" onClick={onBack}>Back to login</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}


