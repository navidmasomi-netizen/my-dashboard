import {
  Box, AppBar, Toolbar, IconButton, Typography, Avatar,
  Badge, Paper, BottomNavigation, BottomNavigationAction,
  useMediaQuery, Tooltip, InputBase
} from '@mui/material';
import {
  Notifications, Search, DarkMode, LightMode,
  Dashboard, People, SupervisedUserCircle, Payments, Assessment
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useColorMode } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const SIDEBAR_WIDTH = 240;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Leads', icon: <People />, path: '/leads' },
  { label: 'Affiliates', icon: <SupervisedUserCircle />, path: '/affiliates' },
  { label: 'Commissions', icon: <Payments />, path: '/commissions' },
  { label: 'Reports', icon: <Assessment />, path: '/reports' },
];

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back — here\'s your overview' },
  '/leads': { title: 'Leads', subtitle: 'Track and manage incoming leads' },
  '/affiliates': { title: 'Affiliates', subtitle: 'Manage your affiliate partners' },
  '/commissions': { title: 'Commissions', subtitle: 'Track earnings and payouts' },
  '/reports': { title: 'Reports', subtitle: 'Analytics and performance reports' },
};

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleColorMode, mode } = useColorMode();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pageInfo = PAGE_TITLES[location.pathname] || { title: 'AffiliateDesk', subtitle: '' };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Desktop sidebar — fixed, full height */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 1200,
          }}
        >
          <Sidebar />
        </Box>
      )}

      {/* Main column */}
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          /* Reserve space for mobile bottom navbar */
          pb: isMobile ? '56px' : 0,
        }}
      >
        {/* Top AppBar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: 'text.primary',
          }}
        >
          <Toolbar sx={{ gap: 1.5, px: { xs: 2, md: 3.5 } }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ lineHeight: 1.2, fontWeight: 700 }}>
                {pageInfo.title}
              </Typography>
              {pageInfo.subtitle && (
                <Typography variant="caption" color="text.secondary" noWrap>
                  {pageInfo.subtitle}
                </Typography>
              )}
            </Box>

            {/* Search — hidden on xs */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: 1,
                bgcolor: 'background.default',
                border: `1.5px solid ${theme.palette.divider}`,
                borderRadius: 2.5,
                px: 1.5,
                py: 0.6,
                width: 200,
              }}
            >
              <Search sx={{ fontSize: 16, color: 'text.secondary' }} />
              <InputBase
                placeholder="Search..."
                sx={{ fontSize: '0.875rem', flex: 1, color: 'text.primary' }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Box>

            {/* Dark mode toggle */}
            <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
              <IconButton onClick={toggleColorMode} sx={{ color: 'text.secondary' }}>
                {mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <IconButton sx={{ color: 'text.secondary' }}>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Avatar + name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 3.5 } }}>
          <Outlet />
        </Box>
      </Box>

      {/* Mobile bottom navbar — replaces sidebar on small screens */}
      {isMobile && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
          }}
        >
          <BottomNavigation
            value={location.pathname}
            onChange={(_, newPath) => navigate(newPath)}
            showLabels
          >
            {NAV_ITEMS.map((item) => (
              <BottomNavigationAction
                key={item.path}
                label={item.label}
                icon={item.icon}
                value={item.path}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
}
