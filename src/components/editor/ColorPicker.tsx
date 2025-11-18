import { HexColorPicker } from "react-colorful";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Popover,
  Stack,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Clear } from "@mui/icons-material";

type Props = {
  onChange: (color: string) => void;
  currentColor?: string;
  icon: React.ReactNode;
  tooltip: string;
  type: "text" | "background";
};

// Cột đầu tiên: reset, đen, trắng
const firstColumn = ["reset", "#000000", "#ffffff"];

// Các màu chủ đạo: mỗi cột = [đậm, vừa, nhạt]
const colorColumns = [
  ["#e60000", "#e74c3c", "#facccc"], // red
  ["#ff9900", "#e67e22", "#ffebcc"], // orange
  ["#0066cc", "#3498db", "#cce0f5"], // blue
  ["#008a00", "#2ecc71", "#cce8cc"], // green
  ["#9933ff", "#9b59b6", "#ebd6ff"], // purple
  ["#ffff00", "#ffff99", "#ffffcc"], // yellow
  ["#555555", "#aaaaaa", "#dddddd"], // gray
];

export default function ColorPicker({
  onChange,
  currentColor,
  icon,
  tooltip,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [color, setColor] = useState(currentColor);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChange = (newColor: string) => {
    setColor(newColor);
    onChange(newColor);
  };

  // Tạo mảng 3 hàng (mỗi hàng là 1 Stack ngang)
  const rows = Array.from({ length: 3 }, (_, rowIndex) => [
    firstColumn[rowIndex],
    ...colorColumns.map((col) => col[rowIndex]),
  ]);

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton
          onClick={handleClick}
          sx={{
            position: "relative",
          }}
        >
          {icon}
          <Box
            sx={{
              position: "absolute",
              bottom: 3,
              left: 8,
              width: 20,
              height: 4,
              backgroundColor: currentColor || "transparent",
              border: currentColor === "#ffffff" ? "1px solid #ccc" : "none",
              mt: "2px",
              borderRadius: 1,
            }}
          />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleClose}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box sx={{ p: 2 }}>
            <Stack direction='column' gap={1} mb={2}>
              {rows.map((row, rowIndex) => (
                <Stack key={rowIndex} direction='row' gap={1}>
                  {row.map((cell, colIndex) =>
                    cell === "reset" ? (
                      <Tooltip title='Reset color' key='reset'>
                        <IconButton
                          size='small'
                          onClick={() => handleChange("")}
                          sx={{
                            width: 20,
                            height: 20,
                            border: "1px solid #ccc",
                          }}
                        >
                          <Clear fontSize='inherit' />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Box
                        key={colIndex}
                        onClick={() => handleChange(cell)}
                        sx={{
                          width: 20,
                          height: 20,
                          bgcolor: cell,
                          border: "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      />
                    )
                  )}
                </Stack>
              ))}
            </Stack>

            <HexColorPicker
              color={color || "#ffffff"}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </Box>
        </ClickAwayListener>
      </Popover>
    </>
  );
}
