import {
  Box, Card, CardContent, Typography, Grid, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Avatar, Button, LinearProgress, Divider, IconButton, Tooltip
} from '@mui/material';
import { FileDownload, Payments, AccountBalance, Pending, CheckCircle } from '@mui/icons-material';

const COMMISSIONS = [
  { id: 'COM-001', affiliate: 'Sarah Chen', code: 'SC-4821', period: 'Mar 2026', leads: 214, conversions: 82, rate: '15%', gross: '$25,600', commission: '$3,840', status: 'Paid', paidOn: '2026-04-01' },
  { id: 'COM-002', affiliate: 'Marcus Rivera', code: 'MR-2093', period: 'Mar 2026', leads: 189, conversions: 66, rate: '15%', gross: '$21,400', commission: '$3,210', status: 'Paid', paidOn: '2026-04-01' },
  { id: 'COM-003', affiliate: 'Aisha Patel', code: 'AP-7741', period: 'Mar 2026', leads: 156, conversions: 64, rate: '15%', gross: '$18,400', commission: '$2,760', status: 'Processing', paidOn: '—' },
  { id: 'COM-004', affiliate: "James O'Brien", code: 'JO-3315', period: 'Mar 2026', leads: 134, conversions: 39, rate: '12%', gross: '$17,500', commission: '$2,100', status: 'Pending', paidOn: '—' },
  { id: 'COM-005', affiliate: 'Lena Fischer', code: 'LF-9902', period: 'Mar 2026', leads: 98, conversions: 32, rate: '12%', gross: '$12,833', commission: '$1,540', status: 'Pending', paidOn: '—' },
  { id: 'COM-006', affiliate: 'Wei Tang', code: 'WT-1124', period: 'Mar 2026', leads: 74, conversions: 20, rate: '10%', gross: '$9,800', commission: '$980', status: 'Paid', paidOn: '2026-04-01' },
  { id: 'COM-007', affiliate: 'Diana Moreau', code: 'DM-5538', period: 'Feb 2026', leads: 112, conversions: 47, rate: '15%', gross: '$14,933', commission: '$2,240', status: 'Paid', paidOn: '2026-03-01' },
  { id: 'COM-008', affiliate: 'Kai Nakamura', code: 'KN-8817', period: 'Mar 2026', leads: 55, conversions: 14, rate: '10%', gross: '$6,200', commission: '$620', status: 'Pending', paidOn: '—' },
];

const STATUS_COLORS = { Paid: 'success', Processing: 'warning', Pending: 'default' };
const STATUS_ICONS = { Paid: <CheckCircle sx={{ fontSize: 14 }} />, Processing: <Pending sx={{ fontSize: 14 }} />, Pending: <Pending sx={{ fontSize: 14 }} /> };

const total = (field) => COMMISSIONS.reduce((s, c) => {
  const num = parseFloat(c[field].replace(/[$,]/g, ''));
  return s + (isNaN(num) ? 0 : num);
}, 0);

export default function Commissions() {
  const totalCommission = total('commission');
  const paidCommission = COMMISSIONS.filter(c => c.status === 'Paid').reduce((s, c) => s + parseFloat(c.commission.replace(/[$,]/g, '')), 0);
  const pendingCommission = totalCommission - paidCommission;

  return (
    <Box>
      {/* Summary cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { label: 'Total Commissions', value: `$${totalCommission.toLocaleString()}`, icon: <Payments />, color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
          { label: 'Paid Out', value: `$${paidCommission.toLocaleString()}`, icon: <AccountBalance />, color: '#16A34A', bg: 'rgba(22,163,74,0.1)' },
          { label: 'Pending Payout', value: `$${pendingCommission.toLocaleString()}`, icon: <Pending />, color: '#D97706', bg: 'rgba(217,119,6,0.1)' },
          { label: 'Pay Rate', value: `${((paidCommission / totalCommission) * 100).toFixed(0)}%`, icon: <CheckCircle />, color: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
        ].map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ bgcolor: s.bg, borderRadius: 2, p: 1, display: 'flex', color: s.color }}>{s.icon}</Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: s.color }}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Payout progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="subtitle1">April 2026 Payout Progress</Typography>
            <Chip label="Next payout: Apr 15" size="small" color="primary" />
          </Box>
          <LinearProgress
            variant="determinate"
            value={(paidCommission / totalCommission) * 100}
            color="success"
            sx={{ height: 10, borderRadius: 5, mb: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              ${paidCommission.toLocaleString()} paid of ${totalCommission.toLocaleString()} total
            </Typography>
            <Typography variant="caption" fontWeight={700} color="success.main">
              {((paidCommission / totalCommission) * 100).toFixed(0)}% complete
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
            <Typography variant="h6" sx={{ flex: 1 }}>Commission Records</Typography>
            <Button variant="outlined" size="small" startIcon={<Payments />}>Process Payouts</Button>
            <Tooltip title="Export"><IconButton size="small"><FileDownload /></IconButton></Tooltip>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Affiliate</TableCell>
                  <TableCell>Period</TableCell>
                  <TableCell align="right">Leads</TableCell>
                  <TableCell align="right">Conversions</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Gross Vol.</TableCell>
                  <TableCell align="right">Commission</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell>Paid On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {COMMISSIONS.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell><Typography variant="caption" fontFamily="monospace" fontWeight={700}>{c.id}</Typography></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: '0.68rem', background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                          {c.affiliate.split(' ').map((n) => n[0]).join('').slice(0,2)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600} lineHeight={1.2}>{c.affiliate}</Typography>
                          <Typography variant="caption" color="text.secondary">{c.code}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2">{c.period}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2">{c.leads}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2">{c.conversions}</Typography></TableCell>
                    <TableCell align="right"><Chip label={c.rate} size="small" variant="outlined" /></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={600}>{c.gross}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={700} color="success.main">{c.commission}</Typography></TableCell>
                    <TableCell align="center">
                      <Chip
                        icon={STATUS_ICONS[c.status]}
                        label={c.status}
                        size="small"
                        color={STATUS_COLORS[c.status] || 'default'}
                      />
                    </TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{c.paidOn}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
