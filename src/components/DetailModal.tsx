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
} from "@mui/material";
import locales from "../locales";

type TField<T> = {
  key: Extract<keyof T, string>;
  label: string;
  render?: (value: any) => React.ReactNode;
  icon?: React.ElementType;
};

type TProps<T> = {
  open: boolean;
  onClose: VoidFunction;
  title?: string;
  data?: Partial<T> | null;
  fields: TField<T>[];
  onNewAction?: VoidFunction;
};

export default function DetailModal<T> ({
  open,
  onClose,
  title,
  data,
  fields,
  onNewAction,
}: TProps<T>) {
  const theme = useTheme();
  const { common } = locales['vi'];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "white",
          textAlign: "center",
        }}
      >
        {title || common.viewDetails}
      </DialogTitle>

      <DialogContent dividers sx={{ p: 1 }}>
        {data ? (
          <Card elevation={0} sx={{ p: 1, borderRadius: 0 }}>
            <CardContent>
              <Stack spacing={2}>
                {fields.map((field, index) => (
                  <React.Fragment key={field.key || index}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      {field.icon && (
                        <field.icon color="primary" fontSize="small" />
                      )}
                      <Stack>
                        <Typography variant="subtitle2" color="textSecondary">
                          {field.label}
                        </Typography>
                        <Typography variant="body1" sx={{fontWeight: 600}}>
                          {field.render
                            ? field.render(data?.[field.key])
                            : String(data?.[field.key] ?? "")}
                        </Typography>
                      </Stack>
                    </Stack>
                    {index !== fields.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Typography align="center">{common.noData}</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ bgcolor: theme.palette.custom.dark }}>
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
        <Button onClick={onClose} color="error" variant="outlined">
          {common.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
