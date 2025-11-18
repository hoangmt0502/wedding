import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { IDataSubmitPermission, IPermission } from "../../interfaces/permission";

type TProps = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: SubmitHandler<IDataSubmitPermission>;
  permission?: IPermission | null;
}

const PermissionForm = ({ open, onClose, onSubmit, permission }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Reset form khi mở dialog hoặc quyền thay đổi
  useEffect(() => {
    if (open) {
      reset(permission ? {
        name: permission.name || "",
        description: permission.description || "",
      } : {
        name: "",
        description: "",
      });
    }
  }, [open, permission, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{permission ? "Chỉnh sửa quyền" : "Thêm quyền mới"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {/* Tên */}
          <TextField
            label="Tên"
            fullWidth
            margin="normal"
            {...register("name", { required: "Tên không được để trống" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Description */}
          <TextField
            label="Mô tả"
            type="description"
            fullWidth
            margin="normal"
            {...register("description", { required: "Mô tả không được để trống" })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Hủy
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {permission ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PermissionForm;
