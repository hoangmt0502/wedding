import { Box, Typography } from "@mui/material";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";
import { MAIN_COLOR } from "../../constants/common";
import { useResponsive } from "../../hooks/useResponsive";

// === ADD ===
import { motion, Variants } from "framer-motion";

const PersonCard = ({ image, name, father, mother, address, nameType }: any) => (
  <Box
    sx={{
      width: '100%',
      background: {xs: 'none', sm: "rgba(255,255,255,0.85)"},
      borderRadius: "14px",
      border: {xs: "none", sm: "1.7px solid rgba(200,150,70,0.65)"},
      backdropFilter: {xs: "none", sm: "blur(10px)"},
      boxShadow: {xs: "none", sm: "0 0 30px rgba(0,0,0,0.08)"},
      p: {xs: 0, sm: 3},
      textAlign: "center",
      transition: "0.35s",
      height: '100%',
      "&:hover": {
        transform: {xs: "none", sm: "translateY(-6px)"},
        boxShadow: {xs: "none", sm: "0 0 35px rgba(0,0,0,0.16)"},
      }
    }}
  >
    <Box
      component="img"
      src={image}
      sx={{
        width: 260,
        height: {xs: 240, sm: 360},
        maxWidth: "100%",
        borderRadius: "10px",
        objectFit: "cover",
        boxShadow: "0 6px 22px rgba(0,0,0,0.32)",
        mx: "auto",
        transition: "0.45s",
        "&:hover": { transform: "scale(1.05)" }
      }}
    />

    <Typography
      sx={{
        mt: {xs: 1.5, sm: 2.5},
        fontFamily: "'Great Vibes', cursive",
        fontSize: {xs: 26, sm: 34},
        fontWeight: 600,
        color: "#2e2e2e"
      }}
    >
      {name}
    </Typography>

    <Typography sx={{ fontSize: 20, opacity: 0.55 }}>♡</Typography>

    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: {xs: 20, sm: 22},
        fontWeight: 600,
        letterSpacing: 0.6,
        color: "#7b5a2f",
        mb: .5
      }}
    >
      {nameType}
    </Typography>

    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        color: "#3f3f3f",
        lineHeight: 1.55,
        fontSize: {xs: 18, sm: 20},
        fontWeight: 700
      }}
    >
      {father} <br/> {mother}
    </Typography>

    <Typography sx={{ mt: 1.5, fontSize: 14, color: "#555", px: {xs: 1, sm: 0} }}>
      {address}
    </Typography>
  </Box>
);

export default function GroomBrideSection() {
  const { compactWidth } = useContentWidth();
  const {isMobile} = useResponsive();

  /* ================= ANIMATION CONFIG ================= */

  const fadeFar: Variants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 60 : 120,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideLeft: Variants = {
    hidden: {
      opacity: 0,
      x: isMobile ? -30 : -80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideRight: Variants = {
    hidden: {
      opacity: 0,
      x: isMobile ? 30 : 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* ==================================================== */

  return (
    <Box
      component={motion.div}
      variants={fadeFar}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-160px" }}
      sx={{ width: "100%", pb: {xs: 0, sm: 9}, mt: 4, display: "flex", justifyContent: "center", background: 'rgb(248, 246, 246)' }}
    >
      <Box
        sx={{
          width: compactWidth,
          mx: "auto",
          borderRadius: {xs: 0, sm: 3},
          backgroundImage: "url('/collections/web-hq/HLE09246.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.58) 10%, rgba(255,255,255,0.65) 90%)",
            backdropFilter: "blur(6px)",
            zIndex: 1,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center", py: {xs: 3, md: 4} }}>
          
          <motion.div
            variants={fadeFar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-160px" }}
          >
            <SharedImage src="/images/marriage_icon.png" width={isMobile ? 48 : 75} style={{ margin: "0 auto" }} />

            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 600,
                letterSpacing: 1,
                color: 'rgb(54, 54, 54)',
                fontSize: {xs: 32, md: 40},
                mt: 1,
                mb: {xs: 2, sm: 3, md: 5},
              }}
            >
              Chú Rể & Cô Dâu
            </Typography>
          </motion.div>

          <Box display="flex" flexDirection={'row'} gap={{xs: 1, sm: 2, md: 6}} justifyContent="center" px={{xs: 1, sm: 2, md: 0}}>

            <Box
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-130px" }}
              component={motion.div}
              sx={{
                width: {xs: "50%", md: '40%'}
              }}
            >
              <PersonCard
                image="/collections/web/HLE09181.jpg"
                name="Minh Hoàng"
                father="Trần Quang Huy"
                mother="Nguyễn Thị Vân"
                address="Nhà văn hóa tổ 14, Đức Giang: số 72 ngõ 638 Ngô Gia Tự, Đức Giang, Long Biên, Hà Nội"
                nameType="NHÀ TRAI"
              />
            </Box>

            <Box
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-130px" }}
              component={motion.div}
              sx={{
                width: {xs: "50%", md: '40%'}
              }}
            >
              <PersonCard
                image="/collections/web/HLE09064.jpg"
                name="Khánh Huyền"
                father="Nguyễn Trọng Nam"
                mother="Nguyễn Thị Cúc"
                address="TTTM Himlam Plaza: Đường Trần Đăng Ninh, Phường Điện Biên Phủ, Điện Biên"
                nameType="NHÀ GÁI"
              />
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}
