import { IPageParams } from "./common";

export interface IDataSubmitPermission {
    name: string;
    description: string;
}

export interface IPermission {
  id: number;
  name: string;
  group_id?: number
  description: string;
  checked?: boolean;
  created_at?: string;
  updated_at?: string;
  isCritical?: boolean;
  type?: string;
}

export interface ISearchParamsPermissions {
}

export type TParamsPermission = ISearchParamsPermissions & IPageParams
