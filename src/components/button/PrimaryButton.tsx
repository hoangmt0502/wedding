import { Button, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventIcon from "@mui/icons-material/Event";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

interface PrimaryButtonProps {
  iconType: "heart" | "event" | "gift";
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
}

const iconMap = {
  heart: <FavoriteIcon sx={{ color: "red", mr: 1 }} />,
  event: <EventIcon sx={{ color: "black", mr: 1 }} />,
  gift: <CardGiftcardIcon sx={{ color: "#E42C44", mr: 1 }} />,
};

export default function PrimaryButton({
  iconType,
  label,
  onClick,
  fullWidth = false,
}: PrimaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        // 🔥 GIỮ NGUYÊN UI GỐC
        backgroundColor: "white",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        color: "black",
        textTransform: "none",
        padding: "10px 20px",

        // ⭐ RESPONSIVE CHỈ THÊM — KHÔNG ĐỔI UI
        fontSize: {
          xs: "0.85rem",
          sm: "0.9rem",
          md: "1rem",
        },
        gap: { xs: 0.5, sm: 1 },

        // Mobile dễ bấm hơn
        minHeight: { xs: 42, sm: 46, md: 48 },

        "&:hover": {
          backgroundColor: "#f0f0f0",
          boxShadow:
            "0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {iconMap[iconType]}

      <Typography sx={{ fontWeight: 400 }}>{label}</Typography>
    </Button>
  );
}
