import {
  useFormContext,
  Controller,
  RegisterOptions,
  Path,
} from "react-hook-form";
import { TextField, TextFieldProps, Autocomplete, Box, Typography, CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { PrefixId } from "../../enums/common";
import locales from "../../locales";
import { Add } from "@mui/icons-material";

type Option = { value: string | number; label: string, disabled?: boolean };

type QuickActionOption = {
  label?: string;
  icon?: React.ReactNode;
  onAction: () => void;
};

type IProp<T extends Record<string, any>> = {
  name?: Path<T>;
  options: Option[];
  loadingScroll?: boolean;
  isLoading?: boolean;
  disableClearable?: boolean;
  disabled?: boolean;
  showRequired?: boolean;
  rules?: RegisterOptions;
  value?: string;
  onChange?: (value: { label: string; value: string | number } | null) => void;
  quickActionOption?: QuickActionOption;
  onScrollBottom?: () => void;
  onChangeAfter?: (value: any) => void;
  onInputChange?: (event: React.SyntheticEvent, value: string, reason: string) => void;
  isRequiredLabel?: boolean;
};

type Props<T extends Record<string, any>> = IProp<T> & TextFieldProps;

export default function RAutocomplete<T extends Record<string, any>>({
  name,
  options,
  loadingScroll,
  isLoading,
  disableClearable,
  disabled,
  showRequired = true,
  rules,
  value,
  onChange,
  quickActionOption,
  onScrollBottom,
  onChangeAfter,
  onInputChange,
  isRequiredLabel,
  ...other
}: Props<T>) {
  const {common: t_common} = locales['vi']
  const { control } = useFormContext();

  const allOptions = useMemo(() => {
    if (!quickActionOption) return options;

    return [
      {
        value: PrefixId.QuickAction,
        label: quickActionOption.label ?? t_common.quickAdd,
      },
      ...options,
    ];
  }, [options, quickActionOption]);

  if (!name && value !== undefined && onChange) {
    const selected = useMemo(
      () => options.find((item) => item.value === value) ?? null,
      [value, options]
    );

    return (
      <Autocomplete
        options={allOptions}
        getOptionLabel={(option) => `${option.label}`}
        disableClearable={disableClearable}
        value={selected}
        onChange={(event, newValue) => {onChange?.(newValue ?? null); onChangeAfter?.(newValue ?? null)}}
        getOptionDisabled={(option) => option.disabled === true}
        fullWidth
        isOptionEqualToValue={(option, val) => option.value === val.value}
        loading={isLoading || loadingScroll}
        onInputChange={onInputChange}
        disabled={disabled}
        size="small"
        renderInput={(params) => (
          <TextField {...params} {...other} />
        )}
      />
    );
  }

  return (
    <Controller
      name={name!}
      control={control}
      rules={rules}
      render={({ fieldState: { error }, field: { ref, value, onChange, ...field } }) => {
        const isRequired = isRequiredLabel || (rules?.required !== undefined);
        const finalLabel = isRequired && other?.label ? (
          <span>
            {other.label} <span style={{ color: 'red' }}>*</span>
          </span>
        ) : other.label;

        const selected = useMemo(() => {
          return allOptions?.find((item) => item.value === value) ?? null;
        }, [value, allOptions]);

        return (
          <Autocomplete
            {...field}
            options={allOptions}
            getOptionLabel={(option) => option.label?.toString() || ""}
            disableClearable={disableClearable}
            value={selected}
            onChange={(_, newValue) => { onChange(newValue?.value ?? null); onChangeAfter?.(newValue?.value ?? null)}}
            isOptionEqualToValue={(option, val) => option.value === val.value}
            getOptionDisabled={(option) => option.disabled === true}
            loading={isLoading || loadingScroll}
            disabled={disabled}
            size="small"
            fullWidth
            onInputChange={onInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                {...other}
                label={finalLabel}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading && (
                        <CircularProgress color='inherit' size={16} />
                      )}
                      {params.InputProps.endAdornment}
                      {other?.InputProps?.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderOption={(props, option) => {
              if (option.value === PrefixId.QuickAction && !!quickActionOption) {
                return (
                  <Box component={'li'} {...props} key={PrefixId.QuickAction} onClick={(e) => {
                    e.preventDefault();
                    quickActionOption?.onAction();
                  }}>
                    {(quickActionOption?.icon ?? <Add color="primary" fontSize="small" style={{ marginRight: 8 }} />)}
                    <Typography color="primary.main" component={'span'}>{quickActionOption?.label ?? t_common.quickAdd}</Typography>
                  </Box>
                );
              }
              return <li {...props} key={`${name}_${option.value}`}>{option.label}</li>;
            }}
            ListboxProps={{
              onScroll: (event) => {
                const listboxNode = event.currentTarget;
                if (
                  listboxNode.scrollTop + listboxNode.clientHeight >=
                  listboxNode.scrollHeight - 10
                ) {
                  onScrollBottom?.();
                }
              },
            }}
          />
        );
      }}
    />
  );
}
