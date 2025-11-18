import { Box, Stack, Typography } from "@mui/material";
import WeddingFallingImages from "../components/WeddingFallingImages";
import { IMAGE_DOVE, LIST_IMAGES_FALLING } from "../constants/common";

export default function Home() {
  return (
      <Box mt={2} mb={1}>
        <Stack flexDirection={{xs: 'column', md: "row"}} gap={3}>
          <Stack flex={0.7} gap={3}>
            <Typography>Gửi vợ</Typography>
          </Stack>
        </Stack>
        <WeddingFallingImages
          images={LIST_IMAGES_FALLING}
          doveImage={IMAGE_DOVE}
          musicUrl="/audio/song.mp3"     // optional, để sync bass
          enableGlitter={true}
          enableFireworks={false}       // khuyên: bật sparingly (burst gây đông)
          enableDoves={true}
          enableBokeh={true}
          enableSync={true}
          slowMotion={false}
          zIndex={9999}
        />


      </Box>
  );
}
