import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "./Header";

export default function LoginLayout({ children }: { children?: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
