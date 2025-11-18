import { IPermission } from "../interfaces/permission";
import {IGroups, ISearchParamsGroups, TParamsGroups, TResponseGroups } from "../interfaces/groups";
import apiService from "./apiService";

export const getGroups = async (params?: TParamsGroups):Promise<TResponseGroups> => {
    try {
        const response = await apiService.get("groups", {params});
        return response.data;
    } catch (error: any) {
        console.error("Get Role List Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getGroupPermissions = async (groupId: number): Promise<IPermission[]> => {
    try {
        const response = await apiService.get(`/groups/${groupId}/permissions`);
        return response.data;
    } catch (error: any) {
        console.error("Get Group Permissions Error:", error.response?.data || error.message);
        throw error;
    }
};

export const addPermissionToGroup = async (groupId: number) => {
    try {
        const response = await apiService.post(`/groups/${groupId}/permissions`);
        return response.data;
    } catch (error: any) {
        console.error("Add Permission to Group Error:", error.response?.data || error.message);
        throw error;
    }
};

export const createGroup = async (group_data: any) => {
    try {
        const response = await apiService.post("groups", group_data);
        return response.data;
    } catch (error: any) {
        console.error("Group Create Error:", error.response?.data || error.message);
        throw error;
    }
};

export const updateGroup = async (group_id: number, group_data: any) => {
    try {
        const response = await apiService.put(`/groups/${group_id}`, group_data);
        return response.data;
    } catch (error) {
        console.error("Group Update Error:", error);
        throw error;
    }
};

export const deleteGroups = async (group_ids: number[]) => {
    try {
        const response = await apiService.delete("groups", {
            data: { ids: group_ids },
        });
        return response.data;
    } catch (error: any) {
        console.error("Group Delete Error:", error.response?.data || error.message);
        throw error;
    }
};

export const updateGroupPermission = async (group_id: number, permission: any) => {
    try {
        const response = await apiService.put(`groups/${group_id}/permissions/${permission.id}`, permission);
        return response.data;
    } catch (error: any) {
        console.error("Permission Update Error:", error.response?.data || error.message);
        throw error;
    }
};

export const unassignGroupPermission = async (group_id: number, permission_id: number) => {
    try {
        const response = await apiService.delete(`groups/${group_id}/permissions/${permission_id}`);
        return response.data;
    } catch (error: any) {
        console.error("Unassign Permission Error:", error.response?.data || error.message);
        throw error;
    }
};

export const assignGroupPermissions = async (group_id: number, permission_ids: number[]) => {
    try {
        const response = await apiService.post(`groups/${group_id}/permissions`, { permission_ids });
        return response;
    } catch (error: any) {
        console.error("Assign Permissions Error:", error.response?.data || error.message);
        throw error;
    }
};
