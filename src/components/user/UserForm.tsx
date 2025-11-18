import React, { useEffect } from "react";
import {
  Stack,
} from "@mui/material";
import { IUser, TDataSubmitUser } from "../../interfaces/user";
import { RAutocomplete, RRadioGroup, RTextField } from "../root-form";
import locales from "../../locales";
import { ERegExp, ETypeAccount } from "../../enums/common";
import { validateRules } from "../../utils/formatValidations";
import RAutocompleteMultiple from "../root-form/RAutocompleteMultiple";
import { useUserForm } from "../../hooks/useUserForm";
import { useFormContext } from "react-hook-form";

type UserFormProps = {
  editingUser: IUser | null;
  isChangePassword?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ editingUser, isChangePassword = false }) => {

  const { helper: t_helper, userManage: t_user } = locales['vi'];
  const {
    groups,
    provinces,
    wards,
    companies,
    loadingGroups,
    loadingCompany,
    typeAcc,
    setValue,
    password
  } = useUserForm();
  const { watch } = useFormContext<TDataSubmitUser>();

  return (

    isChangePassword ? <Stack direction={'column'} spacing={2.5}>
      <RTextField<TDataSubmitUser>
        label={t_user.password}
        name="password"
        type="password"
        rules={{
          ...validateRules.required,
          ...validateRules.stringLength(6, 50),
          ...validateRules.notEmptyString,
        }}
      />

      <RTextField<TDataSubmitUser>
        label={t_user.confirmPassword}
        name="password_confirmation"
        type="password"
        rules={{
          ...validateRules.required,
          validate: (value) => value === password || t_helper.matchPassword
        }}
      />
    </Stack> :

      <Stack direction={'column'} spacing={2.5}>

        <RRadioGroup<TDataSubmitUser>
          name="type_account"
          options={[
            { value: ETypeAccount.COMPANY, label: t_user.company },
            { value: ETypeAccount.PHARMACY, label: t_user.pharmacy }
          ]}
          row
        />

        <RTextField<TDataSubmitUser>
          label={typeAcc === ETypeAccount.PHARMACY ? t_user.pharmacyName : t_user.companyName}
          name="name"
          rules={{
            ...validateRules.required,
            ...validateRules.stringLength(3, 255),
            ...validateRules.notEmptyString,
          }}
        />

        {
          typeAcc === ETypeAccount.PHARMACY && <RAutocomplete<TDataSubmitUser>
            options={companies}
            label={t_user.selectCompany}
            name="company_id"
            isLoading={loadingCompany}
          />
        }
        <RTextField<TDataSubmitUser>
          label={t_user.contactPerson}
          name="contact_person"
          rules={{
            ...validateRules.required,
            ...validateRules.stringLength(3, 255),
            ...validateRules.notEmptyString,
          }}
        />
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <RTextField<TDataSubmitUser>
            label={t_user.email}
            name="email"
            type="email"
            rules={{
              ...validateRules.required,
              ...validateRules.pattern(ERegExp.EMAIL),
            }}
          />
          <RTextField<TDataSubmitUser>
            label={t_user.phone_number}
            name="phone_number"
            type="tel"
            rules={{
              ...validateRules.required,
              ...validateRules.pattern(ERegExp.PHONE),
            }}
          />
        </Stack>
        {
          !editingUser && <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <RTextField<TDataSubmitUser>
              label={t_user.password}
              name="password"
              type="password"
              rules={{
                ...validateRules.required,
                ...validateRules.stringLength(6, 50),
                ...validateRules.notEmptyString,
              }}
            />

            <RTextField<TDataSubmitUser>
              label={t_user.confirmPassword}
              name="password_confirmation"
              type="password"
              rules={{
                ...validateRules.required,
                validate: (value) => value === password || t_helper.matchPassword
              }}
            />
          </Stack>
        }

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <RTextField<TDataSubmitUser>
            label={t_user.taxCode}
            name="tax_code"
            rules={{
              ...validateRules.required,
              ...validateRules.pattern(ERegExp.TAXCODE),
            }}
          />
          <RTextField<TDataSubmitUser>
            label={t_user.fax}
            name="fax"
            type="text"
            rules={{
              ...validateRules.stringLength(6, 250),
            }}
          />
        </Stack>

        <RTextField<TDataSubmitUser>
          label={t_user.address}
          name="address"
          rules={{
            ...validateRules.required,
            ...validateRules.stringLength(3, 255),
          }}
        />
        <Stack direction="row" spacing={2} marginTop={2}>
          <RAutocomplete<TDataSubmitUser>
            options={provinces}
            label={t_user.province}
            name="province_id"
            rules={{
              ...validateRules.required,
            }}
          />
          <RAutocomplete<TDataSubmitUser>
            options={wards}
            label={t_user.ward}
            name="ward_id"
            rules={{
              ...validateRules.required,
            }}
          />
        </Stack>

        <RAutocompleteMultiple<TDataSubmitUser>
          options={groups.map((item) => ({ label: item.name, value: item.id }))}
          label={t_user.role}
          name="groups"
          isLoading={loadingGroups}
          rules={{
            ...validateRules.required,
          }}
        />
      </Stack>
  );
};

export default UserForm;
