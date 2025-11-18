import { Box, Stack, Typography } from "@mui/material";
import WeddingFallingImages from "../components/WeddingFallingImages";

export default function Home() {
  return (
      <Box mt={2} mb={1}>
        <Stack flexDirection={{xs: 'column', md: "row"}} gap={3}>
          <Stack flex={0.7} gap={3}>
            <Typography>Gửi vợ</Typography>
          </Stack>
        </Stack>
        <WeddingFallingImages
          images={[
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABGUlEQVRYR+2W0Q3CMAxFf5IiiaBqiKBqCCoYoGogqCGoIoGogqCGoI9kTJ2vnfuQTxmqbz3WYpKDcRzCA1pQcDqQmNfVCeGj6cqrVnB0n0lL5DHa+zJXfV8k5ofwUvQaSgAqfHkD8pM2HtYeQGPmCkABZ6s0vraOpiwdj87Qk+JxgA8aXzYyOKgJZB0s3h7HkPpA6dHZqGUxAHg+2gAAqKJsrlfwiOUImyAx6jTEtVJALzXXbF3Bno3HnbJdkGXz5wNi0lB8Z2oULGbcHgj0x9Fclo7E5BdTRbYoR5MD5gdp6J3NJCf0oVqkXPpUOo7W/5HtwjSddWJdcUFHGm+VxArWRkmM8JmfK0f8WWW8mZUuI/6gAAAABJRU5ErkJggg==",
            "/images/autumn_leaves_PNG3602.png",
            "/images/dove.png",
            "/images/flower.png",
            "/images/heart_PNG51315.png",
            "/images/heart_PNG51342.png",
            "/images/sparkle.png",
          ]}
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
