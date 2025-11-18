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
  hasDivider?: boolean;
};

export default function RTableHead({
  order = "asc",
  orderBy,
  headLabel,
  onSort,
  onSelectAllRows,
  sx,
  isSelectAll = false,
  hasDivider = false
}: Props) {
  const theme = useTheme();
  const bgColor = theme.palette.grey[300];

  return (
    <TableHead sx={{...sx }}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding="checkbox" align="center"
            sx={{
              borderRight: hasDivider ? `1px solid rgba(233, 233, 236, 1)` : undefined,
            }}  
          >
            <Checkbox
              checked={isSelectAll}
              onChange={(e) => onSelectAllRows(e.target.checked)}
              sx={{ padding: 0 }}
            />
          </TableCell>
        )}

        {headLabel.map(({ id, label, align = "left", width, minWidth }, index) => {
          const isSorted = orderBy === id;

          return (
            <TableCell
              key={`${String(id)}`}
              align={align}
              sortDirection={isSorted ? order : false}
              sx={{
                width,
                minWidth,
                borderRight: hasDivider && !(index === headLabel.length - 1) ? `1px solid rgba(233, 233, 236, 1)` : undefined,
                textTransform: 'uppercase',
                fontSize: "0.75rem",
              }}
            >
              {onSort ? (
                <TableSortLabel
                  hideSortIcon
                  active={isSorted}
                  direction={isSorted ? order : "asc"}
                  onClick={() => onSort(String(id))}
                  sx={{ textTransform: "uppercase" }}
                >
                  {label}
                  {isSorted && (
                    <Box sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  )}
                </TableSortLabel>
              ) : (
                label
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
