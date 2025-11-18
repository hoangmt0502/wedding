import React, {
  forwardRef,
  JSX,
  useEffect,
  useRef,
  useState
} from "react";
import { useFormContext, Controller, RegisterOptions, Path } from "react-hook-form";
import { TextField, TextFieldProps, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import locales from "../../locales";

type InputEl = HTMLInputElement | HTMLTextAreaElement;

type InputType =
  | "button" | "checkbox" | "color" | "date" | "datetime-local"
  | "email" | "file" | "hidden" | "image" | "month" | "number"
  | "password" | "radio" | "range" | "reset" | "search" | "submit"
  | "tel" | "text" | "time" | "url" | "week" | "price" | "textarea" | "integer";

type TProp<T extends Record<string, any>> = {
  name: Path<T>;
  rules?: RegisterOptions;
  type?: InputType;
  onKeyDown?: TextFieldProps["onKeyDown"];
  numberFormatProps?: Omit<NumericFormatProps, "value" | "onValueChange">;
  showRequired?: boolean;
  onChangeValue?: (value: any) => void;
  autoFocus?: boolean;
  delay?: number;
  disabledChange?: boolean;
};

type Props<T extends Record<string, any>> = Omit<TextFieldProps, "ref" | "inputRef"> & TProp<T>;

function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
}

function RTextFieldInner<T extends Record<string, any>>(
  {
    name,
    rules,
    type,
    onKeyDown,
    numberFormatProps,
    onChangeValue,
    showRequired = true,
    autoFocus = false,
    delay = 0,
    ...other
  }: Props<T>,
  forwardedRef: React.Ref<InputEl> 
) {
  const { common: t_common } = locales["vi"];
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type === "password";
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChangeWithDelay = (val: any, callback: (v: any) => void) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => callback(val), delay);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref: controllerRef, ...field }, fieldState: { error } }) => {
        const isRequired = rules?.required !== undefined && showRequired;
        const finalLabel = isRequired && other?.label ? (
          <span>
            {other.label} <span style={{ color: "red" }}>*</span>
          </span>
        ) : other.label;

        const inputRef = composeRefs<InputEl>(controllerRef as unknown as React.Ref<InputEl>, forwardedRef);

        const commonProps: TextFieldProps = {
          fullWidth: true,
          error: !!error,
          helperText: error?.message,
          inputRef, 
          autoFocus,
          ...other,
          label: finalLabel
        };

        if (type === "price") {
          return (
            <NumericFormat
              {...(numberFormatProps || {})}
              value={field?.value}
              customInput={TextField}
              {...(commonProps as any)}
              inputRef={inputRef}
              onValueChange={(values, sourceInfo) => {
                if (sourceInfo.source === "event") {
                  const newVal = values.floatValue ?? "";
                  handleChangeWithDelay(newVal, (v) => {
                    field.onChange(v);
                    onChangeValue?.(v);
                  });
                }
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if ((e.key === "-" || e.key === "e")) e.preventDefault();
                onKeyDown?.(e as React.KeyboardEvent<HTMLDivElement>);
              }}
              size="small"
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
              {...(commonProps as any)}
              inputRef={inputRef}
              size="small"
              onValueChange={(values, sourceInfo) => {
                if (sourceInfo.source === "event") {
                  const newVal = values.floatValue ?? "";
                  handleChangeWithDelay(newVal, (v) => {
                    field.onChange(v);
                    onChangeValue?.(v);
                  });
                }
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "-" || e.key === "e" || e.key === ".") e.preventDefault();
                onKeyDown?.(e);
              }}
              allowNegative={true}
              decimalScale={0}
            />
          );
        }

        const [localValue, setLocalValue] = useState(field.value ?? "");
        useEffect(() => { setLocalValue(field.value ?? ""); }, [field.value]);

        return (
          <TextField
            {...field}
            type={
              type === "textarea"
                ? undefined
                : isPassword
                ? (showPassword ? "text" : "password")
                : type
            }
            size="small"
            value={localValue}
            multiline={type === "textarea"}
            minRows={type === "textarea" ? 3 : undefined}
            onChange={(e) => {
              const val = e.target.value;
              setLocalValue(val);
              if (delay > 0) {
                handleChangeWithDelay(val, (v) => {
                  field.onChange(v);
                  onChangeValue?.(v);
                });
              } else {
                field.onChange(val);
                onChangeValue?.(val);
              }
            }}
            {...commonProps}
            sx={{
              zIndex: 0,
              "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0
              },
              "input[type=number]": {
                MozAppearance: "textfield"
              },
              ...(commonProps?.sx as any)
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
              ) : commonProps.InputProps?.endAdornment
            }}
            inputRef={inputRef}
            onWheel={(event) => {
              const input = event.currentTarget.querySelector("input");
              if (input) input.blur();
              event.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (type === "number" && (e.key === "-" || e.key === "e")) e.preventDefault();
              onKeyDown?.(e);
            }}
          />
        );
      }}
    />
  );
}

const RTextField = forwardRef(RTextFieldInner) as
  <T extends Record<string, any>>(p: Props<T> & React.RefAttributes<InputEl>) => JSX.Element;

export default RTextField;
