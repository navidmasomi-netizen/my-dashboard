import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Chip, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Avatar,
  TextField, InputAdornment, Button, Grid, IconButton, Tooltip
} from '@mui/material';
import { Search, FilterList, FileDownload, Refresh, Add } from '@mui/icons-material';

const ALL_LEADS = [
  { id: 'L-001', name: 'David Kim', email: 'd.kim@email.com', country: 'South Korea', affiliate: 'Sarah Chen', status: 'Qualified', source: 'Google Ads', date: '2026-04-08', value: '$5,000' },
  { id: 'L-002', name: 'Fatima Al-Hassan', email: 'fatima@email.com', country: 'UAE', affiliate: 'Marcus Rivera', status: 'New', source: 'Referral', date: '2026-04-07', value: '$3,200' },
  { id: 'L-003', name: 'Tomás García', email: 'tomas@email.com', country: 'Spain', affiliate: 'Aisha Patel', status: 'In Review', source: 'LinkedIn', date: '2026-04-07', value: '$8,500' },
  { id: 'L-004', name: 'Anya Sokolova', email: 'anya@email.com', country: 'Russia', affiliate: 'Sarah Chen', status: 'Converted', source: 'Email', date: '2026-04-06', value: '$12,000' },
  { id: 'L-005', name: 'Mohammed Al-Farsi', email: 'm.farsi@email.com', country: 'Saudi Arabia', affiliate: 'Marcus Rivera', status: 'Qualified', source: 'Meta Ads', date: '2026-04-06', value: '$7,500' },
  { id: 'L-006', name: 'Yuki Tanaka', email: 'y.tanaka@email.com', country: 'Japan', affiliate: 'James O\'Brien', status: 'New', source: 'Organic', date: '2026-04-05', value: '$4,200' },
  { id: 'L-007', name: 'Elena Müller', email: 'elena@email.com', country: 'Germany', affiliate: 'Lena Fischer', status: 'Lost', source: 'Google Ads', date: '2026-04-05', value: '$2,800' },
  { id: 'L-008', name: 'Carlos Mendez', email: 'carlos@email.com', country: 'Mexico', affiliate: 'Aisha Patel', status: 'Converted', source: 'Referral', date: '2026-04-04', value: '$9,100' },
  { id: 'L-009', name: 'Priya Nair', email: 'priya@email.com', country: 'India', affiliate: 'Sarah Chen', status: 'In Review', source: 'LinkedIn', date: '2026-04-04', value: '$6,300' },
  { id: 'L-010', name: 'Ivan Petrov', email: 'ivan@email.com', country: 'Ukraine', affiliate: 'Marcus Rivera', status: 'Qualified', source: 'Meta Ads', date: '2026-04-03', value: '$5,800' },
];

const STATUS_COLORS = {
  Qualified: 'primary', New: 'default', 'In Review': 'warning',
  Converted: 'success', Lost: 'error',
};

const STATUSES = ['All', 'New', 'Qualified', 'In Review', 'Converted', 'Lost'];

export default function Leads() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = ALL_LEADS.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.country.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || l.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = STATUSES.slice(1).reduce((acc, s) => {
    acc[s] = ALL_LEADS.filter((l) => l.status === s).length;
    return acc;
  }, {});

  return (
    <Box>
      {/* Summary chips */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total', value: ALL_LEADS.length, color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
          { label: 'New', value: counts.New, color: '#64748B', bg: 'rgba(100,116,139,0.1)' },
          { label: 'Qualified', value: counts.Qualified, color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
          { label: 'Converted', value: counts.Converted, color: '#16A34A', bg: 'rgba(22,163,74,0.1)' },
          { label: 'Lost', value: counts.Lost, color: '#DC2626', bg: 'rgba(220,38,38,0.1)' },
        ].map((c) => (
          <Grid item xs={6} sm={4} md={2.4} key={c.label}>
            <Card>
              <CardContent sx={{ p: 2, textAlign: 'center', '&:last-child': { pb: 2 } }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: c.color }}>{c.value}</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>{c.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Toolbar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{ flex: 1 }}>Lead Pipeline</Typography>
            <Button variant="contained" size="small" startIcon={<Add />}>Add Lead</Button>
            <Tooltip title="Export CSV"><IconButton size="small"><FileDownload /></IconButton></Tooltip>
            <Tooltip title="Refresh"><IconButton size="small"><Refresh /></IconButton></Tooltip>
          </Box>

          {/* Search + filter */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search leads..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 220 } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment>,
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {STATUSES.map((s) => (
                <Chip
                  key={s}
                  label={s === 'All' ? `All (${ALL_LEADS.length})` : `${s} (${counts[s] ?? 0})`}
                  onClick={() => setFilter(s)}
                  variant={filter === s ? 'filled' : 'outlined'}
                  color={filter === s ? 'primary' : 'default'}
                  size="small"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>

          {/* Table */}
          <TableContainer sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <Table size="small" sx={{ minWidth: 780 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Lead</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Affiliate</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Est. Value</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <Avatar sx={{ width: 30, height: 30, fontSize: '0.72rem', background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                          {l.name.split(' ').map((n) => n[0]).join('').slice(0,2)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600} lineHeight={1.2}>{l.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{l.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2">{l.country}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{l.affiliate}</Typography></TableCell>
                    <TableCell><Chip label={l.source} size="small" variant="outlined" /></TableCell>
                    <TableCell><Typography variant="body2" fontWeight={600} color="success.main">{l.value}</Typography></TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{l.date}</Typography></TableCell>
                    <TableCell align="center">
                      <Chip label={l.status} size="small" color={STATUS_COLORS[l.status] || 'default'} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filtered.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography color="text.secondary">No leads match your search.</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
