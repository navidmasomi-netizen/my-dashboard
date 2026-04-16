import { useState, useEffect, useCallback } from 'react';
import {
  Box, Card, CardContent, Typography, Chip, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Avatar,
  TextField, InputAdornment, Button, Grid, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  DialogContentText, Alert, MenuItem, CircularProgress,
} from '@mui/material';
import { Search, Refresh, Add, Edit, Delete } from '@mui/icons-material';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const STATUSES = ['New', 'Qualified', 'Pending', 'Lost'];

const STATUS_COLORS = {
  New: 'default',
  Qualified: 'primary',
  Pending: 'warning',
  Lost: 'error',
};

const EMPTY_FORM = { name: '', email: '', country: '', status: 'New', assignedTo: '' };

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Add / Edit dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Delete confirmation
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setPageError('');
    try {
      const res = await fetch(`${API}/api/leads`);
      const json = await res.json();
      if (json.success) setLeads(json.data);
      else setPageError(json.message);
    } catch {
      setPageError('Could not connect to the server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setFormError('');
    setDialogMode('add');
    setDialogOpen(true);
  };

  const openEdit = (lead) => {
    setForm({
      name: lead.name,
      email: lead.email,
      country: lead.country ?? '',
      status: lead.status,
      assignedTo: lead.assignedTo ?? '',
    });
    setEditId(lead.id);
    setFormError('');
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    if (formLoading) return;
    setDialogOpen(false);
  };

  const handleFormChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const url = dialogMode === 'add'
        ? `${API}/api/leads`
        : `${API}/api/leads/${editId}`;
      const res = await fetch(url, {
        method: dialogMode === 'add' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setDialogOpen(false);
        fetchLeads();
      } else {
        setFormError(json.message);
      }
    } catch {
      setFormError('Could not connect to the server.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API}/api/leads/${deleteId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setDeleteId(null);
        fetchLeads();
      } else {
        setPageError(json.message);
        setDeleteId(null);
      }
    } catch {
      setPageError('Could not connect to the server.');
      setDeleteId(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.country ?? '').toLowerCase().includes(q);
    const matchFilter = filterStatus === 'All' || l.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s).length;
    return acc;
  }, {});

  return (
    <Box>
      {/* Summary cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total', value: leads.length, color: '#2563EB' },
          { label: 'New', value: counts.New ?? 0, color: '#64748B' },
          { label: 'Qualified', value: counts.Qualified ?? 0, color: '#2563EB' },
          { label: 'Pending', value: counts.Pending ?? 0, color: '#D97706' },
          { label: 'Lost', value: counts.Lost ?? 0, color: '#DC2626' },
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

      {pageError && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setPageError('')}>
          {pageError}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Toolbar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{ flex: 1 }}>Lead Pipeline</Typography>
            <Button variant="contained" size="small" startIcon={<Add />} onClick={openAdd}>
              Add New
            </Button>
            <Tooltip title="Refresh">
              <IconButton size="small" onClick={fetchLeads} disabled={loading}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Search + status filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search leads..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 220 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['All', ...STATUSES].map((s) => (
                <Chip
                  key={s}
                  label={s === 'All' ? `All (${leads.length})` : `${s} (${counts[s] ?? 0})`}
                  onClick={() => setFilterStatus(s)}
                  variant={filterStatus === s ? 'filled' : 'outlined'}
                  color={filterStatus === s ? 'primary' : 'default'}
                  size="small"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>

          {/* Table */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <>
              <TableContainer sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <Table size="small" sx={{ minWidth: 680 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Lead</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Assigned To</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered.map((l) => (
                      <TableRow key={l.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <Avatar sx={{
                              width: 30, height: 30, fontSize: '0.72rem',
                              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                            }}>
                              {l.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600} lineHeight={1.2}>{l.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{l.email}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{l.country || '—'}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{l.assignedTo || '—'}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={l.status}
                            size="small"
                            color={STATUS_COLORS[l.status] || 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(l.createdAt).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => openEdit(l)}>
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={() => setDeleteId(l.id)}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {filtered.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography color="text.secondary">
                    {leads.length === 0
                      ? 'No leads yet. Click "Add New" to create your first lead.'
                      : 'No leads match your search.'}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Add / Edit dialog ── */}
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Add New Lead' : 'Edit Lead'}</DialogTitle>
        <Box component="form" onSubmit={handleFormSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            {formError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{formError}</Alert>
            )}
            <TextField
              label="Full Name *"
              fullWidth
              value={form.name}
              onChange={handleFormChange('name')}
              sx={{ mb: 2 }}
              autoFocus
            />
            <TextField
              label="Email *"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleFormChange('email')}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Country"
              fullWidth
              value={form.country}
              onChange={handleFormChange('country')}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Status"
              select
              fullWidth
              value={form.status}
              onChange={handleFormChange('status')}
              sx={{ mb: 2 }}
            >
              {STATUSES.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Assigned To"
              fullWidth
              value={form.assignedTo}
              onChange={handleFormChange('assignedTo')}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={closeDialog} disabled={formLoading}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={formLoading}>
              {formLoading ? 'Saving…' : dialogMode === 'add' ? 'Add Lead' : 'Save Changes'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* ── Delete confirmation dialog ── */}
      <Dialog
        open={deleteId !== null}
        onClose={() => { if (!deleteLoading) setDeleteId(null); }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Lead</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete the lead. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteId(null)} disabled={deleteLoading}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={deleteLoading}>
            {deleteLoading ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
