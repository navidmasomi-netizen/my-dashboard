import { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button,
  Typography, Alert, Link, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useColorMode } from '../contexts/ThemeContext';
import { LightMode, DarkMode } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toggleColorMode, mode } = useColorMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    const ok = login(email, password);
    if (ok) navigate('/dashboard');
    else setError('Invalid credentials.');
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
      }}
    >
      {/* Grid overlay */}
      <Box
        sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(37,99,235,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Theme toggle */}
      <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
        <IconButton
          onClick={toggleColorMode}
          sx={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.6)' }}
        >
          {mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>

      <Card sx={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1, borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          {/* Logo */}
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

          <Typography variant="h5" sx={{ mb: 0.5 }}>Welcome back</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3.5 }}>
            Sign in to your IB dashboard
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="email"
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 0.5 }}
              autoComplete="current-password"
            />
            <Box sx={{ textAlign: 'right', mb: 2.5 }}>
              <Link href="#" underline="hover" variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                Forgot password?
              </Link>
            </Box>
            <Button type="submit" variant="contained" fullWidth size="large">
              Sign In
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don't have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/signup')}
              underline="hover"
              color="primary"
              sx={{ fontWeight: 600, verticalAlign: 'baseline' }}
            >
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
