import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ErrorPage() {
  const error = useRouteError() as {
    statusText?: string;
    message?: string;
  };
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        textAlign: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <Box sx={{ mt: -8, px: 2 }}>
        <Box
          component="img"
          src="/images/error_page.png"
          sx={{ objectFit: "cover", width: { xs: 250, sm: 400 } }}
        />
        <Typography variant="h4" color="error" fontWeight="bold" gutterBottom>
          Oops! Có lỗi xảy ra
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại hoặc quay lại
          trang chủ.
        </Typography>

        {!!error && (
          <Typography
            variant="subtitle2"
            sx={{
              color: "error.main",
              fontStyle: "italic",
              mb: 3,
              fontSize: 18,
            }}
          >
            {error?.statusText || error?.message || "Lỗi không xác định"}
          </Typography>
        )}

        <Button
          variant="outlined"
          size="medium"
          onClick={() => navigate("/")}
          sx={{
            gap: 1,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} /> Quay lại Trang chủ
        </Button>
      </Box>
    </Box>
  );
}
