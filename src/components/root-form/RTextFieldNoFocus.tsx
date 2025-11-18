import { useFormContext, Controller, RegisterOptions, Path } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { HTMLInputTypeAttribute, KeyboardEventHandler, useState } from "react";
import { NumericFormat, NumericFormatProps, OnValueChange } from "react-number-format";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import locales from "../../locales";

type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | "price"
  | "textarea"
  | "integer";

type TProp<T extends Record<string, any>> = {
  name: Path<T>;
  rules?: RegisterOptions;
  type?: InputType;
  onKeyDown?: (e: KeyboardEventHandler<HTMLDivElement>) => void;
  numberFormatProps?: Omit<NumericFormatProps, "value" | "onValueChange">;
  showRequired?: boolean;
  onChangeValue?: (value: any) => void;
  autoFocus?: boolean;
};

type Props<T extends Record<string, any>> = TProp<T> & TextFieldProps;

export default function RTextFieldNoFocus<T extends Record<string, any>>({
  name,
  rules,
  type,
  onKeyDown,
  numberFormatProps,
  onChangeValue,
  showRequired = true,
  autoFocus = true,
  ...other
}: Props<T>) {
  const { common: t_common } = locales['vi']
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, ...field }, fieldState: { error } }) => {
        const isRequired = rules?.required !== undefined;
        const finalLabel = isRequired && other?.label ? (
          <span>
            {other.label} <span style={{ color: 'red' }}>*</span>
          </span>
        ) : other.label;
        const commonProps = {
          fullWidth: true,
          error: !!error,
          helperText: error?.message,
          ...other,
          label: finalLabel,
        };
        if (type === "price") {
          return (
            <NumericFormat
              {...(numberFormatProps || {})}
              value={field?.value}
              customInput={TextField}
              onValueChange={(values, sourceInfo) => {
                if (sourceInfo.source === 'event') {
                  field.onChange(values.floatValue ?? "");
                  onChangeValue?.(values.floatValue ?? "");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
                onKeyDown?.(e);
              }}
              size={"small"}
              {...(commonProps as any)}
              thousandSeparator
              allowNegative={true}
              decimalScale={0}
              suffix={t_common.suffixPrice}
            />
          );
        }
        if (type === "integer") {
          return (
            <NumericFormat
              {...(numberFormatProps || {})}
              value={field?.value}
              customInput={TextField}
              onValueChange={(values, sourceInfo) => {
                if (sourceInfo.source === 'event') {
                  field.onChange(values.floatValue ?? "");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e" || e.key === ".") {
                  e.preventDefault();
                }
                onKeyDown?.(e);
              }}
              size={"small"}
              {...(commonProps as any)}
              allowNegative={true}
              decimalScale={0}
            />
          );
        }
        return (
          <TextField
            {...field}
            type={
              type === "textarea"
                ? undefined
                : isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            size="small"
            value={
              (typeof field.value === "number" && field.value === 0) || !field.value
                ? ""
                : field.value
            }
            multiline={type === "textarea"}
            minRows={type === "textarea" ? 3 : undefined}
            {...commonProps}
            sx={{
              zIndex: 0,
              "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "input[type=number]": {
                MozAppearance: "textfield",
              },
              ...commonProps?.sx
            }}

            InputProps={{
              ...commonProps.InputProps,
              endAdornment: isPassword ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : commonProps.InputProps?.endAdornment,
            }}
            onWheel={(event) => {
              const input = event.currentTarget.querySelector("input");
              if (input) input.blur();
              event.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (type === "number" && (e.key === "-" || e.key === "e")) {
                e.preventDefault();
              }
              onKeyDown?.(e);
            }}
          />
        );
      }}
    />
  );
}
