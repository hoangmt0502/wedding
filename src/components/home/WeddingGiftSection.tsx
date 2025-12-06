import { useState } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GiftQRModal from "./GiftQRModal";
import ImageWrapper from "./ImageWrapper";
import { idPage } from "../../constants/common";

export default function WeddingGiftSection() {
  const [openQR, setOpenQR] = useState(false);

  return (
    <>
      {/* ============ SECTION ============ */}
      <ImageWrapper
        src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress"
        isCompactWidth
        height={700}
        opacity={0.7}
        id={idPage.gift}
      >
        <Stack alignItems={'center'} justifyContent={'center'} height={'100%'} width={'100%'}>
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
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
              Cảm ơn tất cả các tình cảm mà mọi người đã dành cho Hoàng & Huyền
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
        </Stack>
      </ImageWrapper>

      {/* ============ MODAL COMPONENT ============ */}
      <GiftQRModal
        open={openQR}
        onClose={() => setOpenQR(false)}
        groom={{
          title: "Nhà Trai",
          qr: "/images/qr_hoang.jpg",
          bank: "BIDV",
          account: "03972225122",
          owner: "TRAN MINH HOANG",
        }}
        bride={{
          title: "Nhà Gái",
          qr: "/images/qr_huyen.jpg",
          bank: "MB",
          account: "0680127298007",
          owner: "NGUYEN THI KHANH HUYEN",
        }}
      />
    </>
  );
}
