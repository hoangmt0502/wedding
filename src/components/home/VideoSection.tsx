import { Box, IconButton, Typography } from "@mui/material";
import ImageWrapper from "./ImageWrapper";
import PrimaryButton from "../button/PrimaryButton";
import { PlayCircleOutline } from "@mui/icons-material";

export default function VideoSection() {
  return (
    <ImageWrapper src="https://tuart.net/wp-content/uploads/2022/01/270284502_1589108414821889_2158477857562109361_n.jpg" opacity={0.4} height={700} isCompactWidth>
      <Box width={'100%'} height={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            color: "#fff",
            px: 2,
            mt: 30
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 600,
              mb: 1,
            }}
          >
            Xem video cưới của chúng tôi!
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              maxWidth: "700px",
              mx: "auto",
              opacity: 0.9,
              mb: 3,
            }}
          >
            Hạnh phúc không ồn ào. Hạnh phúc là khi có người nắm tay mình đi qua mọi ngày.
          </Typography>

          <IconButton
            onClick={() => {}}
            sx={{
              width: 140,
              height: 140,
              color: "#ff6e6e",
              transition: "0.25s",
              "&:hover": {
                transform: "scale(1.08)",
                color: "#ff8a8a",
              },
            }}
          >
            <PlayCircleOutline sx={{ fontSize: 140 }} />
          </IconButton>
        </Box>
      </Box>
    </ImageWrapper>
  )
}