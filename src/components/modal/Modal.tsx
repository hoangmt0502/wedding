import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
  DialogProps,
} from "@mui/material";
import { Close, SaveAs } from "@mui/icons-material";
import locales from "../../locales";
import { MODAL_SIZE } from "../../enums/common";

const { common: t_common } = locales["vi"];

type TProps = {
  open: boolean;
  onClose?: VoidFunction;
  title?: string;
  children: React.ReactNode;
  onAction?: VoidFunction;
  buttonText?: string;
  maxWidth?: DialogProps['maxWidth'];
  fullWidth?: boolean;
  contentCss?: React.CSSProperties;
  height?: string;
} & Partial<Omit<DialogProps, 'maxWidth' | 'fullWidth'>>;


export const Modal = ({
  open,
  onClose,
  title,
  children,
  onAction,
  buttonText = t_common.addNew,
  maxWidth = 'md',
  fullWidth = true,
  contentCss,
  height = '95%',
  ...dialogProps
}: TProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={{ 
        p: 0,
        '& .MuiDialog-paper': {
          height: `${height} !important`,
          maxHeight: '100% !important',
        }
      }}
      {...dialogProps}
    >
      { title && <DialogTitle sx={{ paddingY: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {title || ""}
          </Typography>
          <IconButton onClick={onClose} sx={{p:0}}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>}

      <DialogContent dividers sx={{ p: 0, ...contentCss }}>
        {children}
      </DialogContent>
      {
        onAction || onClose ?
        <DialogActions sx={{ px: 3, py: 2 }}>
          { onClose && <Button
            onClick={onClose}
            variant="outlined"
            startIcon={<Close />}
          >
            {t_common.close}
          </Button>}
          {onAction && (
            <Button
              onClick={onAction}
              variant="contained"
              startIcon={<SaveAs />}
            >
              {buttonText ? buttonText : t_common.continue}
            </Button>
          )}
        </DialogActions> : <></>
      }
    </Dialog>
  );
}
