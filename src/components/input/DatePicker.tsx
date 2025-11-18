import { TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

interface Props extends Omit<TextFieldProps, "onChange" | "value"> {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function IDatePicker({ value, onChange, ...rest }: Props) {
  const dateValue = value ? moment(value) : null;

  return (
    <DatePicker
      value={dateValue}
      format="DD/MM/YYYY"
      onChange={(newDate) =>
        onChange(newDate ? newDate.toISOString() : null)
      }
      slotProps={{
        textField: {
          fullWidth: true,
          size: "small",
          ...rest,
          InputLabelProps: { shrink: true },
          sx: {
            width: '220px',
            "& input::selection": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          },
        },
      }}
      disableOpenPicker={rest?.disabled}
    />
  );
}
