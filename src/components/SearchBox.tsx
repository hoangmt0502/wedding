import React, { useCallback, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  TextFieldProps,
  alpha,
  useTheme,
  CSSObject,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import { useResponsive } from "../hooks/useResponsive";
import locales from "../locales";
import ISearchField from "./input/ISearchField";
import IDatePicker from "./input/DatePicker";
import moment from "moment";
import { TDateRangeParams } from "../interfaces/common";
import { EDateFormatSubmit } from "../enums/common";

const { common: t_common } = locales['vi'];

export type TSearchParamsState<T> = {
  search?: string;
} & Partial<T>;

type TFieldType = "text" | "number" | "date" | "select" | "range" | "date-range" | 'select-product' | 'select-customer' | 'select-supplier' | "checkbox";

type TBaseField<T> = {
  name: keyof T;
  type?: TFieldType;
  label?: string;
  multiSelect?: boolean;
  defaultValue?: any;
  disableClearable?: boolean;
  onchange?: (value: any) => void;
  searchLabel?: boolean;
  disabled?: boolean;
  clearOnChange?: (keyof T)[]
};

type TSelectField<T> = TBaseField<T> & {
  type: "select";
  options: { value: any; label: string }[];
};

type TNonSelectField<T> = TBaseField<T> & {
  type?: Exclude<string, "select">;
  options?: never;
};

export type TField<T = any> = (TSelectField<T> | TNonSelectField<T>) & {
  rules?: ((value: any, allValues: TSearchParamsState<T>) => string | null)[];
};

type TProps<T extends Record<string, any>> = {
  fields: TField<T>[];
  onSearch: (params: TSearchParamsState<T>) => void;
  mb?: number;
  showButton?: boolean;
  searchName?: keyof T;
  searchLabel?: string;
  searchPlaceholder?: string;
  sx?: React.CSSProperties;
  hideSearchText?: boolean;
};

export default function SearchBox<T extends Record<string, any>>({ fields = [], onSearch, mb, showButton = true, searchName = 'search', searchLabel = t_common.search, searchPlaceholder = t_common.enterSearchKeyword, sx = {}, hideSearchText = false }: TProps<T>) {
  const [searchParams, setSearchParams] = useState<TSearchParamsState<T>>({
    [searchName]: "",
  } as TSearchParamsState<T>);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const theme = useTheme();
  const { isMobile } = useResponsive();

  const validateFields = () => {
    let newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.rules) {
        field.rules.forEach((rule) => {
          const error = rule(searchParams[field.name], searchParams);
          if (error) {
            newErrors[field.name as string] = error;
          }
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isTruthy = useCallback((value: any): value is string | any[] => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim() !== '';
    return value !== null && value !== undefined;
  }, []);

  const handleSearch = () => {
    if (!validateFields()) return;
    const cleanedParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => isTruthy(value))
    );
    onSearch?.(cleanedParams as TSearchParamsState<T>);
  };

  useEffect(() => {
    const initialSearchParams = fields.reduce<Partial<TSearchParamsState<T>>>((acc, field) => {
      if (field?.defaultValue !== undefined && field?.defaultValue !== null) {
        acc[field.name as keyof T] = field.defaultValue.value ?? field.defaultValue;
      }
      return acc;
    }, {});

    setSearchParams(prev => {
      const merged = { ...initialSearchParams, ...prev };
      const isChanged = Object.keys(merged).some(
        (key) => merged[key as keyof T] !== prev[key as keyof T]
      );

      if (isChanged) {
        const cleanedParams = Object.fromEntries(
          Object.entries(merged).filter(([_, value]) => isTruthy(value))
        );
        setTimeout(() => onSearch(cleanedParams as TSearchParamsState<T>), 0)
      }

      return isChanged ? merged : prev;
    });
  }, [fields]);

  const handleChange = (name: keyof T, clearOnChange?: (keyof T)[]) => (event: any) => {
    const value = event?.target?.value ?? event;
    setSearchParams((prev) => {
      let newParams: TSearchParamsState<T> = { ...prev, [name]: value };

      if (clearOnChange && Array.isArray(clearOnChange)) {
        clearOnChange.forEach((key) => {
          newParams = { ...newParams, [key]: undefined };
        });
      }

      return newParams;
    });
  };

  const renderField = (field: TField<T>) => {
    const commonProps: TextFieldProps = {
      fullWidth: true,
      label: field.label,
      variant: "outlined",
      size: "small",
      value: searchParams[field.name] ?? "",
      onChange: handleChange(field.name, field?.clearOnChange),
      onKeyDown: (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSearch();
        }
      },
      sx: {
        "& .MuiInputBase-root": {
          height: "42px",
          borderRadius: "4px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "custom.bgSearchBox" },
          "&:hover fieldset": { borderColor: "#1976d2" },
          "&.Mui-focused fieldset": { borderColor: "#1565c0" },
        },
      },
      error: !!errors[field.name as string],
      helperText: errors[field.name as string] || "",
    };

    if (field.type === "select" && Array.isArray(field.options)) {
      return field.multiSelect ? (
        <Autocomplete
          multiple
          options={field.options}
          getOptionLabel={(option) => `${option.label}`}
          value={searchParams[field.name] || []}
          onChange={(event, newValue) => {
            handleChange(field.name, field?.clearOnChange)({
              target: { value: newValue },
            });
            field?.onchange?.(newValue);
          }}
          renderInput={(params) => <ISearchField {...params} {...commonProps} />}
          disableClearable={field?.disableClearable}
        />
      ) : (
        <Autocomplete
          options={field.options}
          getOptionLabel={(option) => `${option.label}`}
          value={
            field.options.find(
              (opt) => opt.value === searchParams[field.name]
            ) || null
          }
          onChange={(event, newValue) => {
            handleChange(field.name, field?.clearOnChange)({
              target: { value: newValue?.value },
            });
            field?.onchange?.(newValue?.value);
          }}
          renderInput={(params) => <ISearchField {...params} {...commonProps} />}
          renderOption={(props, option) => {
            return <li {...props} key={`${name}_${option.value}`}>{option.label}</li>;
          }}
          disableClearable={field?.disableClearable}
        />
      );
    } else if (field.type === "date") {
      return (
        <IDatePicker
          {...commonProps}
          label={field.label}
          value={(searchParams[field.name] as string) ?? ""}
          onChange={(val) => {
            const formatted = moment(val).format(EDateFormatSubmit.YYYYMMDD);
            handleChange(field.name, field?.clearOnChange)({ target: { value: formatted } });
          }}
          disabled={field?.disabled}
        />
      );
    } else if (field.type === "date-range") {
      const value = searchParams[field.name] as TDateRangeParams | undefined;

      return (
        <Box display="flex" gap={1}>
          <IDatePicker
            label={`${t_common.fromDate}`}
            value={value?.from_date ? moment(value.from_date).format("YYYY-MM-DD") : ""}
            onChange={(val) =>
              setSearchParams((prev) => ({
                ...prev,
                [field.name]: {
                  ...prev[field.name],
                  from_date: moment(val).format("YYYY-MM-DD"),
                },
              }))
            }
          />
          <IDatePicker
            label={`${t_common.toDate}`}
            value={value?.to_date ? moment(value.to_date).format("YYYY-MM-DD") : ""}
            onChange={(val) =>
              setSearchParams((prev) => ({
                ...prev,
                [field.name]: {
                  ...prev[field.name],
                  to_date: moment(val).format("YYYY-MM-DD"),
                },
              }))
            }
          />
        </Box>
      );
    } else if (field.type === 'checkbox') {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!searchParams[field.name]}
              onChange={(e) => {
                setSearchParams((prev) => ({
                  ...prev,
                  [field.name]: e.target.checked,
                }));
                field?.onchange?.(e.target.checked);
              }}
              color="primary"
              size="small"
            />
          }
          label={field.label || ''}
        />
      );
    }
    return <ISearchField {...commonProps} />;
  };

  return (
    <Box
      sx={{
        mb: isMobile ? 2 : mb || 0,
        borderRadius: 2,
        flex: 1,
        mt: 2,
        ...sx
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
      >
        {!hideSearchText && (
          <Box sx={{ flex: "0 0 250px" }}>
            <ISearchField
              value={searchParams.search}
              onChange={handleChange(searchName)}
              label={searchLabel}
              placeholder={searchPlaceholder ?? t_common.enterSearchKeyword}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </Box>
        )}

        {fields.map((field) => (
          <Box key={String(field.name)} sx={{ flex: "0 0 220px" }}>
            {renderField(field)}
          </Box>
        ))}

        {showButton && (
          <Box sx={{ flex: "0 0 120px" }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{
                fontSize: "0.875rem",
                bgcolor: alpha(theme.palette.primary.dark, 0.8),
                borderRadius: "6px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                height: 40,
              }}
            >
              {t_common.search}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
