import { Box, Typography } from "@mui/material";
import ImageWrapper from "./ImageWrapper";
import { useResponsive } from "../../hooks/useResponsive";

export default function EndingSection() {
  const {isMobile} = useResponsive();
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
        <Typography
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: {xs: 40, sm: "52px"},
            fontWeight: 600,
            margin: 0,
          }}
        >
          Thank You!
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: {xs: 26, sm: "34px"},
            margin: 0,
          }}
        >
          Minh Hoàng & Khánh Huyền
        </Typography>

        <Box sx={{ fontSize: "28px" }}>❤️❤️❤️</Box>

        <Typography
          style={{
            fontSize: "18px",
            maxWidth: "780px",
            opacity: 0.9,
            lineHeight: 1.6,
            whiteSpace: 'pre-line'
          }}
        >
          {'Cảm ơn bạn đã dành thời gian ghé thăm thiệp cưới online của chúng mình.\nSự hiện diện của bạn trong ngày trọng đại là niềm hạnh phúc to lớn.'}
        </Typography>
      </Box>
    </ImageWrapper>
  )
}