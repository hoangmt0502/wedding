import { useRef, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  MenuItemProps,
  ButtonProps,
  Box,
} from "@mui/material";

export interface HoverMenuButtonOption extends MenuItemProps {
  label: string;
  onClick: () => void;
}

export interface HoverMenuButtonProps extends ButtonProps {
  label: string;
  icon?: React.ReactNode;
  options: HoverMenuButtonOption[];
  menuMinWidth?: number;
}

export default function HoverMenuButton({
  label,
  icon,
  options,
  menuMinWidth = 160,
  ...buttonProps
}: HoverMenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = (target: HTMLElement) => {
    clearTimeout(timeoutRef.current!);
    setAnchorEl(target);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  const handleOptionClick = (onClick: () => void) => {
    setAnchorEl(null);
    onClick?.();
  };

  return (
    <Box
      onMouseEnter={(e) => handleOpen(e.currentTarget)}
      onMouseLeave={handleClose}
      style={{ display: "inline-block" }}
    >
      <Button
        startIcon={icon}
        variant="contained"
        color="primary"
        {...buttonProps}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: menuMinWidth,
              boxShadow: 3,
            },
          }
        }}
        MenuListProps={{
          disablePadding: false,
        }}
      >
        {options.map(({ label, onClick, ...rest }, index) => (
          <MenuItem
            key={index}
            onClick={() => handleOptionClick(onClick)}
            {...rest}
          >
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
