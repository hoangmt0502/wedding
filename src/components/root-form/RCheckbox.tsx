import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { Checkbox, FormControlLabel, CheckboxProps } from "@mui/material";

type TCheckboxProps<T extends Record<string, any>> = {
  name: keyof T;
  label: string;
  rules?: RegisterOptions;
};

type Props<T extends Record<string, any>> = TCheckboxProps<T> & Omit<CheckboxProps, "name" | "value">;

export default function RCheckbox<T extends Record<string, any>>({
  name,
  label,
  rules,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              color="primary"
              {...other}
            />
          }
          label={label}
          sx={{ color: error ? "error.main" : undefined }}
        />
      )}
    />
  );
}
