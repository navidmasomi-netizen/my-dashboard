import {
  Box, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Avatar, Chip, Divider, Tooltip
} from '@mui/material';
import {
  Dashboard, People, SupervisedUserCircle,
  Payments, Assessment, Logout
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Leads', icon: <People />, path: '/leads', badge: 12 },
  { label: 'Affiliates', icon: <SupervisedUserCircle />, path: '/affiliates' },
  { label: 'Commissions', icon: <Payments />, path: '/commissions' },
  { label: 'Reports', icon: <Assessment />, path: '/reports' },
];

export default function Sidebar({ onNav }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const sidebarBg = isDark ? '#0F172A' : '#1E293B';
  const activeColor = '#60A5FA';
  const textColor = '#94A3B8';
  const activeBg = 'rgba(37,99,235,0.2)';

  const handleNav = (path) => {
    navigate(path);
    onNav?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    onNav?.();
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <Box
      sx={{
        width: 240,
        height: '100%',
        bgcolor: sidebarBg,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <Box sx={{ px: 2.5, py: 2.5, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36, height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '0.9rem' }}>A</Typography>
          </Box>
          <Box>
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1 }}>
              Affiliate<span style={{ color: '#60A5FA' }}>Desk</span>
            </Typography>
            <Typography sx={{ color: '#64748B', fontSize: '0.68rem', mt: 0.3 }}>IB Platform</Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav */}
      <Box sx={{ px: 1.5, pt: 2, flex: 1 }}>
        <Typography sx={{ color: '#475569', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', px: 1, mb: 1 }}>
          Main Menu
        </Typography>
        <List disablePadding>
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.path}
                onClick={() => handleNav(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  borderLeft: `3px solid ${active ? '#2563EB' : 'transparent'}`,
                  bgcolor: active ? activeBg : 'transparent',
                  color: active ? activeColor : textColor,
                  pl: 1.5,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: '#E2E8F0' },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 600 : 500 }}
                />
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    sx={{ bgcolor: '#2563EB', color: 'white', height: 20, fontSize: '0.7rem', fontWeight: 700, '& .MuiChip-label': { px: 0.8 } }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* User footer */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 34, height: 34, fontSize: '0.78rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              flexShrink: 0,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography sx={{ color: '#E2E8F0', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'User'}
            </Typography>
            <Typography sx={{ color: '#64748B', fontSize: '0.72rem' }}>{user?.role}</Typography>
          </Box>
          <Tooltip title="Logout">
            <Box
              component="button"
              onClick={handleLogout}
              sx={{
                bgcolor: 'transparent', border: 'none', cursor: 'pointer',
                color: '#475569', p: 0.5, borderRadius: 1,
                '&:hover': { color: '#94A3B8' },
                display: 'flex', alignItems: 'center',
              }}
            >
              <Logout sx={{ fontSize: 16 }} />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
