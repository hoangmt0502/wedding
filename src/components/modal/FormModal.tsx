import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
  CircularProgress,
} from '@mui/material';
import { ReactNode, useEffect } from 'react';
import {
  useForm,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from 'react-hook-form';
import RFormProvider from '../root-form/RFormProvider';
import { Cancel, SaveAs } from '@mui/icons-material';
import locales from '../../locales';
import React from 'react';

const { common: t_common } = locales['vi'];

type ModalFormProps<T extends FieldValues, TInput = any> = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  defaultValues: TInput | null;
  getDefaultValues: (data: TInput | null) => Partial<T>;
  handleSubmit?: (data: T) => void;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
  maxWidth?: DialogProps['maxWidth'];
  fullWidth?: boolean;
  fullScreen?: boolean;
  contentCss?: React.CSSProperties;
  extraButtons?: React.ReactNode[];
} & Partial<Omit<DialogProps, 'maxWidth' | 'fullWidth'>>;

export const ModalForm = <T extends FieldValues, TInput = any>({
  open,
  onClose,
  title,
  children,
  defaultValues,
  getDefaultValues,
  handleSubmit,
  isLoading = false,
  confirmText = t_common.update,
  cancelText = t_common.close,
  maxWidth = 'md',
  fullWidth = true,
  fullScreen = false,
  contentCss,
  extraButtons,
  ...dialogProps
}: ModalFormProps<T>) => {
  const methods = useForm<T>({
    defaultValues: getDefaultValues(defaultValues) as DefaultValues<T>,
  });

  const { reset } = methods;

  const onSubmitHandler: SubmitHandler<T> = async (data) => {
    if (!handleSubmit) return;
    try {
      const res: any = await handleSubmit(data);
      if (res) {
        reset();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reset(getDefaultValues(defaultValues) as DefaultValues<T>);
  }, [defaultValues, reset, open]);

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') onClose();
      }}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      sx={{
        '& .MuiDialog-paper': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      {...dialogProps}
    >
      {title && <DialogTitle sx={{ py: 2 }}>{title}</DialogTitle>}

      <RFormProvider<T> methods={methods} onSubmit={onSubmitHandler}>
        <DialogContent
          dividers
          sx={{
            px: 2,
            py: 2,
            flex: 1,
            maxHeight: fullScreen ? 'calc(100vh - 140px)' : 'calc(100vh - 200px)',
            ...contentCss,
          }}
        >
          {children}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            variant="outlined"
            startIcon={<Cancel />}
          >
            {cancelText}
          </Button>
          {extraButtons &&
            extraButtons.map((button, index) => (
              <React.Fragment key={index}>{button}</React.Fragment>
          ))}
          {handleSubmit && (
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={ isLoading ? <CircularProgress size={20} /> : <SaveAs />}
            >
              {confirmText}
            </Button>
          )}
        </DialogActions>
      </RFormProvider>
    </Dialog>
  );
};

export default React.memo(ModalForm);
