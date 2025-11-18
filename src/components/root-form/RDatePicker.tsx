import { TextFieldProps, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Controller,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import moment, { Moment } from "moment";
import { EDateFormatSubmit } from "../../enums/common";
import { useMemo } from "react";

interface IProp<T extends Record<string, any>> {
  name: Path<T>;
  label?: string;
  format?: string;
  views?: Array<"year" | "month" | "day">;
  rules?: RegisterOptions;
  minDate?: Moment | undefined;
  maxDate?: Moment | undefined;
  onChangeValue?: (value: string | null) => void;
  onBeforeChange?: (value: string | null) => void;
}

type Props<T extends Record<string, any>> = IProp<T> & TextFieldProps;

export default function RDatePicker<T extends Record<string, any>>({
  name,
  label,
  format = "DD/MM/YYYY",
  defaultValue = null,
  views,
  rules,
  minDate,
  maxDate,
  onChangeValue,
  onBeforeChange,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  const isRequired = rules?.required !== undefined;
  const finalLabel = useMemo(() => {
    if (isRequired && label) {
      return (
        <span>
          {label} <span style={{ color: 'red' }}>*</span>
        </span>
      );
    }
    return label;
  }, [isRequired, label]);

  const { onKeyDown: userOnKeyDown, ...restTextFieldProps } = other;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Stack position="relative" width="100%">
          <DatePicker
            {...field}
            label={finalLabel}
            format={format}
            views={views}
            value={field.value ? moment(field.value) : null}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(value) => {
              onBeforeChange?.(value ? moment(value).format(EDateFormatSubmit.YYYYMMDD) : null);
              field.onChange(value ? moment(value).format(EDateFormatSubmit.YYYYMMDD) : null);
              onChangeValue?.(value ? moment(value).format(EDateFormatSubmit.YYYYMMDD) : null);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                helperText: error?.message,
                error: !!error,
                size: "small",
                ...restTextFieldProps,
              },
            }}
            disableOpenPicker={other.disabled}
          />
        </Stack>
      )}
    />
  );
}
