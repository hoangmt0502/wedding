import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Box,
  TableSortLabel,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import { MoreVert, Delete, Edit, Visibility } from "@mui/icons-material";
import {
  getPermissions,
  createPermission,
  deletePermissions,
  updatePermission,
} from "../services/permissionService";
import PaginationFooterDefault from "../components/PaginationFooterDefault";
import ActionBar from "../components/ActionBar";
import DetailModal from "../components/modal/DetailModal";
import PermissionForm from "../components/permission/PermissionForm";
import SearchBox, { TField } from "../components/SearchBox";
import { useAlertModal } from "../context/AlertModal";
import EmptyTable from "../components/table/EmptyTable";
import LoadingTable from "../components/table/LoadingTable";
import { IDataSubmitPermission, IPermission, ISearchParamsPermissions, TParamsPermission } from "../interfaces/permission";
import { EAction, EAlertType, ESortDirection } from "../enums/common";
import RTableContainer from "../components/table/RTableContainer";
import DefaultWrapper from "../components/wrapper/DefaultWrapper";
import locales from "../locales";
import { INITIAL_PAGE, PER_PAGE } from "../constants/common";

export default function PermissionsList() {
  const {permissionManage: t_permissionManage, common: t_common} = locales['vi']
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPermission, setSelectedPermission] = useState<IPermission | null>(null);
  const [selectedDetailPermission, setSelectedDetailPermission] = useState<IPermission | null>(null);
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [error, setError] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<IPermission | null>(null);
  const { showAlert } = useAlertModal();

  // Pagination state
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(PER_PAGE);
  const [sortConfig, setSortConfig] = useState<{key: string; direction: ESortDirection}>({ key: "id", direction: ESortDirection.DESC });
  const [isLoading, setIsLoading] = useState(false);

  // Search parameters state
  const [searchParams, setSearchParams] = useState({});

  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(true);

  const toggleIsSearchBoxOpen = () => setIsSearchBoxOpen(prev => !prev)

  // Fetch permissions when component mounts or dependencies change
  const fetchPermissions = async () => {
    try {
      setIsLoading(true);
      const params: TParamsPermission = {
        page: page,
        per_page: rowsPerPage,
        sort_by: sortConfig.key,
        sort_direction: sortConfig.direction,
        ...searchParams,
      };
      const data_permissions = await getPermissions(params);
      setPermissions(data_permissions.data);
      setTotalItems(data_permissions.total);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [page, rowsPerPage, sortConfig, searchParams]);

  // Handle search from SearchBox
  const handleSearch = (params: ISearchParamsPermissions) => {
    setSearchParams(params);
    setPage(0);
  };

  // Check if all permissions are selected
  const isAllSelected =
    permissions.length > 0 && selectedPermissions.length === permissions.length;

  // Handle individual permission selection
  const handleSelectPermission = (id: number) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((permissionId) => permissionId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle select all or deselect all
  const handleSelectAll = () => {
    setSelectedPermissions(
      isAllSelected ? [] : permissions.map((permission) => permission.id)
    );
  };

  // Open action menu
  const handleClick = (event: any, permission: IPermission) => {
    setAnchorEl(event.currentTarget);
    setSelectedPermissions([permission.id]);
    setSelectedPermission(permission);
  };

  // Close action menu
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPermission(null);
  };

  // Handle menu actions
  const handleAction = (action: EAction) => {
    if (action === EAction.Detail) {
      handleViewPermissions();
    } else if (action === EAction.Edit) {
      handleEditPermissions();
    } else if (action === EAction.Delete) {
      handleDeletePermissions();
    }
    handleClose();
  };

  // Handle page change
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle view permission details
  const handleViewPermissions = () => {
    if (selectedPermissions.length !== 1) {
      showAlert(EAlertType.WARNING, t_common.dialogError, t_permissionManage.pleaseSelectOneView);
      return;
    }

    const permissionToView = permissions.find(
      (permission) => permission.id === selectedPermissions[0]
    );
    if (!permissionToView) {
      showAlert(EAlertType.WARNING, t_common.dialogError, t_permissionManage.notFoundPermission);
      return;
    }
    setSelectedDetailPermission(permissionToView);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    if (selectedDetailPermission) {
      setIsDetailOpen(true);
    }
  }, [selectedDetailPermission]);

  // Handle edit permission
  const handleEditPermissions = () => {
    if (selectedPermissions.length === 1) {
      const permissionToEdit = permissions.find(
        (permission) => permission.id === selectedPermissions[0]
      );
      setEditingPermission(permissionToEdit ?? null);
      setIsFormOpen(true);
    } else {
      alert(t_permissionManage.pleaseSelectOneEdit);
    }
  };

  // Handle delete permissions
  const handleDeletePermissions = () => {
    if (selectedPermissions.length === 0) {
      showAlert(EAlertType.WARNING, t_common.dialogWarning, t_permissionManage.pleaseSelectOneDelete);
      return;
    }

    showAlert(
      EAlertType.WARNING,
      t_common.dialogWarning,
      t_permissionManage.deleteNoice(selectedPermission?.name ?? ''),
      [
        {
          text: t_common.delete,
          handler: async () => {
            try {
              await deletePermissions(selectedPermissions);
              showAlert(
                EAlertType.SUCCESS,
                t_common.dialogSuccess,
                t_permissionManage.deletedSuccess(selectedPermission?.name ?? '')
              );
              setSelectedPermissions([]);
              await fetchPermissions();
            } catch (error: any) {
              showAlert(
                EAlertType.ERROR,
                t_common.dialogError,
                `${error.response?.data?.message || error.message}`
              );
            }
          },
        },
      ]
    );
  };

  // Handle add new permission
  const handleAddPermission = () => {
    setEditingPermission(null);
    setIsFormOpen(true);
  };

  // Close the form
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Handle form submission
  const handleSubmitForm = async (data: IDataSubmitPermission) => {
    try {
      if (editingPermission) {
        await updatePermission(editingPermission.id, data);
        showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_permissionManage.updateSuccess);
      } else {
        await createPermission(data);
        showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_permissionManage.createSuccess);
      }
      setIsFormOpen(false);
      await fetchPermissions();
    } catch (error: any) {
      showAlert(
        EAlertType.ERROR,
        t_common.dialogError,
        `${error.response?.data?.message || error.message}`
      );
    }
  };

  // Handle sort configuration change
  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === ESortDirection.ASC? ESortDirection.DESC : ESortDirection.ASC,
    }));
  };

  const searchFields: TField[] = [];

  return (
    <Box>
      <DefaultWrapper>
        <ActionBar
          selectedItems={selectedPermissions}
          onAdd={handleAddPermission}
          isSearchBoxOpen={isSearchBoxOpen}
          toggleSearchBox={toggleIsSearchBoxOpen}
        />
        <Collapse in={isSearchBoxOpen} timeout="auto" unmountOnExit><SearchBox fields={searchFields} onSearch={handleSearch} /></Collapse>
        <RTableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                <TableCell width={60} align="center">
                  <Typography variant="subtitle2">{t_permissionManage.ordinal}</Typography>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "name"}
                    direction={sortConfig.key === "name" ? sortConfig.direction : ESortDirection.ASC}
                    onClick={() => handleSort("name")}
                  >
                    <Typography variant="subtitle2">{t_permissionManage.name}</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "description"}
                    direction={sortConfig.key === "description" ? sortConfig.direction : ESortDirection.ASC}
                    onClick={() => handleSort("description")}
                  >
                    <Typography variant="subtitle2">{t_permissionManage.description}</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" width={130}>
                  <Typography variant="subtitle2">{t_permissionManage.actions}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? <LoadingTable row={rowsPerPage} column={4} /> : (Array.isArray(permissions) && permissions.length > 0 && (
                permissions.map((permission, index) => (
                  <TableRow key={permission.id} selected={selectedPermissions.includes(permission.id)}>
                    <TableCell align="center">{(index + 1) + (page-1) * rowsPerPage}</TableCell>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>{permission.description}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Tùy chọn">
                        <IconButton onClick={(event) => handleClick(event, permission)}>
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ))}
              <EmptyTable column={5} show={!isLoading && !permissions?.length}/>
            </TableBody>
          </Table>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => handleAction(EAction.Detail)}>
              <Visibility fontSize="small" sx={{ mr: 1 }} /> {t_common.viewDetail}
            </MenuItem>
            <MenuItem onClick={() => handleAction(EAction.Edit)}>
              <Edit fontSize="small" sx={{ mr: 1 }} /> {t_common.edit}
            </MenuItem>
            <MenuItem onClick={() => handleAction(EAction.Delete)}>
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
      <PermissionForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        permission={editingPermission}
      />
      <DetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={t_permissionManage.detailPermission}
        data={selectedDetailPermission}
        fields={[
          { key: "name", label: t_permissionManage.name },
          { key: "description", label: t_permissionManage.description },
        ]}
      />
    </Box>
  );
}
