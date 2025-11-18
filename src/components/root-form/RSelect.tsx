import {
  useFormContext,
  Controller,
  RegisterOptions,
  Path,
} from "react-hook-form";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
  ListSubheader,
  Stack,
  SvgIconTypeMap,
  Tooltip,
} from "@mui/material";
import { cloneElement, useEffect, useMemo, useRef, useState } from "react";
import { Add, Clear } from "@mui/icons-material";
import { PrefixId } from "../../enums/common";
import locales from "../../locales";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type Option = { value: string | number; label: string; disabled?: boolean; [key: string] : any };

type QuickActionOption = {
  label?: string;
  icon?: React.ReactNode;
  onAction: () => void;
};

type IProp<T extends Record<string, any>> = {
  name?: Path<T>;
  nameLabel?: string;
  options: Option[];
  factOptions?: Option[];
  isLoading?: boolean;
  disabled?: boolean;
  disabledCloseOnSelect?: boolean;
  showRequired?: boolean;
  rules?: RegisterOptions;
  value?: string | number | null;
  useScan?: boolean;
  onChange?: (value: number | string | null) => void;
  quickActionOption?: QuickActionOption;
  onChangeAfter?: (value: any) => void;
  onSearchTextChange?: (value: string) => void;
  onScrollBottom?: () => void | Promise<void>;
  disableClearable?: boolean;
  disableForm?: boolean;
  actionItems?: {
    onClick: (value: string | number) => void;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    label: string;
  }[];
  autoFocus?: boolean;
};

type Props<T extends Record<string, any>> = IProp<T> & Omit<SelectProps, 'name' | 'value' | 'onChange'>;

