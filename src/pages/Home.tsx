import { Box, Stack, Typography } from "@mui/material";
import WeddingFallingImages from "../components/WeddingFallingImages";
import { LIST_IMAGES_FALLING } from "../constants/common";

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
          doveImage="/img/dove.png"
          musicUrl="/audio/song.mp3"     // optional, để sync bass
          enableGlitter={true}
          enableFireworks={true}
          enableDoves={true}
          enableBokeh={true}
          enableSync={true}
        />


      </Box>
  );
}
