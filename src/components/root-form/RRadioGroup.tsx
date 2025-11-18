// components/root-form/RRadioGroup.tsx

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import {
  Controller,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface Option {
  label: string;
  value: string | number;
}

interface Props<T extends Record<string, any>> {
  name: Path<T>;
  label?: string;
  options: Option[];
  rules?: RegisterOptions;
  onChange?: (value: string) => void;
  value?: any;
  row?: boolean;
  labelWidth?: string | number;
  columnGap?: number;
  disabled?: boolean;
}

export default function RRadioGroup<T extends Record<string, any>>({
  name,
  label,
  options,
  rules,
  onChange,
  value,
  row = false,
  labelWidth,
  columnGap = 1,
  disabled = false
}: Props<T>) {
  const { control, clearErrors } = useFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      rules={rules}
      defaultValue=''
      render={({ field, fieldState }) => {
        return (
          <FormControl component="fieldset" error={!!fieldState.error}>
            <Box
              sx={
                row
                  ? {
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: 'center',
                      gap: 3,
                    }
                  : {}
              }
            >
              {label && (
                <FormLabel sx={labelWidth ? { minWidth: labelWidth } : undefined}>
                  {label}
                </FormLabel>
              )}

              <RadioGroup
                sx={{ columnGap }}
                row
                {...field}
                value={value || field.value}
                onChange={(e) => {
                  !!onChange
                    ? onChange(e.target.value)
                    : field.onChange(e.target.value);
                  clearErrors(name);
                }}
              >
                {options.map((option, idx) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    disabled={disabled}
                  />
                ))}
              </RadioGroup>
            </Box>

            {fieldState.error?.message && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
