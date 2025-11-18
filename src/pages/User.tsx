import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Box,
  Chip,
  Stack,
  TableSortLabel,
  Typography,
  Tooltip,
  Collapse,
} from "@mui/material";
import { Visibility, Edit, Delete, MoreVert, Lock, LaunchSharp } from "@mui/icons-material";
import PaginationFooterDefault from "../components/PaginationFooterDefault";
import ActionBar from "../components/ActionBar";
import DetailModal from "../components/modal/DetailModal";
import UserForm from "../components/user/UserForm";
import SearchBox from "../components/SearchBox";
import LoadingTable from "../components/table/LoadingTable";
import EmptyTable from "../components/table/EmptyTable";
import {
  ISearchParamsUsers,
  IUser,
  TDataSubmitUser,
  TUserGroups,
} from "../interfaces/user";
import { EAction, ESortDirection } from "../enums/common";
import RTableContainer from "../components/table/RTableContainer";
import DefaultWrapper from "../components/wrapper/DefaultWrapper";
import locales from "../locales";
import { ModalForm } from "../components";
import { getDefaultValuesUser, labelHeadUser } from "../constants/user";
import { useUserManager } from "../hooks/useUserManager";
import { convertDateTime } from "../utils/formatUtils";
import RTableHead from "../components/table/RTableHead";
import { getOrdinalPerPage } from "../utils/getOrdinalPerPage";

export default function UserList() {

  const {
    users,
    isDetailOpen,
    isFormOpen,
    editingUser,
    selectedUsers,
    selectedUser,
    selectedDetailUser,
    isAllSelected,
    isSearchBoxOpen,
    anchorEl,
    roleColors,
    searchFields,
    totalItems,
    page,
    isLoading,
    isChangePassword,
    rowsPerPage,
    sortConfig,
    toggleIsSearchBoxOpen,
    handleSearch,
    handleSelectUser,
    handleSelectAll,
    handleClick,
    handleClose,
    handleViewUsers,
    handleEditUsers,
    handleDeleteUsers,
    handleAddUser,
    handleChangePass,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
    setIsDetailOpen,
    setIsFormOpen,
    handleSubmitForm,
    handleQuickAccess
  } = useUserManager();

  const { userManage: t_UserManage, common: t_common } = locales['vi']

  const handleAction = (action: string) => {
    if (action === EAction.Detail) handleViewUsers();
    else if (action === EAction.Edit) handleEditUsers();
    else if (action === EAction.Delete) handleDeleteUsers();
    else if (action === EAction.ChangePass) handleChangePass();
    else if (action === EAction.QuickAccess) handleQuickAccess();
    handleClose();
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const getGroups = (groups: TUserGroups[]) => {
    return <Stack direction={'row'} spacing={2}>
      {
        groups.map((group) => (
          <Chip
            key={group.id}
            label={group.name}
            color={roleColors[group.name] || "primary"}
            variant="outlined"
          />
        ))
      }
    </Stack>
  }

  const renderContactPerson = (name: string) => {
    return <Typography variant="body1" sx={{ fontWeight: 600 }}> {name}</Typography>
  }

  return (
    <Box>
      <DefaultWrapper>
        <ActionBar
          selectedItems={selectedUsers}
          onAdd={handleAddUser}
          isSearchBoxOpen={isSearchBoxOpen}
          toggleSearchBox={toggleIsSearchBoxOpen}
        />
        <Collapse in={isSearchBoxOpen} timeout="auto">
          <SearchBox<ISearchParamsUsers> fields={searchFields} onSearch={handleSearch} />
        </Collapse>
        <RTableContainer>
          <Table>
            <RTableHead
              headLabel={labelHeadUser}
              isSelectAll={isAllSelected}
            />
            <TableBody>
              {isLoading ? (
                <LoadingTable row={rowsPerPage} column={labelHeadUser.length} />
              ) : (
                users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    selected={selectedUsers.includes(user.id)}
                    hover
                  >
                    <TableCell align="center">{getOrdinalPerPage(index, page, rowsPerPage)}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell align="center">{user.phone_number}</TableCell>
                    <TableCell align="center">
                      {convertDateTime(user.created_at)}
                    </TableCell>
                    <TableCell align="center">
                      { user?.company_id ? t_UserManage.company : t_UserManage.pharmacy }
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      <Tooltip title={t_common.option}>
                        <IconButton
                          onClick={(event) => handleClick(event, user)}
                        >
                          <MoreVert />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
              <EmptyTable column={7} show={!isLoading && !users?.length} />
            </TableBody>
          </Table>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleAction(EAction.QuickAccess)}>
              <LaunchSharp fontSize="small" sx={{ mr: 1 }} /> {t_common.quickAccess}
            </MenuItem>
            <MenuItem onClick={() => handleAction(EAction.Detail)}>
              <Visibility fontSize="small" sx={{ mr: 1 }} /> {t_common.viewDetails}
            </MenuItem>
            <MenuItem onClick={() => handleAction(EAction.Edit)}>
              <Edit fontSize="small" sx={{ mr: 1 }} /> {t_common.edit}
            </MenuItem>
            <MenuItem onClick={() => handleAction(EAction.ChangePass)}>
              <Lock fontSize="small" sx={{ mr: 1 }} /> {t_common.changePass}
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

      <ModalForm<TDataSubmitUser, IUser>
        title={editingUser && isChangePassword ? t_UserManage.changePassword : editingUser && !isChangePassword ? t_UserManage.editTitle : t_UserManage.addTitle}
        confirmText={editingUser && isChangePassword ? t_UserManage.changePassword : editingUser && !isChangePassword ? t_UserManage.update : t_UserManage.add}
        open={isFormOpen}
        onClose={handleCloseForm}
        handleSubmit={handleSubmitForm}
        defaultValues={editingUser}
        getDefaultValues={getDefaultValuesUser}
        maxWidth={isChangePassword ? 'sm' : 'md'}
      >
        <UserForm editingUser={editingUser} isChangePassword={isChangePassword} />
      </ModalForm>

      <DetailModal
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={t_UserManage.detailUser}
        data={selectedDetailUser}
        fields={[
          { key: "name", label: t_UserManage.nameLabel },
          { key: "email", label: t_UserManage.email },
          { key: "phone_number", label: t_UserManage.phone_number },
          { key: "contact_person", label: t_UserManage.contactPerson, render: (value) => selectedDetailUser?.company_id ? renderContactPerson(selectedDetailUser?.company?.contact_person ?? '') : renderContactPerson(selectedDetailUser?.pharmacy?.contact_person ?? '') || t_UserManage.noContactPerson },
          { key: "address", label: t_UserManage.address },
          { key: "ward_id", label: t_UserManage.ward, render: (value) => selectedDetailUser?.company_id ? selectedDetailUser?.company?.ward?.name : selectedDetailUser?.pharmacy?.ward?.name },
          { key: "province_id", label: t_UserManage.province, render: (value) => selectedDetailUser?.company_id ? selectedDetailUser?.company?.province?.name : selectedDetailUser?.pharmacy?.province?.name },
          { key: "tax_code", label: t_UserManage.taxCode, render: (value) => selectedDetailUser?.company_id ? selectedDetailUser?.company?.tax_code : selectedDetailUser?.pharmacy?.tax_code },
          { key: "fax", label: t_UserManage.fax, render: (value) => selectedDetailUser?.company_id ? selectedDetailUser?.company?.fax : selectedDetailUser?.pharmacy?.fax },
          { key: "groups", label: t_UserManage.groups, render: (value) => selectedDetailUser ? getGroups(selectedDetailUser?.groups) : '' },
        ]}
      />
    </Box>
  );
}
