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
import { IDataSubmitGroups, IGroups } from "../../interfaces/groups";

type TProps = {
  open: boolean;
  onClose: VoidFunction;
  onSubmit: SubmitHandler<IDataSubmitGroups>;
  group?: IGroups | null;
}

const GroupForm = ({ open, onClose, onSubmit, group }: TProps) => {
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

  // Reset form khi mở dialog hoặc group thay đổi
  useEffect(() => {
    if (open) {
      reset(group ? {
        name: group.name || "",
        description: group.description || "",
      } : {
        name: "",
        description: "",
      });
    }
  }, [open, group, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{group ? "Chỉnh sửa nhóm quyền" : "Thêm nhóm quyền mới"}</DialogTitle>
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
            {group ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GroupForm;
