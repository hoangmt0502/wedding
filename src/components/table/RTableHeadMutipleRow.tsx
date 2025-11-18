import { Theme, useTheme } from "@mui/material/styles";
import {
  Box,
  SxProps,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { THeadLabel } from "../../interfaces/common";

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
} as const;

type Props = {
  order?: "asc" | "desc";
  orderBy?: string;
  headLabel: THeadLabel[];
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  sx?: SxProps<Theme>;
  isSelectAll?: boolean;
};

export default function RTableHeadMutipleRow({
  order = "asc",
  orderBy,
  headLabel,
  onSort,
  onSelectAllRows,
  sx,
  isSelectAll = false,
}: Props) {
  const theme = useTheme();
  const bgColor = theme.palette.grey[300];

  return (
    <TableHead sx={{ ...sx }}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding="checkbox" rowSpan={2}>
            <Checkbox
              checked={isSelectAll}
              onChange={(e) => onSelectAllRows(e.target.checked)}
              sx={{ padding: 0 }}
            />
          </TableCell>
        )}

        {headLabel.map((head) =>
          head.children ? (
            <TableCell
              key={head.label}
              align={head.align}
              colSpan={head.colSpan}
              sx={{ textAlign: 'center' }}
            >
              {head.label}
            </TableCell>
          ) : (
            <TableCell
              key={String(head.id)}
              align={head.align}
              rowSpan={head.rowSpan ?? 2}
              sx={{ textAlign: 'center' }}
            >
              {head.label}
            </TableCell>
          )
        )}
      </TableRow>

      <TableRow>
        {headLabel.map(
          (head) =>
            head.children?.map((child) => (
              <TableCell
                key={String(child.id)}
                align={child.align}
                sx={{ textAlign: 'center' }}
              >
                {child.label}
              </TableCell>
            ))
        )}
      </TableRow>
    </TableHead>
  );
}
