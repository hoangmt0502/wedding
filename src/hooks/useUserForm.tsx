import { useCallback, useEffect, useState } from "react";
import { getGroups } from "../services/groupService";
import { getAllCompanies, getProvinces, getWards } from "../services/commonService";
import { IGroups } from "../interfaces/groups";
import { IProvince, IWard, TDropdownOption } from "../interfaces/common";
import { TDataSubmitUser } from "../interfaces/user";
import { useFormContext } from "react-hook-form";
import { ETypeAccount, ResponeStatus } from "../enums/common";
import { useAuth } from "../context/AuthProvider";

export const useUserForm = () => {

  const { user } = useAuth();

  const [groups, setGroups] = useState<IGroups[]>([]);
  const [provinces, setProvinces] = useState<TDropdownOption[]>([]);
  const [wards, setWards] = useState<TDropdownOption[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const [companies, setCompanies] = useState<TDropdownOption[]>([]);

  const { watch, setValue } = useFormContext<TDataSubmitUser>();
  const password = watch("password");
  const watchProvince = watch("province_id");
  const typeAcc = watch("type_account") || ETypeAccount.COMPANY;

  const fetchGroups = useCallback(async () => {
    setLoadingGroups(true);
    try {
      const response = await getGroups();
      setGroups(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingGroups(false);
    }
  }, []);

  const fetchProvinces = useCallback(async () => {
    try {
      const response = await getProvinces();
      setProvinces(
        response.data.map((item: IProvince) => ({
          label: item.name,
          value: item.id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchWards = useCallback(async (provinceId: number) => {
    try {
      const response = await getWards(provinceId);
      setWards(
        response.data.map((item: IWard) => ({
          label: item.name,
          value: item.id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchCompanies = useCallback(async () => {
    setLoadingCompany(true);
    try {
      const response = await getAllCompanies();
      if (response.status === ResponeStatus.SUCCESS) {
        const options = response.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setCompanies(options);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCompany(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
    fetchProvinces();
    fetchCompanies();
  }, [fetchGroups, fetchProvinces, fetchCompanies]);

  useEffect(() => {
    if (watchProvince) fetchWards(watchProvince);
  }, [watchProvince, fetchWards]);

  useEffect(() => {
    if (typeAcc === ETypeAccount.COMPANY) {
      setValue("company_id", null);
    }
  }, [typeAcc, user])

  return {
    groups,
    provinces,
    wards,
    companies,
    loadingGroups,
    loadingCompany,
    typeAcc,
    setValue,
    password
  };
};
