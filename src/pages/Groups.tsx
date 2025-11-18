import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Checkbox, Box, TableSortLabel, Menu, MenuItem, Typography,
} from '@mui/material';
import { getGroups, createGroup, deleteGroups, updateGroup, getGroupPermissions, unassignGroupPermission, assignGroupPermissions } from '../services/groupService';
import {
  updatePermission,
} from "../services/permissionService";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import PaginationFooterDefault from '../components/PaginationFooterDefault';
import ActionBar from '../components/ActionBar';
import DetailModal from '../components/modal/DetailModal';
import { useAlertModal } from '../context/AlertModal';
import GroupForm from '../components/role/GroupForm';
import GroupRow from '../components/role/GroupRow';
import PermissionForm from "../components/permission/PermissionForm";
import EmptyTable from '../components/table/EmptyTable';
import LoadingTable from '../components/table/LoadingTable';
import { EAction, EAlertType, ESortDirection } from '../enums/common';
import { IDataSubmitGroups, IGroups, ISearchParamsGroups, TEditingPermissionState } from '../interfaces/groups';
import { IDataSubmitPermission, IPermission } from '../interfaces/permission';
import RTableContainer from '../components/table/RTableContainer';
import DefaultWrapper from '../components/wrapper/DefaultWrapper';
import locales from '../locales';
import { INITIAL_PAGE, PER_PAGE } from '../constants/common';
import { extractErrorMessage } from '../utils/errorHelpers';
import GroupPermission from '../components/role/GroupPermission';

