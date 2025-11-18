import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import locales from "../../locales";
import { Close, GridView, ViewList } from "@mui/icons-material";

type TField<T = any> = {
  key: keyof T;
  label: string;
  render?: (value: any) => React.ReactNode;
  icon?: React.ElementType;
};

type TProps<T = any> = {
  open: boolean;
  onClose: VoidFunction;
  title?: string;
  data?: T | null;
  fields: TField<T>[];
  onNewAction?: VoidFunction;
};

export default function DetailModal<T = any>({
  open,
  onClose,
  title,
  data,
  fields,
  onNewAction,
}: TProps<T>) {
  const theme = useTheme();
  const { common } = locales['vi'];
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') onClose();
      }}
      // disableEscapeKeyDown
      fullWidth maxWidth="md"
    >
      <DialogTitle
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title || common.viewDetails}</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => setViewMode('list')} color={viewMode === 'list' ? 'primary' : 'default'}>
              <ViewList />
            </IconButton>
            <IconButton onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
              <GridView />
            </IconButton>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ paddingY: '20px' }}>
        {data ? (
          viewMode === 'list' ? (
            <Stack spacing={2}>
              {fields.map((field, index) => (
                <React.Fragment key={index}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    {field.icon && (
                      <field.icon color="primary" fontSize="small" />
                    )}
                    <Stack>
                      <Typography variant="subtitle2" color="textSecondary">
                        {field.label}
                      </Typography>

                      {field.render
                        ? field.render(data[field.key])
                        : <Typography variant="body1" sx={{ fontWeight: 600 }}> {String(data[field.key] ?? '')}
                        </Typography>}
                    </Stack>
                  </Stack>
                  {index !== fields.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Stack>
          ) : (
            <Stack spacing={2}>
              {fields.map((field, index) => (
                <React.Fragment key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Typography variant="subtitle2" color="textSecondary" sx={{ minWidth: 150 }}>
                      {field.label}
                    </Typography>
                    {
                      field.render ? <Box>{field.render(data[field.key])}</Box> :
                        <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'right' }}> {String(data[field.key] ?? '')}</Typography>
                    }
                  </Stack>
                  {index !== fields.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Stack>
          )
        ) : (
          <Typography align="center">{common.noData}</Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{ paddingX: '20px', paddingY: 2 }}
      >
        {onNewAction && (
          <Button
            onClick={onNewAction}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
          >
            {common.continue}
          </Button>
        )}
        <Button onClick={onClose} color="error" variant="outlined"
          startIcon={<Close />}
        >
          {common.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
