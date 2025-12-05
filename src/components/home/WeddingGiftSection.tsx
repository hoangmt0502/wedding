import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GiftQRModal from "./GiftQRModal";

export default function WeddingGiftSection() {
  const [openQR, setOpenQR] = useState(false);

  return (
    <>
      {/* ============ SECTION ============ */}
      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "url('https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            maxWidth: 560,
            px: 2,
            color: "#fff",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 48,
              fontWeight: 600,
              mb: 2,
            }}
          >
            Hộp mừng cưới
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              opacity: 0.85,
              mb: 5,
            }}
          >
            Cảm ơn tất cả các tình cảm mà mọi người đã dành cho Thịnh & Hằng
          </Typography>

          {/* Nút mở modal */}
          <Box
            onClick={() => setOpenQR(true)}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 90,
              height: 90,
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.65)",
              backdropFilter: "blur(2px)",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "#fff",
                boxShadow: "0 0 18px rgba(255,255,255,0.45)",
              },
            }}
          >
            <IconButton sx={{ color: "#fff" }}>
              <CardGiftcardIcon sx={{ fontSize: 42 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ============ MODAL COMPONENT ============ */}
      <GiftQRModal
        open={openQR}
        onClose={() => setOpenQR(false)}
        groom={{
          title: "Nhà Trai",
          qr: "/images/qr-groom.png",
          bank: "Vietcombank",
          account: "0123456789",
          owner: "Nguyễn Văn A",
        }}
        bride={{
          title: "Nhà Gái",
          qr: "/images/qr-bride.png",
          bank: "MB Bank",
          account: "888999777",
          owner: "Trần Thị B",
        }}
      />
    </>
  );
}
