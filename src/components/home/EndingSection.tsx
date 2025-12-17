import { Box, Typography } from "@mui/material";
import ImageWrapper from "./ImageWrapper";
import { useResponsive } from "../../hooks/useResponsive";

// === ADD ===
import { motion, Variants } from "framer-motion";

export default function EndingSection() {
  const { isMobile } = useResponsive();

  /* ================= ANIMATION CONFIG ================= */

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUpDelay = (delay: number): Variants => ({
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  const fadeScale: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* ==================================================== */

  return (
    <ImageWrapper
      src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress"
      isCompactWidth
      height={700}
      opacity={0.4}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          padding: "0 20px",
          gap: "12px",
        }}
      >
        {/* TITLE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: 40, sm: "52px" },
              fontWeight: 600,
              margin: 0,
            }}
          >
            Thank You!
          </Typography>
        </motion.div>

        {/* NAME */}
        <motion.div
          variants={fadeUpDelay(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: { xs: 26, sm: "34px" },
              margin: 0,
            }}
          >
            Minh Hoàng & Khánh Huyền
          </Typography>
        </motion.div>

        {/* HEART */}
        <motion.div
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          viewport={{ once: true }}
        >
          <Box sx={{ fontSize: "28px" }}>❤️❤️❤️</Box>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div
          variants={fadeUpDelay(0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            style={{
              fontSize: "18px",
              maxWidth: "780px",
              opacity: 0.9,
              lineHeight: 1.6,
              whiteSpace: "pre-line",
            }}
          >
            {
              "Cảm ơn bạn đã dành thời gian ghé thăm thiệp cưới online của chúng mình.\nSự hiện diện của bạn trong ngày trọng đại là niềm hạnh phúc to lớn."
            }
          </Typography>
        </motion.div>
      </Box>
    </ImageWrapper>
  );
}
