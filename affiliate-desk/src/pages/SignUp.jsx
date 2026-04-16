import { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button,
  Typography, Alert, Link, Divider, IconButton, Tooltip, MenuItem
} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useColorMode } from '../contexts/ThemeContext';

const ROLES = ['IB Manager', 'Affiliate Manager', 'Admin', 'Analyst'];

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('IB Manager');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toggleColorMode, mode } = useColorMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    const result = await signup(name, email, password, role);
    setLoading(false);
    if (result.success) {
      setSuccess('Account created! You can now sign in.');
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(37,99,235,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
        <IconButton
          onClick={toggleColorMode}
          sx={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.6)' }}
        >
          {mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>

      <Card sx={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1, borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 42, height: 42,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1.1rem' }}>A</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Affiliate<Box component="span" sx={{ color: 'primary.main' }}>Desk</Box>
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 0.5 }}>Create account</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5 }}>
            Join the AffiliateDesk IB platform
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {success}{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate('/login')}
                underline="hover"
                color="inherit"
                sx={{ fontWeight: 600, verticalAlign: 'baseline' }}
              >
                Sign in
              </Link>
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
              autoFocus
              disabled={!!success}
            />
            <TextField
              label="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              disabled={!!success}
            />
            <TextField
              label="Role"
              select
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ mb: 2 }}
              disabled={!!success}
            >
              {ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </TextField>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              disabled={!!success}
            />
            <TextField
              label="Confirm password"
              type="password"
              fullWidth
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              sx={{ mb: 3 }}
              disabled={!!success}
            />
            <Button type="submit" variant="contained" fullWidth size="large" disabled={loading || !!success}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/login')}
              underline="hover"
              color="primary"
              sx={{ fontWeight: 600, verticalAlign: 'baseline' }}
            >
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
