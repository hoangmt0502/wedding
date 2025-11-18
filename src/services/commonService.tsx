

import {
  ICountry,
  IParamsInventoryProduct,
  IProvince,
  IWard,
  TApiResponse,
} from "../interfaces/common";
import apiService from "./apiService";
import { ICompany } from "../interfaces/user";

export const createPresignedUrl = async (
  file: File
): Promise<TApiResponse<{ url: string; path: string, link_view: string }>> => {
  try {
    const response = await apiService.post("files/upload-url", {
      filename: file.name,
      filesize: file.size,
      mimetype: file.type,
    });
    return response;
  } catch (error: any) {
    console.error(
      "Create Presigned Url Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  const binaryData = await file.arrayBuffer();

  const response = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: binaryData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Upload failed:", response.status, errorText);
    throw new Error(`Upload failed with status ${response.status}`);
  }
  return response;
};

export const getProvinces = async (): Promise<TApiResponse<IProvince[]>> => {
  try {
    const response = await apiService.get("provinces");
    return response;
  } catch (error: any) {
    console.error("Get List Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getWards = async (
  province_id: number
): Promise<TApiResponse<IWard[]>> => {
  try {
    const response = await apiService.get(`wards/${province_id}/province`);
    return response;
  } catch (error: any) {
    console.error("Get List Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getCountries = async (): Promise<TApiResponse<ICountry[]>> => {
  try {
    const response = await apiService.get(`countries`);
    return response;
  } catch (error: any) {
    console.error("Get List Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllCompanies = async (): Promise<TApiResponse<ICompany[]>> => {
  try {
    const response = await apiService.get("companies/all");
    return response;
  } catch (error: any) {
    console.error("Get List Error:", error.response?.data || error.message);
    throw error;
  }
};
