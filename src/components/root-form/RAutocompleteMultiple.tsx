import {
  useFormContext,
  Controller,
  RegisterOptions,
  Path,
} from "react-hook-form";
import {
  TextField,
  TextFieldProps,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useMemo } from "react";
import { TDropdownOption } from "../../interfaces/common";

type IProp<T extends Record<string, any>> = {
  name: Path<T>;
  options: TDropdownOption[];
  loadingScroll?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  rules?: RegisterOptions;
};

type Props<T extends Record<string, any>> = IProp<T> & TextFieldProps;

export default function RAutocompleteMultiple<T extends Record<string, any>>({
  name,
  options,
  loadingScroll,
  isLoading,
  disabled,
  rules,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
        const selectedValues = Array.isArray(value) ? (value as ( number | string)[]) : [];

        const isRequired = rules?.required !== undefined;
        const finalLabel = isRequired ? (
          <span>
            {other.label} <span style={{ color: 'red' }}>*</span>
          </span>
        ) : other.label;

        const selectedOptions = useMemo(() => {
          return options.filter((opt) => selectedValues.includes(opt.value));
        }, [selectedValues, options]);

        return (
          <Autocomplete
            {...field}
            multiple
            disableCloseOnSelect
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, val) => option.value === val.value}
            value={selectedOptions}
            onChange={(event, newValue) => {
              onChange((newValue as TDropdownOption[]).map((item) => item.value));
            }}
            loading={isLoading ?? loadingScroll}
            disabled={disabled}
            fullWidth
            size="small"
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.label}
                  {...getTagProps({ index })}
                  key={option.value}
                  sx={{ height: '26px', background: '#eee' }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                {...other}
                error={!!error}
                helperText={error?.message}
                label={finalLabel}
              />
            )}
          />
        );
      }}
    />
  );
}