export default function GroupList() {
  const { roleManage: t_roleManage, common: t_common, user: { groups: t_groups } } = locales['vi']
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState<IGroups | null>(null);
  const [selectedDetailGroup, setSelectedDetailGroup] = useState<IGroups | null>(null);
  const [groups, setGroups] = useState<IGroups[]>([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<IGroups | null>(null);
  const [isPermissionFormOpen, setIsPermissionFormOpen] = useState(false);
  const [isPermissionSelectOpen, setIsPermissionSelectOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<TEditingPermissionState | null>(null);
  const { showAlert } = useAlertModal();
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [permissions, setPermissions] = useState<{ [key: number]: IPermission[] }>({});
  const [loadingPermissions, setLoadingPermissions] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(PER_PAGE);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: ESortDirection }>({ key: "id", direction: ESortDirection.DESC });
  const [isLoading, setIsLoading] = useState(false)

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const params: ISearchParamsGroups = {
        page: page,
        per_page: rowsPerPage,
        sort_by: sortConfig.key,
        sort_direction: sortConfig.direction,
      };
      const data_users = await getGroups(params);
      setGroups(data_users.data);
      setTotalItems(data_users.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchPermissions = async (groupId: number) => {
    try {
      setLoadingPermissions(prev => ({ ...prev, [groupId]: true }));
      const perms = await getGroupPermissions(groupId);
      setPermissions(prev => ({ ...prev, [groupId]: perms }));
    } catch (error: any) {
      showAlert(EAlertType.ERROR, t_common.error, extractErrorMessage(error?.response?.data?.errors || error.message));
    } finally {
      setLoadingPermissions(prev => ({ ...prev, [groupId]: false }));
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [page, rowsPerPage, sortConfig]);

  const handleExpandClick = (groupId: number) => {
    setExpandedRows(prev => {
      const isExpanded = !prev[groupId];
      if (isExpanded && !permissions[groupId]) {
        fetchPermissions(groupId);
      }
      return { ...prev, [groupId]: isExpanded };
    });
    const groupToEdit = groups.find(group => group.id === groupId);
    setEditingGroup(groupToEdit || null);
  };

  const isAllSelected = groups.length > 0 && selectedGroups.length === groups.length;

  const handleSelectGroup = (id: number) => {
    setSelectedGroups(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedGroups(isAllSelected ? [] : groups.map(group => group.id));
  };

  const handleClick = (event: any, group: IGroups) => {
    setAnchorEl(event.currentTarget);
    setSelectedGroups([group.id]);
    setSelectedGroup(group);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedGroup(null);
  };

  const handleAction = (action: string) => {
    if (action === EAction.Detail) handleViewGroups();
    else if (action === EAction.Edit) handleEditGroups();
    else if (action === EAction.Delete) handleDeleteGroups();
    handleClose();
  };

  const handleChangePage = (event: any, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewGroups = () => {
    if (selectedGroups.length !== 1) {
      showAlert(EAlertType.WARNING, t_common.error, t_groups.selectOneToView);
      return;
    }
    const groupToView = groups.find(group => group.id === selectedGroups[0]);
    if (!groupToView) {
      showAlert(EAlertType.WARNING, t_common.error, t_groups.unitNotFound);
      return;
    }
    setSelectedDetailGroup(groupToView);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    if (selectedDetailGroup) setIsDetailOpen(true);
  }, [selectedDetailGroup]);

  const handleEditGroups = () => {
    if (selectedGroups.length !== 1) {
      showAlert(EAlertType.WARNING, t_common.error, t_groups.selectOneToEdit);
      return;
    }
    const groupToEdit = groups.find(group => group.id === selectedGroups[0]);
    setEditingGroup(groupToEdit || null);
    setIsFormOpen(true);
  };

  const handleDeleteGroups = () => {
    if (selectedGroups.length === 0) {
      showAlert(EAlertType.WARNING, t_common.dialogWarning, t_groups.selectToDelete);
      return;
    }
    showAlert(
      EAlertType.WARNING,
      t_common.dialogConfirm,
      t_groups.confirmDeleteContent(selectedGroups.length),
      [{
        text: t_groups.delete,
        handler: async () => {
          try {
            await deleteGroups(selectedGroups);
            showAlert(EAlertType.SUCCESS, t_groups.deleteSuccess, t_groups.deletedSuccess(selectedGroups.length));
            setSelectedGroups([]);
            await fetchGroups();
          } catch (error: any) {
            showAlert(EAlertType.ERROR, t_common.error, extractErrorMessage(error?.response?.data?.errors || error.message));
          }
        },
      }]
    );
  };

  const handleAddGroup = () => {
    setEditingGroup(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => setIsFormOpen(false);

  const handleClosePermissionForm = () => {
    setIsPermissionFormOpen(false);
    setEditingPermission(null);
  };

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === ESortDirection.ASC ? ESortDirection.DESC : ESortDirection.ASC,
    }));
  };

  const handleSubmitForm = async (data: IDataSubmitGroups) => {
    try {
      if (editingGroup) {
        await updateGroup(editingGroup.id, data);
        showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_groups.updateSuccess);
      } else {
        await createGroup(data);
        showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_groups.addSuccess);
      }
      setIsFormOpen(false);
      await fetchGroups();
    } catch (error: any) {
      showAlert(EAlertType.ERROR, t_common.error, extractErrorMessage(error?.response?.data?.errors || error.message));
    }
  };

  const handleEditPermission = (group: IGroups, permission: IPermission) => {
    setEditingPermission({ ...permission, group_id: group.id });
    setIsPermissionFormOpen(true);
  };

  const handleSubmitPermissionForm = async (data: IDataSubmitPermission) => {
    try {
      if (editingPermission) {
        const group_id = editingPermission.group_id;
        const updatedPermission = { ...data, id: editingPermission.id };
        await updatePermission(editingPermission.id, data);
        setPermissions(prev => ({
          ...prev,
          [group_id]: prev[group_id].map(p =>
            p.id === editingPermission.id ? { ...p, ...data } : p
          )
        }));
        showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_groups.updateSuccess);
        setIsPermissionFormOpen(false);
        setEditingPermission(null);
      }
    } catch (error: any) {
      showAlert(EAlertType.ERROR, t_common.error, extractErrorMessage(error?.response?.data?.errors || error.message));
    }
  };

  const handleUnassignPermission = async (group: IGroups, permission: IPermission) => {
    try {
      await unassignGroupPermission(group.id, permission.id);
      setPermissions(prev => ({
        ...prev,
        [group.id]: prev[group.id].filter(p => p.id !== permission.id)
      }));
      showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_groups.removePermissionSuccess);
    } catch (error: any) {
      showAlert(EAlertType.ERROR, t_common.error, extractErrorMessage(error?.response?.data?.errors || error.message));
    }
  };

  const handleAssignPermission = async (group_id: number, permission_ids: number[]) => {
    try {
      permission_ids = permission_ids.filter(id => id !== undefined);
      const response = await assignGroupPermissions(group_id, permission_ids);
      const newPermissions = response.group.permissions;
      setPermissions(prev => ({
        ...prev,
        [group_id]: newPermissions
      }));
      showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_groups.addSuccess);
    } catch (error: any) {
      showAlert(EAlertType.ERROR, t_common.error, extractErrorMessage(error?.response?.data?.errors || error.message));
    }
  };

  return (
    <Box>
      <DefaultWrapper>
        <ActionBar
          selectedItems={selectedGroups}
          onView={handleViewGroups}
          onEdit={handleEditGroups}
          onDelete={handleDeleteGroups}
          onAdd={handleAddGroup}
          label={t_roleManage.labelActionBar}
        />
        <RTableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                <TableCell padding="checkbox">
                  <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
                </TableCell>
                <TableCell sx={{ width: "40px" }} /> {/* Cột mở rộng */}
                <TableCell>
                  <Typography variant="subtitle2">{t_groups.ordinal}</Typography>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "name"}
                    direction={sortConfig.key === "name" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    <Typography variant="subtitle2">{t_groups.name}</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "description"}
                    direction={sortConfig.key === "description" ? sortConfig.direction : "asc"}
                    onClick={() => handleSort("description")}
                  >
                    <Typography variant="subtitle2">{t_groups.description}</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">{t_groups.actions}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? <LoadingTable row={rowsPerPage} column={6} /> : groups.map((group, index) => (
                <GroupRow
                  key={group.id}
                  group={group}
                  index={index}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selectedGroups={selectedGroups}
                  expandedRows={expandedRows}
                  permissions={permissions}
                  loadingPermissions={loadingPermissions}
                  onSelectGroup={handleSelectGroup}
                  onExpandClick={handleExpandClick}
                  onMenuClick={handleClick}
                  onEditPermission={handleEditPermission}
                  onUnassignPermission={handleUnassignPermission}
                  onOpenPermissionSelect={setIsPermissionSelectOpen}
                />
              ))}
              <EmptyTable column={6} show={!isLoading && !groups?.length} />
            </TableBody>
          </Table>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => handleAction("detail")}>
              <Visibility fontSize="small" sx={{ mr: 1 }} /> {t_common.viewDetail}
            </MenuItem>
            <MenuItem onClick={() => handleAction("edit")}>
              <Edit fontSize="small" sx={{ mr: 1 }} /> {t_common.edit}
            </MenuItem>
            <MenuItem onClick={() => handleAction("delete")}>
              <Delete fontSize="small" sx={{ mr: 1 }} /> {t_common.delete}
            </MenuItem>
          </Menu>
          <PaginationFooterDefault
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </RTableContainer>
      </DefaultWrapper>
      <GroupForm open={isFormOpen} onClose={handleCloseForm} onSubmit={handleSubmitForm} group={editingGroup} />
      <GroupPermission open={isPermissionSelectOpen} onClose={setIsPermissionSelectOpen} onAddPermission={handleAssignPermission} group={editingGroup} permissions={permissions} />
      <PermissionForm
        open={isPermissionFormOpen}
        onClose={handleClosePermissionForm}
        onSubmit={handleSubmitPermissionForm}
        permission={editingPermission}
      />
      <DetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={t_groups.detailTitle}
        data={selectedDetailGroup}
        fields={[
          { key: "name", label: t_groups.name },
          { key: "description", label: t_groups.description },
        ]}
      />
    </Box>
  );
}
