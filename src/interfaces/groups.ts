import { IPageParams, TPaginatedData } from "./common";
import { IPermission } from "./permission";

export interface IGroups {
  id: 2;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type TResponseGroups = TPaginatedData<IGroups>

export interface ISearchParamsGroups {
}

export type TParamsGroups = ISearchParamsGroups & IPageParams

export interface IDataSubmitGroups {
  name: string;
  description: string;
}

export type TEditingPermissionState = IPermission & {
  group_id: number
}