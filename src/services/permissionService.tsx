import { IDataSubmitPermission, IPermission, TParamsPermission } from "../interfaces/permission";
import apiService from "./apiService";


export const getPermissions = async (params: TParamsPermission) => {
    try {
        const response = await apiService.get("permissions", {params});
        return response.data;
    } catch (error: any) {
        console.error("Get Permission List Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getAll = async (): Promise<IPermission[]> => {
    try {
        const response = await apiService.get("permissions/all");
        return response;
    } catch (error: any) {
        console.error("Get Permission List Error:", error.response?.data || error.message);
        throw error;
    }
};


export const createPermission = async (permission_data: IDataSubmitPermission) => {
    try {
        const response = await apiService.post("permissions", permission_data);
        return response.data;
    } catch (error: any) {
        console.error("Permission Create Error:", error.response?.data || error.message);
        throw error;
    }
};

export const updatePermission = async (permission_id: number, permission_data: IDataSubmitPermission): Promise<IPermission> => {
    try {
        const response = await apiService.put(`/permissions/${permission_id}`, permission_data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật quyền:", error);
        throw error;
    }
};

export const deletePermissions = async (permission_ids: number[]) => {
    try {
        const response = await apiService.delete(`permissions`, {
            data: { ids: permission_ids },
        });
        return response.data;
    } catch (error: any) {
        console.error("Permission Delete Error:", error.response?.data || error.message);
        throw error;
    }
};
