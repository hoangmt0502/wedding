import { Box, Typography } from "@mui/material";
import ImageWrapper from "./ImageWrapper";
import PrimaryButton from "../button/PrimaryButton";
import { idPage } from "../../constants/common";
import { scrollToSection } from "../../utils/common";
import { useResponsive } from "../../hooks/useResponsive";
import { motion, Variants } from "framer-motion";


export default function TopSection() {
  const { isTablet, isMobile } = useResponsive();

  /* ================= ANIMATION CONFIG ================= */

  // Dịch chuyển ít hơn trên mobile
  const titleVariant: Variants = {
  hidden: {
    opacity: 0,
    y: isMobile ? 20 : 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.6 : 0.9,
      ease: [0.22, 1, 0.36, 1], // ✅ FIX
    },
  },
};

const fadeUp = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: isMobile ? 15 : 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: isMobile ? 0.5 : 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1], // ✅ FIX
    },
  },
});

  /* ==================================================== */

  return (
    <ImageWrapper
      height={isMobile ? 400 : isTablet ? 500 : 850}
      src="https://bellabridal.vn/public/upload/files/343342550_5955920044504242_5222768225392896037_n.jpg"
      opacity={isMobile ? 0.3 : 0.1}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Box mb={{ xs: 2, sm: 4 }} textAlign="center">

          {/* ===== TITLE ===== */}
          <motion.div
            variants={titleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Fleur De Leah', cursive",
                fontSize: { xs: "3rem", sm: "4rem", md: "5rem", lg: "8rem" },
                color: "#F0E68C",
                fontWeight: 800,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                lineHeight: 1.2,
              }}
            >
              Happy wedding
            </Typography>
          </motion.div>

          {/* ===== NAME ===== */}
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                color: "white",
                mt: 2,
                textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              Minh Hoàng & Khánh Huyền
            </Typography>
          </motion.div>

          {/* ===== DATE ===== */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                mt: 1,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              13/01/2026 Nhà Gái - 14/01/2026 Nhà Trai
            </Typography>
          </motion.div>

          {/* ===== BUTTONS ===== */}
          <motion.div
            variants={fadeUp(0.45)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Box
              sx={{
                width: "100%",
                mt: 3,
                display: "flex",
                justifyContent: { xs: "space-between", sm: "center" },
                px: "20px",
                gap: { xs: 2, sm: 5 },
              }}
            >
              <PrimaryButton
                iconType="heart"
                label="Gửi lời chúc"
                onClick={() => scrollToSection(idPage.guestBook)}
              />

              <PrimaryButton
                iconType="event"
                label="Sự kiện cưới"
                onClick={() => scrollToSection(idPage.event)}
              />

              {!isMobile && (
                <PrimaryButton
                  iconType="gift"
                  label="Mừng cưới"
                  onClick={() => scrollToSection(idPage.gift)}
                />
              )}
            </Box>
          </motion.div>

        </Box>
      </Box>
    </ImageWrapper>
  );
}
