import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import locales from '../../locales';

const { common } = locales['vi'];

const ISearchField: React.FC<TextFieldProps> = ({
  label = common.search,
  size = 'small',
  fullWidth = true,
  variant = 'outlined',
  sx,
  ...rest
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      variant={variant}
      size={size}
      {...rest}
      sx={{
        zIndex: 0,
        "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
          {
            WebkitAppearance: "none",
            margin: 0,
          },
        "input[type=number]": {
          MozAppearance: "textfield",
        },
      }}
      onWheel={(event) => {
        event.currentTarget.querySelector("input")?.blur();
        event.stopPropagation();
      }}
    />
  );
};

export default ISearchField;
