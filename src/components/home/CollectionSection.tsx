import React, { useState } from "react";
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

const allImages = [...COLLECTION_LEFT, ...COLLECTION_RIGHT];

const CollectionSection = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const {compactWidth, mainWidth} = useContentWidth();

  const openViewer = (index: number) => {
    setCurrent(index);
    setOpen(true);
  };

  const closeViewer = () => setOpen(false);

  const next = () =>
    setCurrent((prev) => (prev + 1) % allImages.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <Box sx={{py: 6, backgroundColor: '#f5f3f3ff'}}>
      <Box sx={{ width: compactWidth, mx: 'auto' }}>
        <Stack alignItems={'center'} mb={4}><SharedImage src="/images/logo.png" width={160}/></Stack>
        <Typography
          variant="h5"
          sx={{ mb: 4, fontWeight: 600, letterSpacing: 1, color: MAIN_COLOR, fontSize: '2.2rem' }}
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
                style={{
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
  
        <Button variant="text" onClick={() => setOpen(true)} sx={{ mt: 4, fontSize: '1.5rem', flexDirection: 'column', px: 2 }} color="secondary">
          XEM THÊM
          <ExpandMore fontSize="large" />
        </Button>
  
        {/* POPUP */}
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
                    key={src}
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
