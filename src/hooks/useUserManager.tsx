import { useEffect, useState } from "react";
import { ISearchParamsUsers, IUser, TDataSubmitUser, TParamsUsers, TRoleUser } from "../interfaces/user";
import { useAlertModal } from "../context/AlertModal";
import { EAlertType, ESortDirection } from "../enums/common";
import { deleteUsers, getUser, getUsers, postQuickAccess, registerUser, updateUser } from "../services/userService";
import locales from "../locales";
import { TField } from "../components/SearchBox";
import { extractErrorMessage } from "../utils/errorHelpers";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import CONFIG from "../config";
import { useNavigate } from "react-router-dom";
import { setImpersonationToken } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/hook";

export const useUserManager = () => {
  const { showAlert } = useAlertModal();
  const dispatch = useAppDispatch();
  const {
    user,
    setUser,
    setPermissions,
    setIsPermissionsLoaded,
  } = useAuth();
  const navigate = useNavigate();
  const {
    common: t_common,
    userManage: t_user,
  } = locales["vi"];

  type UserState = {
    users: IUser[];
    selectedUsers: number[];
    selectedUser: IUser | null;
    selectedDetailUser: IUser | null;
    editingUser: IUser | null;
    isDetailOpen: boolean;
    isFormOpen: boolean;
    anchorEl: HTMLElement | null;
    isLoading: boolean;
    isChangePassword: boolean;
    totalItems: number;
    page: number;
    rowsPerPage: number;
    isHiddenPagination?: boolean;
    sortConfig: { key: string; direction: ESortDirection };
    searchParams: any;
    isSearchBoxOpen: boolean;
  };

  const initialState: UserState = {
    users: [],
    selectedUsers: [],
    selectedUser: null,
    selectedDetailUser: null,
    editingUser: null,
    isDetailOpen: false,
    isFormOpen: false,
    anchorEl: null,
    isLoading: false,
    isChangePassword: false,
    totalItems: 0,
    page: 1,
    rowsPerPage: 10,
    isHiddenPagination: false,
    sortConfig: { key: "id", direction: ESortDirection.DESC },
    searchParams: null,
    isSearchBoxOpen: false,
  };

  const [state, setState] = useState<UserState>(initialState);

  const updateState = <K extends keyof UserState>(key: K, value: UserState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const updateStates = (values: Partial<UserState>) => {
    setState((prev) => ({ ...prev, ...values }));
  };

  const isAllSelected =
    state.users.length > 0 && state.selectedUsers.length === state.users.length;

  const getSingleSelectedUser = (): IUser | null => {
    if (state.selectedUsers.length !== 1) {
      showAlert(EAlertType.ERROR, t_common.dialogError, t_user.selectOneToView);
      return null;
    }
    const user = state.users.find((u) => u.id === state.selectedUsers[0]);
    if (!user) {
      showAlert(EAlertType.WARNING, t_common.dialogError, t_user.notFound);
      return null;
    }
    return user;
  };

  const fetchUsers = async (silent = false) => {
    if (!silent) updateState("isLoading", true);
    try {
      const params: TParamsUsers & { filters?: any } = {
        page: state.page,
        per_page: state.rowsPerPage,
        sort_by: state.sortConfig.key,
        sort_direction: state.sortConfig.direction,
        ...state.searchParams
      };

      const response = await getUsers(params);
      updateStates({
        users: response.data,
        totalItems: response.total,
        isLoading: false,
      });
    } catch (error) {
      updateState("isLoading", false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [state.page, state.rowsPerPage, state.sortConfig, state.searchParams]);

  const handleSearch = (params: any) => {
    updateStates({ searchParams: params, page: 1 });
  };

  const handleSelectUser = (id: number) => {
    updateState(
      "selectedUsers",
      state.selectedUsers.includes(id)
        ? state.selectedUsers.filter((x) => x !== id)
        : [...state.selectedUsers, id]
    );
  };

  const handleSelectAll = () => {
    updateState("selectedUsers", isAllSelected ? [] : state.users.map((u) => u.id));
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>, user: IUser) => {
    updateStates({
      anchorEl: e.currentTarget,
      selectedUser: user,
      selectedUsers: [user.id],
    });
  };

  const handleCloseMenu = () => {
    updateStates({ anchorEl: null, selectedUser: null });
  };

  const handleChangePage = (_: any, newPage: number) => updateState("page", newPage);

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStates({ rowsPerPage: parseInt(e.target.value, 10), page: 1 });
  };

  const handleSort = (key: string) => {
    const direction =
      state.sortConfig.key === key && state.sortConfig.direction === ESortDirection.ASC
        ? ESortDirection.DESC
        : ESortDirection.ASC;
    updateState("sortConfig", { key, direction });
  };

  const handleView = async () => {
    const user = getSingleSelectedUser();
    if (!user) return;
    const resUser = await getUser(user.id);
    if (!resUser) {
      showAlert(EAlertType.ERROR, t_common.dialogError, t_user.notFound);
      return;
    }
    updateStates({ selectedDetailUser: resUser, isDetailOpen: true, anchorEl: null, selectedUser: null, isChangePassword: false });
  };

  const handleEdit = async () => {
    const user = getSingleSelectedUser();
    if (!user) return;
    const resUser = await getUser(user.id);
    if (!resUser) {
      showAlert(EAlertType.ERROR, t_common.dialogError, t_user.notFound);
      return;
    }
    updateStates({ editingUser: resUser, isFormOpen: true, anchorEl: null, selectedUser: null, isChangePassword: false });
  };

  const handleChangePass = async () => {
    const user = getSingleSelectedUser();
    if (!user) return;
    const resUser = await getUser(user.id);
    if (!resUser) {
      showAlert(EAlertType.ERROR, t_common.dialogError, t_user.notFound);
      return;
    }
    updateStates({ editingUser: resUser, isFormOpen: true, anchorEl: null, selectedUser: null, isChangePassword: true });
  };

  const submitDelete = async () => {
    try {
      if (state.selectedUser) {
        await deleteUsers([state.selectedUser.id]);
        showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_user.deletedSuccess(state.selectedUser.name));
        updateStates({ selectedUser: null, selectedUsers: [] });
        handleCloseMenu();
        await fetchUsers();
      }
    } catch (error: any) {
      showAlert(EAlertType.ERROR, t_common.dialogError, error?.response?.data?.message);
    }
  };

  const handleDelete = () => {
    updateStates({ anchorEl: null, isChangePassword: false });

    if (state.selectedUsers.length === 0) {
      showAlert(EAlertType.WARNING, t_common.dialogWarning, t_user.selectToDelete);
      return;
    }

    showAlert(
      EAlertType.WARNING,
      t_common.dialogConfirm,
      t_user.confirmDeleteContent(state.selectedUser?.name ?? ''),
      [
        {
          text: t_user.delete,
          handler: submitDelete,
        },
      ]
    );
  };

  const handleAdd = () => {
    updateStates({ editingUser: null, isFormOpen: true });
  };

  const handleSubmitForm = async (data: TDataSubmitUser) => {

    const dataSubmit: TDataSubmitUser = {
      ...data,
    };

    try {
      if (state.editingUser) {
        const updated: TDataSubmitUser & { id: number } = { ...dataSubmit, id: state.editingUser.id };
        const res = await updateUser(updated.id, updated);
        showAlert(EAlertType.SUCCESS, t_common.dialogSuccess, t_user.updateSuccess);
        await fetchUsers();
        return res;
      } else {
        const res = await registerUser(dataSubmit);
        showAlert(EAlertType.SUCCESS, t_common.dialogAdd, t_user.addSuccess);
        await fetchUsers();
        return res;
      }
    } catch (error: any) {
      showAlert(EAlertType.ERROR, t_common.dialogError, extractErrorMessage(error?.response?.data?.errors));
    }
  };

  const toggleIsSearchBoxOpen = () => {
    updateState("isSearchBoxOpen", !state.isSearchBoxOpen);
  };

  const handleLoginSuccess = (token: string, impersonationToken: string) => {
    localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, token);
    localStorage.setItem(CONFIG.IMPERSONATION_KEY, impersonationToken);
    dispatch(setImpersonationToken(impersonationToken))
    setIsPermissionsLoaded(true);
  };

  const handleQuickAccess = async () => {
    showAlert(
      EAlertType.WARNING,
      t_common.dialogConfirm,
      t_user.quickAccessTo(state.selectedUser?.name ?? ''),
      [
        {
          text: t_user.allow,
          handler: async () => {
            try {
              if (!state.selectedUser) {
                toast.warning(t_user.selectOneToView);
                return;
              }
              const res = await postQuickAccess(state.selectedUser?.member?.id);
              await handleLoginSuccess(res.token, res.impersonation_key);
              window.location.href = '/';
            } catch (error: any) {
              console.log(error);
              toast.error(extractErrorMessage(error?.response?.data?.errors || error.message));
            }
          },
        },
      ]
    );
    
  }

  const roleColors: Record<TRoleUser, "error" | "warning" | "primary" | "default"> = {
    admin: "error",
    editor: "warning",
    user: "primary",
    default: "default",
  };

  const uniqueGroups = Array.from(
    new Map(
      state.users
        .flatMap((user) => user.groups || [])
        .map((group) => [group.id, group])
    ).values()
  );

  const searchFields: TField<ISearchParamsUsers>[] = [
    {
      name: "group",
      label: t_user.form.role,
      type: "select",
      options: [
        { value: "", label: t_common.all },
        ...uniqueGroups.map((group) => ({
          value: group.id,
          label: group.name.charAt(0).toUpperCase() + group.name.slice(1),
        })),
      ],
    },
  ];

  return {
    ...state,
    isAllSelected,
    roleColors,
    searchFields,
    toggleIsSearchBoxOpen,
    handleSearch,
    handleSelectUser,
    handleSelectAll,
    handleClick,
    handleClose: handleCloseMenu,
    handleViewUsers: handleView,
    handleEditUsers: handleEdit,
    handleDeleteUsers: handleDelete,
    handleAddUser: handleAdd,
    handleChangePass,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
    setIsDetailOpen: (val: boolean) => updateState("isDetailOpen", val),
    setIsFormOpen: (val: boolean) => updateState("isFormOpen", val),
    handleSubmitForm,
    handleQuickAccess
  };
};
