import { ETypeAccount } from "../enums/common";
import { THeadLabel } from "../interfaces/common";
import { IUser, TDataSubmitUser, TRoleUser } from "../interfaces/user";
import locales from "../locales";


const { userManage: t_user } = locales['vi'];

const getGroupsIds = (groups: { id: number; name: TRoleUser }[]): number[] => {
  return groups.map(group => group.id);
}

const getTypeAccount = (user: IUser): ETypeAccount => {
  return user.company_id !== null ? ETypeAccount.COMPANY : ETypeAccount.PHARMACY;
}

const getProvinceId = (user: IUser) : number | null => {
  return user.company_id ? (user.company?.province_id || null ) : (user.pharmacy?.province_id || null);
}

const getWardId = (user: IUser) : number | null => {
  return user.company_id ? (user.company?.ward_id || null ) : (user.pharmacy?.ward_id || null);
}


export const getDefaultValuesUser = (data?: IUser | null): TDataSubmitUser => ({
  name: data?.name || "",
  email: data?.email || "",
  password: "",
  password_confirmation: "",
  phone_number: data?.phone_number || "",
  address: data?.address || "",
  fax: data && data.company_id ? (data?.company?.fax || '') : (data?.pharmacy?.fax || ""),
  tax_code: data && data.company_id ? (data?.company?.tax_code || '') : (data?.pharmacy?.tax_code || ""),
  province_id: data && getProvinceId(data) || null,
  ward_id: data && getWardId(data) || null,
  contact_person: data && data.company_id ? (data?.company?.contact_person || '') : (data?.pharmacy?.contact_person || ''),
  company_id: data?.pharmacy?.company_id ?? null,
  groups: getGroupsIds(data?.groups ?? []) || [],
  type_account: data && getTypeAccount(data) || ETypeAccount.PHARMACY,
});

export const labelHeadUser: THeadLabel<IUser>[] =
  [
    { id: "ordinal", label: t_user.stt, align: "center", width: 60 },
    { id: "name", label: t_user.nameLabel, align: "left" },
    { id: "email", label: t_user.email, align: "left" },
    { id: "address", label: t_user.address, align: "left" },
    { id: "phone_number", label: t_user.phone_number, align: "center" },
    { id: "created_at", label: t_user.createdAt, align: "center" },
    { id: "type_account", label: t_user.typeAccount, align: "center" },
    { id: "subscription_package", label: t_user.subscriptionPackage, align: "center" },
    { id: "action", label: t_user.action, align: "center", width: 130 },
  ];
