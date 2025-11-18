import React, { useEffect, useMemo, useCallback, useRef, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Typography, FormGroup, FormControlLabel,
  Checkbox, DialogActions, Button,
  Grid2
} from '@mui/material';
import { getAll } from '../../services/permissionService';
import { IPermission } from '../../interfaces/permission';
import { IGroups } from '../../interfaces/groups';
import locales from '../../locales';

type Props = {
  open: boolean;
  onClose: (v: boolean) => void;
  group: IGroups | null;
  permissions: Record<number, IPermission[]>;
  onAddPermission: (groupId: number, permissionIds: number[]) => void;
};

const GroupPermission: React.FC<Props> = ({ open, onClose, group, permissions, onAddPermission }) => {
  const { common: t_common } = locales['vi'];

  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<IPermission[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const fetchedRef = useRef(false);
  useEffect(() => {
    if (!open || fetchedRef.current) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await getAll();
        if (!cancelled) {
          setAvailable(data || []);
          fetchedRef.current = true;
        }
      } catch {
        if (!cancelled) setAvailable([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [open]);


  useEffect(() => {
    if (!open || !group) return;
    const current = (permissions[group.id] || []).map(p => p.id);
    setSelected(new Set(current));
  }, [open, group, permissions]);

  const allIds = useMemo(() => available.map(p => p.id), [available]);
  const allSet = useMemo(() => new Set(allIds), [allIds]);

  const selectedCount = useMemo(() => {
    let c = 0; 
    for (const id of selected) if (allSet.has(id)) c++;
    return c;
  }, [selected, allSet]);

  const allChecked = allSet.size > 0 && selectedCount === allSet.size;
  const indeterminate = selectedCount > 0 && selectedCount < allSet.size;

  const toggleAll = useCallback((checked: boolean) => {
    setSelected(checked ? new Set(allIds) : new Set());
  }, [allIds]);

  const toggleOne = useCallback((id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!group) return;
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    onAddPermission(group.id, ids);
    onClose(false);
  }, [group, selected, onAddPermission, onClose]);

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth keepMounted>
      <DialogTitle sx={{ py: 1 }}>Thêm quyền vào nhóm</DialogTitle>
      <DialogContent dividers sx={{ px: 2, py: 2 }}>
        {loading ? (
          <Typography variant="body2" color="text.secondary">{t_common.loading}</Typography>
        ) : (
          <FormGroup sx={{ m: 0 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allChecked}
                  indeterminate={indeterminate}
                  onChange={(e) => toggleAll(e.target.checked)}
                  sx={{ p: 0.5, '&.Mui-checked': { color: '#000' } }}
                />
              }
              label={<span style={{ fontSize: 14, color: '#000' }}>{t_common.selectAll}</span>}
              sx={{
                px: 1, py: 0.5, m: 0,
                bgcolor: '#fff', border: '1px solid #ddd', borderRadius: 2, width: '100%',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            />

            <Grid2 container spacing={1} p={0} mt={1}>
              {available.map((perm) => (
                <Grid2 key={perm.id} size={{ xs: 12, md: 6 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selected.has(perm.id)}
                        onChange={() => toggleOne(perm.id)}
                        sx={{ p: 0.5, '&.Mui-checked': { color: '#000' } }}
                      />
                    }
                    label={<span style={{ fontSize: 14, color: '#000' }}>{perm.description}</span>}
                    sx={{
                      px: 1, py: 0.5, m: 0,
                      bgcolor: '#fff', border: '1px solid #ddd', borderRadius: 2, width: '100%',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  />
                </Grid2>
              ))}
            </Grid2>
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 2 }}>
        <Button onClick={() => onClose(false)}>{t_common.cancel}</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={selected.size === 0 || loading}
        >
          {t_common.update}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(GroupPermission, (prev, next) => {
  const prevG = prev.group?.id ?? 0;
  const nextG = next.group?.id ?? 0;
  const ids = (o?: IPermission[]) => (o ?? []).map(x => x.id).sort().join(',');
  return (
    prev.open === next.open &&
    prevG === nextG &&
    ids(prev.permissions[prevG]) === ids(next.permissions[nextG])
  );
});
