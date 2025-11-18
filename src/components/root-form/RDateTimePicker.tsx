import { TextFieldProps, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Controller,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import moment, { Moment } from "moment";

interface IProp<T extends Record<string, any>> {
  name: Path<T>;
  label?: string;
  format?: string;
  rules?: RegisterOptions;
}

type Props<T extends Record<string, any>> = IProp<T> & TextFieldProps;

export default function RDateTimePicker<T extends Record<string, any>>({
  name,
  label,
  format = "DD/MM/YYYY HH:mm",
  defaultValue = null,
  rules,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Stack position="relative" width="100%">
          <DateTimePicker
            {...field}
            label={label}
            format={format}
            value={field.value ? moment(field.value) : null}
            onChange={(value) => {
              field.onChange(value ? moment(value).format("YYYY-MM-DD HH:mm:ss") : null);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                helperText: error?.message,
                error: !!error,
                size: "small",
                ...other,
              },
            }}
          />
        </Stack>
      )}
    />
  );
}
