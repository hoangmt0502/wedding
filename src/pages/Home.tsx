import { Box, Stack, Typography } from "@mui/material";
import WeddingFallingImages from "../components/WeddingFallingImages";
import { IMAGE_DOVE, LIST_IMAGES_FALLING } from "../constants/common";
import TopSection from "../components/home/TopSection";

export default function Home() {
  return (
    <>
      <Box>
        <TopSection />
      </Box>
      <WeddingFallingImages
        images={LIST_IMAGES_FALLING}
        doveImage={IMAGE_DOVE}
        musicUrl="/audio/ngay_dau_tien.mp3"     // optional, để sync bass
        enableGlitter={true}
        enableFireworks={false}       // khuyên: bật sparingly (burst gây đông)
        enableDoves={true}
        enableBokeh={true}
        enableSync={true}
        slowMotion={false}
        zIndex={9999}
      />
    </>
  );
}
