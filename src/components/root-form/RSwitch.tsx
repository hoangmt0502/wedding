import {
  useFormContext,
  Controller,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Switch, SwitchProps, FormControlLabel } from "@mui/material";
import React from "react";

type IProp<T extends Record<string, any>> = {
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions;
};

type Props<T extends Record<string, any>> = IProp<T> & Omit<SwitchProps, 'name'>;

export default function RSwitch<T extends Record<string, any>>({
  name,
  label,
  rules,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControlLabel
          control={
            <Switch
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              {...other}
            />
          }
          label={label}
        />
      )}
    />
  );
}
