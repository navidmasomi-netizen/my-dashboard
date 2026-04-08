import {
  Grid, Card, CardContent, Typography, Box,
  LinearProgress, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Avatar
} from '@mui/material';
import {
  TrendingUp, People, Payments, Assessment,
  ArrowUpward, ArrowDownward
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const STATS = [
  {
    label: 'Total Leads', value: '1,284', change: '+12.4%', up: true,
    icon: <People />, color: '#2563EB', bg: 'rgba(37,99,235,0.12)',
    sub: 'This month',
  },
  {
    label: 'Active Affiliates', value: '247', change: '+3.2%', up: true,
    icon: <TrendingUp />, color: '#16A34A', bg: 'rgba(22,163,74,0.12)',
    sub: 'Out of 310 total',
  },
  {
    label: 'Commissions Due', value: '$18,420', change: '+8.7%', up: true,
    icon: <Payments />, color: '#D97706', bg: 'rgba(217,119,6,0.12)',
    sub: 'Next payout: Apr 15',
  },
  {
    label: 'Conversion Rate', value: '32.6%', change: '-1.2%', up: false,
    icon: <Assessment />, color: '#7C3AED', bg: 'rgba(124,58,237,0.12)',
    sub: 'Leads → Clients',
  },
];

const TOP_AFFILIATES = [
  { name: 'Sarah Chen', code: 'SC-4821', leads: 214, commission: '$3,840', rate: '38%', status: 'Active' },
  { name: 'Marcus Rivera', code: 'MR-2093', leads: 189, commission: '$3,210', rate: '35%', status: 'Active' },
  { name: 'Aisha Patel', code: 'AP-7741', leads: 156, commission: '$2,760', rate: '41%', status: 'Active' },
  { name: 'James O\'Brien', code: 'JO-3315', leads: 134, commission: '$2,100', rate: '29%', status: 'Pending' },
  { name: 'Lena Fischer', code: 'LF-9902', leads: 98, commission: '$1,540', rate: '33%', status: 'Active' },
];

const RECENT_LEADS = [
  { name: 'David Kim', country: 'South Korea', affiliate: 'SC-4821', status: 'Qualified', time: '2h ago' },
  { name: 'Fatima Al-Hassan', country: 'UAE', affiliate: 'MR-2093', status: 'New', time: '3h ago' },
  { name: 'Tomás García', country: 'Spain', affiliate: 'AP-7741', status: 'In Review', time: '5h ago' },
  { name: 'Anya Sokolova', country: 'Russia', affiliate: 'SC-4821', status: 'Converted', time: '7h ago' },
];

const STATUS_COLORS = {
  Active: 'success', Pending: 'warning', Inactive: 'error',
  Qualified: 'primary', New: 'default', 'In Review': 'warning', Converted: 'success',
};

function StatCard({ stat }) {
  const theme = useTheme();
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ bgcolor: stat.bg, borderRadius: 2, p: 1.2, display: 'flex' }}>
            <Box sx={{ color: stat.color }}>{stat.icon}</Box>
          </Box>
          <Chip
            size="small"
            icon={stat.up ? <ArrowUpward sx={{ fontSize: '0.75rem !important' }} /> : <ArrowDownward sx={{ fontSize: '0.75rem !important' }} />}
            label={stat.change}
            sx={{
              bgcolor: stat.up ? 'rgba(22,163,74,0.1)' : 'rgba(220,38,38,0.1)',
              color: stat.up ? '#16A34A' : '#DC2626',
              fontWeight: 700, fontSize: '0.75rem',
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.3 }}>{stat.value}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.3 }}>{stat.label}</Typography>
        <Typography variant="caption" color="text.secondary">{stat.sub}</Typography>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <Box>
      {/* Stats row */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        {STATS.map((s) => (
          <Grid item xs={12} sm={6} lg={3} key={s.label}>
            <StatCard stat={s} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        {/* Top Affiliates */}
        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                <Typography variant="h6">Top Affiliates</Typography>
                <Chip label="This Month" size="small" variant="outlined" />
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Affiliate</TableCell>
                      <TableCell align="right">Leads</TableCell>
                      <TableCell align="right">Commission</TableCell>
                      <TableCell align="right">Rate</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {TOP_AFFILIATES.map((a) => (
                      <TableRow key={a.code} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ width: 30, height: 30, fontSize: '0.72rem', background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                              {a.name.split(' ').map((n) => n[0]).join('').slice(0,2)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>{a.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{a.code}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right"><Typography variant="body2" fontWeight={600}>{a.leads}</Typography></TableCell>
                        <TableCell align="right"><Typography variant="body2" fontWeight={600} color="success.main">{a.commission}</Typography></TableCell>
                        <TableCell align="right">
                          <Box sx={{ minWidth: 60 }}>
                            <Typography variant="caption" fontWeight={600}>{a.rate}</Typography>
                            <LinearProgress variant="determinate" value={parseInt(a.rate)} color="primary" sx={{ mt: 0.5 }} />
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip label={a.status} size="small" color={STATUS_COLORS[a.status] || 'default'} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Leads */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                <Typography variant="h6">Recent Leads</Typography>
                <Chip label="Live" size="small" color="success" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {RECENT_LEADS.map((l, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      p: 1.5, borderRadius: 2,
                      bgcolor: 'background.default',
                    }}
                  >
                    <Avatar sx={{ width: 34, height: 34, fontSize: '0.78rem', background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}>
                      {l.name.split(' ').map((n) => n[0]).join('').slice(0,2)}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>{l.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{l.country} · {l.affiliate}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip label={l.status} size="small" color={STATUS_COLORS[l.status] || 'default'} sx={{ mb: 0.3 }} />
                      <Typography variant="caption" color="text.secondary" display="block">{l.time}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance bar */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2.5 }}>Monthly Performance Targets</Typography>
              <Grid container spacing={3}>
                {[
                  { label: 'Leads Target', value: 1284, total: 1500, color: 'primary' },
                  { label: 'Conversions', value: 419, total: 600, color: 'success' },
                  { label: 'Commission Paid', value: 14200, total: 20000, color: 'warning', prefix: '$' },
                  { label: 'New Affiliates', value: 18, total: 25, color: 'secondary' },
                ].map((t) => (
                  <Grid item xs={12} sm={6} md={3} key={t.label}>
                    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>{t.label}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.round((t.value / t.total) * 100)}
                      color={t.color}
                      sx={{ mb: 0.8, height: 8, borderRadius: 4 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        {t.prefix}{t.value.toLocaleString()} / {t.prefix}{t.total.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" fontWeight={700}>
                        {Math.round((t.value / t.total) * 100)}%
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
