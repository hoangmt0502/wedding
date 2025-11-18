import { ETypeAccount } from "../enums/common";
import { TApiResponse, IPageParams, TPaginatedData, IProvince, IWard } from "./common";
import { IPharmacy } from "./pharmacy.interface";

export interface ISearchParamsUsers {
  group?: number
}

export type TParamsUsers = ISearchParamsUsers & IPageParams

export type TRoleUser = 'admin' | 'editor' | 'user' | 'default';

export type TUserGroups = {
  id: number;
  name: TRoleUser;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  password: string;
  created_at: string;
  updated_at: string;
  is_admin: boolean;
  is_national_account: boolean;
  phone_number: string | null;
  address: string | null;
  groups: TUserGroups[];
  type_account?: ETypeAccount

  tax_code?: string;
  fax?: string;
  contact_person?: string;
  company_id: number | null;
  pharmacy_id?: number | null;
  active_pharmacy_id?: number | null;
  province_id?: number | null;
  ward_id?: number;
  account_level: string; // 'level_2' : Công ty, 'level_3': Nhà thuốc

  company?: ICompany | null;
  pharmacy?: IPharmacy | null;
  member: TMember;
};

type TMember = {
  id: number;
  user_id: number;
  is_admin: boolean;
}

export interface ICompany {
  id: number;
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user_id: number;
  address: string;
  tax_code: string;
  phone_number: string;
  fax: string | null;
  province_id: number | null;
  ward_id: number | null;
  email: string;
  specialist_in_charge: string | null;
  national_code: string | null;
  national_account: string | null;
  national_password: string | null;
  contact_person: string;
  province: IProvince | null; 
  ward: IWard | null; 
}

export type TUserResponse = TPaginatedData<IUser>;

export type TDataSubmitUser = {
  type_account?: ETypeAccount;
  name: string;
  email: string;
  password?: string | null;
  password_confirmation?: string | null;
  phone_number: string;
  address: string;
  groups?: number[];
  company_id?: number | null;
  is_admin?: boolean;
  is_national_account?: boolean;

  tax_code?: string;
  fax?: string;
  contact_person?: string;
  province_id?: number | null;
  ward_id?: number | null;
};
