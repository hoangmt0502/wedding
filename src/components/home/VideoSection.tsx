import { useState } from "react";
import { Box, IconButton, Typography, Dialog } from "@mui/material";
import ImageWrapper from "./ImageWrapper";
import { PlayCircleOutline } from "@mui/icons-material";
import ReactPlayer from "react-player";
import { useResponsive } from "../../hooks/useResponsive";

// === ADD ===
import { motion, Variants } from "framer-motion";

export default function VideoSection() {
  const [open, setOpen] = useState(false);
  const { isMobile } = useResponsive();

  /* ================= ANIMATION CONFIG ================= */

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const fadeUpDelay = (delay: number): Variants => ({
    hidden: { opacity: 0, y: isMobile ? 25 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.45 : 0.7,
        delay,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  });

  const scaleFade: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: isMobile ? 0.45 : 0.65,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  /* ==================================================== */

  return (
    <>
      <ImageWrapper
        src="/collections/raw/HLE09347.jpg"
        opacity={0.4}
        height={isMobile ? 400 : 740}
        isCompactWidth
        backgroundPosition="0 34%"
      >
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box textAlign="center" color="#fff" mt={{ xs: 10, sm: 30 }} px={2}>

            {/* ===== TITLE ===== */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >

              <Typography sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontFamily: "'Fleur De Leah', cursive", fontWeight: 600, mb: 1 }}>
                Xem video cưới của chúng tôi!
              </Typography>
            </motion.div>

            {/* ===== SUBTITLE ===== */}
            <motion.div
              variants={fadeUpDelay(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >

              <Typography sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, maxWidth: 700, mx: "auto", opacity: .9, mb: 3 }}>
                Hạnh phúc không ồn ào. Hạnh phúc là khi có người nắm tay mình đi qua mọi ngày.
              </Typography>
            </motion.div>

            {/* ===== PLAY BUTTON ===== */}
            <motion.div
              variants={scaleFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
            >
              <IconButton
                onClick={() => setOpen(true)}
                sx={{
                  width: { xs: 80, sm: 140 },
                  height: { xs: 80, sm: 140 },
                  color: "#ff6e6e",
                  "&:hover": { transform: "scale(1.08)", color: "#ff8a8a" }
                }}
              >
                <PlayCircleOutline sx={{ fontSize: { xs: 80, sm: 140 } }} />
              </IconButton>
            </motion.div>

          </Box>
        </Box>
      </ImageWrapper>

      {/* ===== MODAL VIDEO ===== */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <Box p={2}>
            <ReactPlayer
              src="https://www.youtube.com/watch?v=lY2yjAdbvdQ"
              playing={open}
              controls
              width="100%"
              height="70vh"
              style={{ borderRadius: 12, overflow: "hidden" }}
            />
          </Box>
        </motion.div>
      </Dialog>
    </>
  );
}
