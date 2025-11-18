import { TextFieldProps, Stack } from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";
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
  defaultValue?: Moment | Date | null;
  rules?: RegisterOptions;
}

type Props<T extends Record<string, any>> = IProp<T> & TextFieldProps;

export default function RTimePicker<T extends Record<string, any>>({
  name,
  label,
  format = "HH:mm",
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
          <MobileTimePicker
            {...field}
            label={label}
            ampm={false}
            value={field.value ? moment(field.value, "HH:mm:ss") : null}
            onChange={(value) => {
              const formatted = value ? moment(value).format("HH:mm:ss") : null;
              field.onChange(formatted);
            }}
            format={format}
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
