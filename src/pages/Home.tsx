import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box mt={2} mb={1}>
      <Stack flexDirection={{xs: 'column', md: "row"}} gap={3}>
        <Stack flex={0.7} gap={3}>
          <Typography>Gửi vợ</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
