import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { COLLECTION_LEFT, COLLECTION_RIGHT, MAIN_COLOR } from "../../constants/common";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";
import { ExpandMore } from "@mui/icons-material";
import { useResponsive } from "../../hooks/useResponsive";

// === ADD ===
import { motion, Variants } from "framer-motion";

const allImages = [...COLLECTION_LEFT, ...COLLECTION_RIGHT];

const CollectionSection = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const { isMobile } = useResponsive();

  const { compactWidth } = useContentWidth();
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // === ADD animation config ===
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: isMobile ? 60 : 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: isMobile ? -60 : -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: isMobile ? 60 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const openViewer = (index: number) => {
    setCurrent(index);
    setOpen(true);
  };

  const closeViewer = () => setOpen(false);

  const next = () =>
    setCurrent((prev) => (prev + 1) % allImages.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + allImages.length) % allImages.length);

  useEffect(() => {
    const el = thumbRefs.current[current];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [current]);

  return (
    <Box
      component={motion.div}                // === ADD ===
      variants={fadeUp}                     // === ADD ===
      initial="hidden"                      // === ADD ===
      whileInView="visible"                 // === ADD ===
      viewport={{ once: true, margin: "-120px" }} // === ADD ===
      sx={{ py: { xs: 3, sm: 6 }, backgroundColor: "#f5f3f3ff" }}
    >
      <Box sx={{ width: compactWidth, mx: "auto" }}>
        <Box sx={{ mx: { xs: 1, sm: 0 } }}>
          <Stack alignItems="center" mb={{ xs: 2, sm: 4 }}>
            <SharedImage src="/images/logo.png" width={isMobile ? 100 : 160} />
          </Stack>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 600,
              letterSpacing: 1,
              color: MAIN_COLOR,
              fontSize: { xs: 22, sm: "2.2rem" },
            }}
          >
            BỘ SƯU TẬP ẢNH CƯỚI
          </Typography>

          {/* 2 column layout */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {/* LEFT COLUMN */}
            <Box sx={{ flex: 0.37, display: "flex", flexDirection: "column", gap: 2, justifyContent: 'center' }}>
              {COLLECTION_LEFT.map((src, idx) => (
                <Box
                  key={src + idx}
                  component={motion.div}     // === ADD ===
                  variants={slideLeft}       // === ADD ===
                  initial="hidden"            // === ADD ===
                  whileInView="visible"       // === ADD ===
                  viewport={{ once: true, margin: isMobile ? "-60px" : "-120px" }} // === ADD ===
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => openViewer(idx)}
                >
                  <SharedImage
                    src={src}
                    style={{ width: "100%", display: "block", borderRadius: 8 }}
                  />
                </Box>
              ))}
            </Box>

            {/* RIGHT COLUMN */}
            <Box sx={{ flex: 0.63, display: "flex", flexDirection: "column", gap: 2 }}>
              {COLLECTION_RIGHT.map((src, idx) => (
                <Box
                  key={src + idx}
                  component={motion.div}     // === ADD ===
                  variants={slideRight}      // === ADD ===
                  initial="hidden"            // === ADD ===
                  whileInView="visible"       // === ADD ===
                  viewport={{ once: true, margin: "-120px" }} // === ADD ===
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 8,
                    display: "block",
                    cursor: "pointer",
                  }}
                  onClick={() => openViewer(COLLECTION_LEFT.length + idx)}
                >
                  <SharedImage
                    src={src}
                    style={{ width: "100%", display: "block", borderRadius: 8 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Button
            variant="text"
            onClick={() => setOpen(true)}
            sx={{
              mt: { xs: 2, sm: 4 },
              fontSize: { xs: 18, sm: "1.5rem" },
              flexDirection: "column",
              px: 2,
            }}
            color="secondary"
          >
            XEM THÊM
            <ExpandMore fontSize={isMobile ? "medium" : "large"} />
          </Button>
        </Box>

        {/* POPUP – GIỮ NGUYÊN */}
        <Dialog fullScreen open={open} onClose={closeViewer}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: 'center',
              position: "relative",
            }}
          >
            {/* Close */}
            <IconButton
              onClick={closeViewer}
              sx={{ position: "absolute", top: 20, right: 20, color: "#fff", zIndex: 20 }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>

            {/* Left arrow */}
            <IconButton
              onClick={prev}
              sx={{
                position: "absolute",
                left: 20,
                color: "#fff",
                background: "rgba(0,0,0,0.3)",
                zIndex: 20,
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* Image */}
            <SharedImage
              src={allImages[current]}
              alt="preview"
              variant="contain"
              width="90vw"
              height="80vh"
              radius={10}
              shadow={false}
              border={false}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                margin: "0 auto",
                marginTop: '-100px'
              }}
            />


            {/* Right arrow */}
            <IconButton
              onClick={next}
              sx={{
                position: "absolute",
                right: 20,
                color: "#fff",
                background: "rgba(0,0,0,0.3)",
                zIndex: 20,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* === PREVIEW THUMBNAILS === */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                width: "95%",
                background: "rgba(15,15,15,0.6)",
                p: 1.5,
                borderRadius: 2,
                overflowX: "auto",
                display: "flex",
                gap: 1.5,
                zIndex: 30,
                backdropFilter: "blur(6px)",
              }}
            >
              {allImages.map((src, index) => {
                const active = index === current;

                return (
                  <Box
                    key={src + index}
                    ref={(el) => {
                      thumbRefs.current[index] = el as HTMLDivElement | null;
                    }}
                    sx={{
                      width: 80,
                      height: 60,
                      flexShrink: 0,
                      cursor: "pointer",
                      borderRadius: 1,
                      border: active ? "2px solid #fff" : "2px solid transparent",
                      overflow: "hidden",
                      transition: "0.2s",
                      opacity: active ? 1 : 0.7,
                      "&:hover": { opacity: 1 },
                    }}
                    onClick={() => setCurrent(index)}
                  >
                    <SharedImage
                      src={src}
                      width={80}
                      height={60}
                      variant="cover"
                      radius={4}
                      loadingPlaceholder={null} // tắt skeleton cho thumbnail
                      style={{
                        display: "block",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CollectionSection;
