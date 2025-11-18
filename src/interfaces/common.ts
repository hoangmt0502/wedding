import { EAction, ESortDirection } from "../enums/common";

export type TAction = EAction.Delete | EAction.Edit | EAction.Detail;

export interface IPageParams {
  page?: number;
  per_page?: number;
  perPage?: number;
  sort_by?: string;
  sort_direction?: ESortDirection;
  search?: string;
}

export type TPaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type TPaginatedData<T> = {
  data: T[];
  meta?: {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: TPaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: TPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type TApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type TApiResponseReport<T, Total = any> = {
  status: string;
  message: string;
  data: TDataResponseReport<T, Total>;
};

export type TDataResponseReport<T, Total = any> = {
  total: Total;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export type THeadLabel<T = any> = {
  id: keyof T | (string & {});
  label: string;
  align?: "left" | "right" | "center";
  width?: number | string;
  minWidth?: number | string;
  colSpan?: number;
  rowSpan?: number;
  isGroup?: boolean;
  children?: THeadLabel[];
};

export interface TDropdownOption {
  id?: string | number;
  label: string;
  value: string | number;
  customerLabel?: string;
  disabled?: boolean;
  [key: string]: any;
}


export interface IProvince {
  id: number;
  name: string;
  uuid: string;
  code: string;
}

export interface IWard {
  id: number;
  name: string;
  uuid: string;
  code: string;
  province_id: number;
  province_uuid: string;
  province_name: string;
}

export interface ICountry {
  id: number;
  code: string;
  name: string;
}

export type TDateRangeParams = {
  from_date: number;
  to_date: number;
};

export interface IParamsInventoryProduct {
  product_id?: number;
  batch_number?: string;
  unit_id?: number;
  report_date?: string;
}

export type TImageUpload = {
  path: string;
  type: string;
  size: number;
}
