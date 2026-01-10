import { useState } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GiftQRModal from "./GiftQRModal";
import ImageWrapper from "./ImageWrapper";
import { idPage } from "../../constants/common";
import { motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

export default function WeddingGiftSection() {
  const [openQR, setOpenQR] = useState(false);
  const {isMobile} = useResponsive()

  return (
    <>
      {/* ============ SECTION ============ */}
      <ImageWrapper
        src="/collections/raw/HLE09129.jpg"
        isCompactWidth
        height={isMobile ? 500 : 800}
        opacity={0.7}
        id={idPage.gift}
        backgroundPosition={isMobile ? "bottom" : "0 60%"}
      >
        <Stack alignItems={'center'} justifyContent={'center'} height={'100%'} width={'100%'}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-160px" }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              position: "relative",
              textAlign: "center",
              px: 1,
              color: "#fff",
              mt: {xs: 12, md: 0}
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: {xs: 32, sm: 48},
                fontWeight: 600,
                mb: 2,
              }}
            >
              Hộp mừng cưới
            </Typography>

            <Typography
              sx={{
                fontSize: {xs: 14, sm: 18},
                opacity: 0.85,
                mb: {xs: 3, sm: 5},
                whiteSpace: 'pre-line'
              }}
            >
              {"Cảm ơn tất cả tình cảm mà mọi người đã dành cho\nHoàng & Huyền"}
            </Typography>

            {/* Nút mở modal */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-160px" }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setOpenQR(true)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: {xs: 60, sm: 90},
                height: {xs: 60, sm: 90},
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
          account: "0397225122",
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