export default function RSelect<T extends Record<string, any>>({
  name,
  options,
  factOptions,
  isLoading,
  disabled,
  disabledCloseOnSelect = false,
  showRequired = true,
  rules,
  value,
  useScan = false,
  onChange,
  quickActionOption,
  onChangeAfter,
  label,
  onSearchTextChange,
  onScrollBottom,
  disableClearable = false,
  disableForm = false,
  actionItems,
  nameLabel,
  autoFocus = false,
  ...other
}: Props<T>) {
  const { common: t_common } = locales['vi'];
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(autoFocus);
  const [isChooseFirstList, setIsChooseFirstList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const methods = disableForm ? undefined : useFormContext();

  const allOptions = useMemo(() => {
    let result = options;
    if (quickActionOption) {
      result = [
        { value: PrefixId.QuickAction, label: quickActionOption.label ?? t_common.quickAdd },
        ...options,
      ];
    }
    if (searchTerm && !onSearchTextChange) {
      result = result.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [options, quickActionOption, searchTerm]);

  useEffect(() => {
    const buffer: string[] = [];
    let timer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!menuOpen) return;
      if (timer) clearTimeout(timer);

      if (e.key === "Enter") {
        e.preventDefault();
        const barcode = buffer.join("");
        setSearchTerm(barcode);
        onSearchTextChange?.(barcode)
        setIsChooseFirstList(true);
        buffer.length = 0;
        return;
      }

      if (e.key.length === 1) {
        buffer.push(e.key);
      }

      timer = setTimeout(() => buffer.length = 0, 300);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const rawOptions = factOptions ?? options;
    if (isChooseFirstList && rawOptions?.length === 1 && !!useScan) {
      const value = rawOptions?.[0]?.value;
      methods?.setValue?.(name as any, value);
      onChange?.(value);
      onChangeAfter?.(value);
      handleClose();
      setIsChooseFirstList(false);
    }
  }, [isChooseFirstList, factOptions, useScan, methods])

  const handleClose = () => {
    setMenuOpen(false);
    setSearchTerm('');
    onSearchTextChange?.('');
    setIsChooseFirstList(false);
  }

  const renderItems = () => {
    if (!allOptions?.length) {
      return (
        <MenuItem disabled value="">
          {t_common.emptyOptions}
        </MenuItem>
      )
    }
    return allOptions.map((option) => {
      if (option.value === PrefixId.QuickAction && quickActionOption) {
        return (
          <MenuItem
            key={PrefixId.QuickAction}
            onClick={(e) => {
              e.preventDefault();
              quickActionOption.onAction();
            }}
          >
            {quickActionOption.icon ?? (
              <Add fontSize="small" color="primary" style={{ marginRight: 8 }} />
            )}
            <Typography color="primary.main">
              {quickActionOption.label ?? t_common.quickAdd}
            </Typography>
          </MenuItem>
        );
      }
      
      return (
        <MenuItem 
          key={option.value} 
          value={option.value}
          sx={{
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover, 
            },
          }}
          disabled={option?.disabled}
        >
          <Stack direction={'row'} justifyContent={'space-between'} gap={3} alignItems={'center'} width={'100%'}>
            <Typography component={'span'}>{nameLabel ? option?.[nameLabel] : option.label}</Typography>
            {!!actionItems?.length && (
              <Stack gap={2} direction={'row'}>
                {actionItems?.map((item, index) => (
                  <Tooltip key={index} title={item?.label} placement="right">
                    <IconButton size="small" onClick={(e) => {
                      e.stopPropagation();
                      item?.onClick?.(option.value)
                    }}>
                      {cloneElement(<item.icon sx={{fontSize: 16}}/>)}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            )}
          </Stack >
        </MenuItem>
      );
    });
  };

  const SearchField = (
    <ListSubheader
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      <TextField
        placeholder={t_common.search}
        fullWidth
        size="small"
        inputRef={inputRef}
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          const finalValue = value?.trim() === '' ? '' : value;
          setSearchTerm(finalValue);
          onSearchTextChange?.(finalValue);
          setIsChooseFirstList(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (searchTerm.length >= 1) {
              setIsChooseFirstList(true);
            } else {
              setIsChooseFirstList(false);
            }
          }
        }}
        InputProps={{
          endAdornment: isLoading ? <CircularProgress size={16} /> : null,
        }}
      />
    </ListSubheader>
  );

  const LoadingList = (
      isLoading ? (
        <Stack alignItems={'center'} justifyContent={'center'} py={1}>
          <CircularProgress size={16} color="primary"/>
        </Stack>
      ) : (
        null
      )
  )
  
  if (disableForm) {
    return (
      <FormControl fullWidth size="small">
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          {...other}
          open={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={disabledCloseOnSelect ? undefined : handleClose}
          key={value ?? 'empty'}
          label={label}
          value={value}
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'left',
              paddingRight: '0px !important',
            },
            '&.MuiSelect-root': {
              mt: 0,
            },
            ...other?.sx
          }}
          onChange={(e) => {
            const selected = e.target.value;
            onChange?.(selected as any);
            onChangeAfter?.(selected ?? null);
          }}
          disabled={disabled}
          endAdornment={
            <InputAdornment position="end">
              {!disableClearable && value && <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(null);
                }}
                sx={{mr: 0}}
                >
                <Clear fontSize="small" />
              </IconButton>}
              <Box sx={{mr: 2}}>{other.endAdornment}</Box>
            </InputAdornment>
          }
          renderValue={(val) => {
            const selected = options.find((o) => o.value === val);
            return (nameLabel ? selected?.[nameLabel] : selected?.label) ?? '';
          }}
          MenuProps={{
            disablePortal: true,
            PaperProps: {
              style: { maxHeight: 300 },
              onMouseDown: (e: any) => e.stopPropagation(),
              onScroll: (e: React.UIEvent<HTMLDivElement>) => {
                const bottom = e?.currentTarget.scrollHeight - e?.currentTarget.scrollTop === e?.currentTarget.clientHeight;
                if (bottom) {
                  onScrollBottom?.();
                }
              }
            },
            TransitionProps: {
              onEntered: () => {
                inputRef.current?.focus();
              },
            },
            autoFocus: false, 
            ...(disabledCloseOnSelect ? {onClose: (event, reason) => {
              if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                handleClose();
              }
            },} : {})
          }}
          >
          {SearchField}
          {renderItems()}
          {LoadingList}
        </Select>
      </FormControl>
    );
  }
  
  const { control } = useFormContext();

  return (
    <Controller
      name={name!}
      control={control}
      rules={rules}
      render={({ field: { onChange: onFieldChange, value }, fieldState: { error } }) => {
        const isRequired = rules?.required !== undefined;
        const finalLabel = isRequired && label && showRequired
          ? <>{label} <span style={{ color: 'red' }}>*</span></>
          : label;
          
        return (
          <Stack flex={1}>
            <FormControl fullWidth size="small" error={!!error}>
              <InputLabel error={!!error}>
                {finalLabel}
              </InputLabel>
              <Select
                {...other}
                open={menuOpen}
                onOpen={() => setMenuOpen(true)}
                onClose={disabledCloseOnSelect ? undefined : handleClose}
                key={value ?? 'empty'}
                label={finalLabel}
                value={value ?? ''}
                onChange={(e) => {
                  const selectedVal = e.target.value;
                  onFieldChange(selectedVal);
                  onChangeAfter?.(selectedVal);
                }}
                sx={{
                  '&.MuiSelect-root': {
                    mt: 0,
                  },
                  ...other?.sx
                }}  
                disabled={disabled}
                endAdornment={
                    <InputAdornment position="end" >
                      {!disableClearable && value && <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFieldChange('');
                        }}
                        sx={{mr: 0}}
                        >
                        <Clear fontSize="small" />
                      </IconButton>}
                      <Box sx={{mr: 2}}>{other.endAdornment}</Box>
                    </InputAdornment>
                }
                renderValue={(val) => {
                  const selected = options.find((o) => o.value === val);
                  return (nameLabel ? selected?.[nameLabel] : selected?.label) ?? '';
                }}
                MenuProps={{
                  disablePortal: true,
                  PaperProps: {
                    style: { maxHeight: 300 },
                    onMouseDown: (e: any) => e.stopPropagation(),
                    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
                      const bottom = e?.currentTarget.scrollHeight - e?.currentTarget.scrollTop === e?.currentTarget.clientHeight;
                      if (bottom) {
                        onScrollBottom?.();
                      }
                    }
                  },
                  TransitionProps: {
                    onEntered: () => {
                      inputRef.current?.focus();
                    },
                  },
                  ...(disabledCloseOnSelect ? {onClose: (event, reason) => {
                    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                      handleClose();
                    }
                  },} : {})
                }}
              >
                {SearchField}
                {renderItems()}
                {LoadingList}
              </Select>
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          </Stack>
        );
      }}
    />
  );
}
