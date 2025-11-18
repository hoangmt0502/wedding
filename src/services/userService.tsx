import { IUser, TDataSubmitUser, TParamsUsers, TUserResponse } from "../interfaces/user";
import apiService from "./apiService";

export const getUsers = async (params: TParamsUsers): Promise<TUserResponse> => {
    try {
        const response = await apiService.get("users", {params});
        return response.data;
    } catch (error: any) {
        console.error("Get Users List Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Retrieve information of a specific user.
 * 
 * @param {number|string} user_id - The ID of the user to retrieve.
 * @returns {Promise<Object>} - API response containing user details.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const getUser = async (user_id: number): Promise<IUser> => {
    try {
        const response = await apiService.get(`/user/${user_id}`);
        return response.data;
    } catch (error: any) {
        console.error("Get User Infor Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getPermissions = async () => {
    try {
        const response = await apiService.get("permissions", {});
        return response.data;
    } catch (error: any) {
        console.error("Get Permission List Error:", error.response?.data || error.message);
        throw error;
    }
};

export const registerUser = async (userData: TDataSubmitUser): Promise<IUser> => {
    try {
        const response = await apiService.post("register", userData);
        return response.data;
    } catch (error: any) {
        console.error("User Registration Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Update an existing user.
 * 
 * @param {number|string} user_id - The ID of the user to update.
 * @param {Object} user_data - Updated user data.
 * @returns {Promise<Object>} - API response containing updated user details.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const updateUser = async (user_id: number, user_data: TDataSubmitUser) : Promise<IUser>  => {
    try {
        const response = await apiService.put(`/users/${user_id}`, user_data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
        throw error;
    }
};

export const deleteUsers = async (user_ids: number[]) => {
    try {
        const response = await apiService.delete(`users/${user_ids}`);
        return response.data;
    } catch (error: any) {
        console.error("User Delete Error:", error.response?.data || error.message);
        throw error;
    }
};

export const postSelectedPharmacy = async (params: { pharmacy_id: string }) => {
    try {
        const response = await apiService.post(`select-pharmacy`, params);
        return response;
    } catch (error: any) {
        console.error("User Delete Error:", error.response?.data || error.message);
        throw error;
    }
};

export const postQuickAccess = async (userId: number) => {
  try {
    const response = await apiService.post(`impersonate/${userId}`);
    return response;
  } catch (error: any) {
    console.error("User Delete Error:", error.response?.data || error.message);
    throw error;
  }
};

export const stopImpersonating = async (params: { impersonation_key: string }) => {
  try {
    const response = await apiService.post(`stop-impersonating`, params);
    return response;
  } catch (error: any) {
    console.error("Stop Impersonating Error:", error.response?.data || error.message);
    throw error;
  }
};