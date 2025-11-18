import { IPageParams, IProvince, IWard, TApiResponse, TPaginatedData } from "./common";
import { ICompany } from "./user";

export interface IPharmacy {
  id: number;
  uuid?: string;
  company_id?: number | null;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  user_id?: number;
  address?: string;
  tax_code?: string | null;
  phone_number?: string;
  fax?: string | null;
  province_id?: number | null;
  ward_id?: number | null;
  email?: string;
  specialist_in_charge?: string | null;
  is_admin?: boolean;
  contact_person?: string | null;
  
  national_code?: string | null;
  national_account?: string | null;
  national_password?: string | null;

  province?: IProvince | null;
  ward?: IWard | null;

  company?: ICompany;
  pharmacy?: IPharmacy;
}



export type TPharmacyResponse = TPaginatedData<IPharmacy>;

export type TDataSubmitPharmacy = Omit<IPharmacy, 'id'> & {
  password?: string;
  password_confirmation?: string;
}

export interface IPharmacyItem extends TDataSubmitPharmacy {
  customer_id: string | number;
}

export interface ISearchParamsPharmacies {
}

export type TParamsPharmacies = ISearchParamsPharmacies & IPageParams
