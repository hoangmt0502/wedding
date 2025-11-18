import React, { useState, SetStateAction, Fragment } from 'react';
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Collapse,
  Box,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  Grid,
  Button,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  MoreVert,
  Lock,
  Person,
  Edit,
  RemoveCircleOutline,
  Add,
  Info
} from '@mui/icons-material';
import { getAll } from "../../services/permissionService";
import { IGroups } from '../../interfaces/groups';
import { IPermission } from '../../interfaces/permission';
import locales from '../../locales';

type TProps = {
  group: IGroups;
  index: number;
  page: number;
  rowsPerPage: number;
  selectedGroups: number[];
  expandedRows: Record<number, boolean>;
  permissions: Record<number, IPermission[]>;
  loadingPermissions: Record<number, boolean>;
  onSelectGroup: (groupId: number) => void;
  onExpandClick: (groupId: number) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, group: IGroups) => void;
  onEditPermission: (group: IGroups, permission: IPermission) => void;
  onUnassignPermission: (group: IGroups, permission: IPermission) => void;
  onOpenPermissionSelect: React.Dispatch<SetStateAction<boolean>>;
}

const GroupRow = ({
  group,
  index,
  page,
  rowsPerPage,
  selectedGroups,
  expandedRows,
  permissions,
  loadingPermissions,
  onSelectGroup,
  onExpandClick,
  onMenuClick,
  onEditPermission,
  onUnassignPermission,
  onOpenPermissionSelect
}: TProps) => {
  const { common: t_common } = locales['vi'];

  const isSelected = selectedGroups.includes(group.id);
  const isExpanded = expandedRows[group.id] || false;
  const groupPermissions = permissions[group.id] || [];
  const isLoading = loadingPermissions[group.id] || false;

  const [hoveredPermissionId, setHoveredPermissionId] = useState<number | null>(null);

  // Hàm trả về icon phù hợp với loại quyền
  const getPermissionIcon = (type?: string) => {
    switch (type) {
      case 'security':
        return <Lock />;
      case 'user':
        return <Person />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <TableRow selected={isSelected} hover>
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected} onChange={() => onSelectGroup(group.id)} />
        </TableCell>
        <TableCell sx={{ width: "40px" }}>
          <IconButton onClick={() => onExpandClick(group.id)} size="small">
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
        <TableCell>{(index + 1) + (page - 1) * rowsPerPage}</TableCell>
        <TableCell>{group.name}</TableCell>
        <TableCell>{group.description}</TableCell>
        <TableCell align="center">
          <Tooltip title="Tùy chọn">
            <IconButton onClick={(event) => onMenuClick(event, group)} size="small">
              <MoreVert />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: 0, height: 'auto !important' }}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ m: 1, maxHeight: "500px", overflow: "auto" }}>
              {isLoading ? (
                <Typography variant="body2" color="text.secondary">
                  Đang tải...
                </Typography>
              ) : groupPermissions.length > 0 ? (
                <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2, mt: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Quyền của nhóm
                  </Typography>
                  <Grid container spacing={2}>
                    {groupPermissions.map((perm, idx) => (
                      <Grid item xs={12} sm={6} key={perm.id}>
                        <ListItem
                          sx={{
                            bgcolor: perm.isCritical ? "error.light" : "inherit",
                          }}
                          onMouseEnter={() => setHoveredPermissionId(perm.id)}
                          onMouseLeave={() => setHoveredPermissionId(null)}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                            {getPermissionIcon(perm.type) && (
                              <IconButton edge="start" disabled>
                                {getPermissionIcon(perm.type)}
                              </IconButton>
                            )}
                            <ListItemText
                              primary={perm.name}
                              secondary={
                                <Tooltip title={perm.description || ""} arrow>
                                  <Typography component="span" color="text.secondary" noWrap>
                                    {perm.description}
                                  </Typography>
                                </Tooltip>
                              }
                            />
                          </Box>
                          {hoveredPermissionId === perm.id && (
                            <Box sx={{ display: "flex" }}>
                              <IconButton
                                onClick={() => onEditPermission(group, perm)}
                                size="small"
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                onClick={() => onUnassignPermission(group, perm)}
                                size="small"
                              >
                                <RemoveCircleOutline fontSize="small" />
                              </IconButton>
                            </Box>
                          )}
                        </ListItem>
                        {idx < groupPermissions.length - 1 && <Divider />}
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => onOpenPermissionSelect(true)}
                    sx={{ mt: 2 }}
                  >
                    Thêm quyền
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "grey.100",
                    borderRadius: 2,
                    mt: 2,
                    textAlign: "center",
                  }}
                >
                  <Info sx={{ fontSize: 40, color: "grey.500", mb: 1 }} />
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Không có quyền nào được gán cho nhóm này
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => onOpenPermissionSelect(true)}
                  >
                    Thêm quyền ngay
                  </Button>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default GroupRow;
