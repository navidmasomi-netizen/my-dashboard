import {
  Box, Card, CardContent, Typography, Grid, Chip,
  LinearProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, Select,
  MenuItem, FormControl, InputLabel
} from '@mui/material';
import { useState } from 'react';
import { FileDownload, TrendingUp, TrendingDown } from '@mui/icons-material';

const MONTHLY_DATA = [
  { month: 'Oct', leads: 780, conversions: 248, commission: 11200 },
  { month: 'Nov', leads: 890, conversions: 290, commission: 13500 },
  { month: 'Dec', leads: 960, conversions: 318, commission: 15100 },
  { month: 'Jan', leads: 1020, conversions: 330, commission: 15900 },
  { month: 'Feb', leads: 1140, conversions: 374, commission: 17200 },
  { month: 'Mar', leads: 1284, conversions: 419, commission: 18420 },
];

const COUNTRY_DATA = [
  { country: 'UAE', leads: 214, pct: 16.7, conv: '44%' },
  { country: 'UK', leads: 189, pct: 14.7, conv: '38%' },
  { country: 'Germany', leads: 156, pct: 12.1, conv: '35%' },
  { country: 'Singapore', leads: 134, pct: 10.4, conv: '41%' },
  { country: 'USA', leads: 118, pct: 9.2, conv: '32%' },
  { country: 'Japan', leads: 98, pct: 7.6, conv: '28%' },
  { country: 'India', leads: 87, pct: 6.8, conv: '30%' },
  { country: 'Other', leads: 288, pct: 22.4, conv: '27%' },
];

const SOURCE_DATA = [
  { source: 'Google Ads', leads: 412, pct: 32.1, cpa: '$44' },
  { source: 'Referral', leads: 298, pct: 23.2, cpa: '$12' },
  { source: 'Meta Ads', leads: 234, pct: 18.2, cpa: '$38' },
  { source: 'LinkedIn', leads: 156, pct: 12.2, cpa: '$62' },
  { source: 'Organic', leads: 118, pct: 9.2, cpa: '$8' },
  { source: 'Email', leads: 66, pct: 5.1, cpa: '$6' },
];

const maxLeads = Math.max(...MONTHLY_DATA.map(d => d.leads));

export default function Reports() {
  const [period, setPeriod] = useState('6m');

  const latest = MONTHLY_DATA[MONTHLY_DATA.length - 1];
  const prev = MONTHLY_DATA[MONTHLY_DATA.length - 2];
  const leadGrowth = (((latest.leads - prev.leads) / prev.leads) * 100).toFixed(1);
  const commGrowth = (((latest.commission - prev.commission) / prev.commission) * 100).toFixed(1);

  return (
    <Box>
      {/* Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ flex: 1 }}>Performance Reports</Typography>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Period</InputLabel>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)} label="Period">
            <MenuItem value="1m">Last Month</MenuItem>
            <MenuItem value="3m">Last 3 Months</MenuItem>
            <MenuItem value="6m">Last 6 Months</MenuItem>
            <MenuItem value="1y">Last Year</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" size="small" startIcon={<FileDownload />}>Export Report</Button>
      </Box>

      {/* KPI row */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { label: 'Total Leads (6M)', value: MONTHLY_DATA.reduce((s, d) => s + d.leads, 0).toLocaleString(), growth: leadGrowth, up: parseFloat(leadGrowth) > 0 },
          { label: 'Total Conversions (6M)', value: MONTHLY_DATA.reduce((s, d) => s + d.conversions, 0).toLocaleString(), growth: '7.3', up: true },
          { label: 'Total Commission (6M)', value: '$' + (MONTHLY_DATA.reduce((s, d) => s + d.commission, 0) / 1000).toFixed(1) + 'K', growth: commGrowth, up: parseFloat(commGrowth) > 0 },
          { label: 'Avg Conv. Rate (6M)', value: (MONTHLY_DATA.reduce((s, d) => s + d.conversions / d.leads * 100, 0) / MONTHLY_DATA.length).toFixed(1) + '%', growth: '1.4', up: true },
        ].map((k) => (
          <Grid item xs={6} md={3} key={k.label}>
            <Card>
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography variant="h5" fontWeight={800}>{k.value}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 0.8 }}>{k.label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {k.up ? <TrendingUp sx={{ fontSize: 14, color: '#16A34A' }} /> : <TrendingDown sx={{ fontSize: 14, color: '#DC2626' }} />}
                  <Typography variant="caption" sx={{ color: k.up ? '#16A34A' : '#DC2626', fontWeight: 700 }}>
                    {k.up ? '+' : ''}{k.growth}% vs prev month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        {/* Monthly bar chart (CSS-based) */}
        <Grid item xs={12} lg={7}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Monthly Lead Volume</Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, height: 180 }}>
                {MONTHLY_DATA.map((d) => {
                  const h = Math.round((d.leads / maxLeads) * 160);
                  return (
                    <Box key={d.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="caption" fontWeight={700} color="text.secondary">{d.leads}</Typography>
                      <Box
                        sx={{
                          width: '100%',
                          height: h,
                          background: 'linear-gradient(180deg, #2563EB 0%, #7C3AED 100%)',
                          borderRadius: '6px 6px 0 0',
                          transition: 'height 0.4s ease',
                          minHeight: 4,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>{d.month}</Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ display: 'flex', gap: 3, mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Total Leads</Typography>
                  <Typography variant="body2" fontWeight={700}>{MONTHLY_DATA.reduce((s, d) => s + d.leads, 0).toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Total Conversions</Typography>
                  <Typography variant="body2" fontWeight={700}>{MONTHLY_DATA.reduce((s, d) => s + d.conversions, 0).toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Total Commission</Typography>
                  <Typography variant="body2" fontWeight={700} color="success.main">
                    ${MONTHLY_DATA.reduce((s, d) => s + d.commission, 0).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Source breakdown */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2.5 }}>Lead Sources</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {SOURCE_DATA.map((s) => (
                  <Box key={s.source}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={600}>{s.source}</Typography>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Typography variant="caption" color="text.secondary">{s.leads} leads</Typography>
                        <Typography variant="caption" fontWeight={700} color="text.secondary">CPA: {s.cpa}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={s.pct}
                        sx={{ flex: 1, height: 7, borderRadius: 4 }}
                      />
                      <Typography variant="caption" fontWeight={700} sx={{ minWidth: 36, textAlign: 'right' }}>{s.pct}%</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Country breakdown */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2.5 }}>Top Countries by Lead Volume</Typography>
              <TableContainer sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <Table size="small" sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Country</TableCell>
                      <TableCell align="right">Leads</TableCell>
                      <TableCell>Distribution</TableCell>
                      <TableCell align="right">Conv. Rate</TableCell>
                      <TableCell align="right">Share</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {COUNTRY_DATA.map((c) => (
                      <TableRow key={c.country} hover>
                        <TableCell><Typography variant="body2" fontWeight={600}>{c.country}</Typography></TableCell>
                        <TableCell align="right"><Typography variant="body2" fontWeight={600}>{c.leads}</Typography></TableCell>
                        <TableCell sx={{ minWidth: 160 }}>
                          <LinearProgress variant="determinate" value={c.pct} color="secondary" sx={{ borderRadius: 4 }} />
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={c.conv}
                            size="small"
                            color={parseFloat(c.conv) >= 40 ? 'success' : parseFloat(c.conv) >= 30 ? 'primary' : 'default'}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={700}>{c.pct}%</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
