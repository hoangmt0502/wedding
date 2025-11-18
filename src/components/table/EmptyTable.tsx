import { TableCell, TableRow, Typography } from "@mui/material";
import locales from "../../locales";
import { FolderOpen, InboxOutlined } from "@mui/icons-material";

type TProps = {
  column?: number;
  show: boolean;
}

export default function EmptyTable({ column = 12, show = false }: TProps) {
  const { common: t_helper } = locales['vi'];
  if (!show) {
    return null;
  }


  return (
    <TableRow>
      <TableCell colSpan={column} align="center">
        <InboxOutlined sx={{ fontSize: 54, color: '#999' }} />
        <Typography variant="body2" fontSize={16} color="text.secondary">
          {t_helper.noData}
        </Typography>
      </TableCell>
    </TableRow>
  )
}