import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Avatar, Chip,
  TextField, InputAdornment, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, LinearProgress,
  IconButton, Tooltip
} from '@mui/material';
import { Search, Add, FileDownload, MoreVert, StarRate } from '@mui/icons-material';

const AFFILIATES = [
  { id: 'SC-4821', name: 'Sarah Chen', email: 'sarah.chen@example.com', country: 'Singapore', tier: 'Gold', leads: 214, converted: 82, commission: '$3,840', rate: '38.3%', joined: '2024-03-12', status: 'Active' },
  { id: 'MR-2093', name: 'Marcus Rivera', email: 'm.rivera@example.com', country: 'USA', tier: 'Gold', leads: 189, converted: 66, commission: '$3,210', rate: '34.9%', joined: '2024-05-01', status: 'Active' },
  { id: 'AP-7741', name: 'Aisha Patel', email: 'aisha.p@example.com', country: 'UK', tier: 'Silver', leads: 156, converted: 64, commission: '$2,760', rate: '41.0%', joined: '2024-07-18', status: 'Active' },
  { id: 'JO-3315', name: "James O'Brien", email: 'james.ob@example.com', country: 'Ireland', tier: 'Silver', leads: 134, converted: 39, commission: '$2,100', rate: '29.1%', joined: '2024-09-04', status: 'Pending' },
  { id: 'LF-9902', name: 'Lena Fischer', email: 'l.fischer@example.com', country: 'Germany', tier: 'Bronze', leads: 98, converted: 32, commission: '$1,540', rate: '32.7%', joined: '2024-11-22', status: 'Active' },
  { id: 'WT-1124', name: 'Wei Tang', email: 'wei.tang@example.com', country: 'China', tier: 'Bronze', leads: 74, converted: 20, commission: '$980', rate: '27.0%', joined: '2025-01-09', status: 'Active' },
  { id: 'DM-5538', name: 'Diana Moreau', email: 'd.moreau@example.com', country: 'France', tier: 'Silver', leads: 112, converted: 47, commission: '$2,240', rate: '42.0%', joined: '2024-08-30', status: 'Inactive' },
  { id: 'KN-8817', name: 'Kai Nakamura', email: 'kai.n@example.com', country: 'Japan', tier: 'Bronze', leads: 55, converted: 14, commission: '$620', rate: '25.5%', joined: '2025-03-01', status: 'Active' },
];

const TIER_COLORS = { Gold: '#D97706', Silver: '#64748B', Bronze: '#92400E' };
const STATUS_COLORS = { Active: 'success', Pending: 'warning', Inactive: 'error' };

export default function Affiliates() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = AFFILIATES.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.country.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <Box>
      {/* Summary */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { label: 'Total Affiliates', value: AFFILIATES.length, color: '#2563EB' },
          { label: 'Active', value: AFFILIATES.filter(a => a.status === 'Active').length, color: '#16A34A' },
          { label: 'Gold Tier', value: AFFILIATES.filter(a => a.tier === 'Gold').length, color: '#D97706' },
          { label: 'Avg Conv. Rate', value: (AFFILIATES.reduce((s, a) => s + parseFloat(a.rate), 0) / AFFILIATES.length).toFixed(1) + '%', color: '#7C3AED' },
        ].map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: s.color }}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{ flex: 1 }}>Affiliate Partners</Typography>
            <Button variant="contained" size="small" startIcon={<Add />}>Add Affiliate</Button>
            <Tooltip title="Export"><IconButton size="small"><FileDownload /></IconButton></Tooltip>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search affiliates..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 220 } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>,
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['All', 'Active', 'Pending', 'Inactive'].map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  onClick={() => setFilterStatus(s)}
                  variant={filterStatus === s ? 'filled' : 'outlined'}
                  color={filterStatus === s ? 'primary' : 'default'}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>

          <TableContainer sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <Table size="small" sx={{ minWidth: 860 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Affiliate</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Tier</TableCell>
                  <TableCell align="right">Leads</TableCell>
                  <TableCell>Conv. Rate</TableCell>
                  <TableCell align="right">Commission</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.72rem', background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                          {a.name.split(' ').map((n) => n[0]).join('').slice(0,2)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600} lineHeight={1.2}>{a.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{a.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="caption" fontFamily="monospace" fontWeight={700}>{a.id}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{a.country}</Typography></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarRate sx={{ fontSize: 14, color: TIER_COLORS[a.tier] }} />
                        <Typography variant="caption" fontWeight={700} sx={{ color: TIER_COLORS[a.tier] }}>{a.tier}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={600}>{a.leads}</Typography></TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 80 }}>
                        <Typography variant="caption" fontWeight={600}>{a.rate}</Typography>
                        <LinearProgress variant="determinate" value={parseFloat(a.rate)} color="primary" sx={{ mt: 0.4 }} />
                      </Box>
                    </TableCell>
                    <TableCell align="right"><Typography variant="body2" fontWeight={700} color="success.main">{a.commission}</Typography></TableCell>
                    <TableCell align="center">
                      <Chip label={a.status} size="small" color={STATUS_COLORS[a.status] || 'default'} />
                    </TableCell>
                    <TableCell><IconButton size="small"><MoreVert fontSize="small" /></IconButton></TableCell>
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
