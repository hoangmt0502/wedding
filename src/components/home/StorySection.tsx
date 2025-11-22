import { Box, Grid, Paper, Typography, Card, CardMedia } from "@mui/material";
import SharedImage from "../SharedImage";
import { useContentWidth } from "../../hooks/useContentWidth";

export default function StorySection() {
  const {compactWidth} = useContentWidth();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f7f7f7",
        py: 6,
        px: 2,
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          width: compactWidth,
          px: 4
        }}
      >
        {/* LEFT: STORY */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: "white",
              height: 680
            }}
          >
            {/* Decor icon */}
            <Box sx={{ display: 'flex', justifyContent: "center", mb: 2 }}>
              <SharedImage src="/images/story_icon.png" alt="decor" width={150} height={80} variant="cover"/>
            </Box>

            <Typography
              variant="h5"
              align="center"
              sx={{
                fontFamily: "serif",
                fontWeight: 600,
                letterSpacing: 2,
                mb: 3,
              }}
            >
              CHUYỆN CHÚNG MÌNH
            </Typography>

            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
              Chúng mình quen nhau khi cùng làm việc ở công ty. Thịnh là cấp
              trên, Hằng là cấp dưới. Thường xuyên phải tương tác với nhau, nên
              cứ thế phát sinh tình cảm khi nào chả hay...
            </Typography>
          </Paper>
        </Grid>

        {/* RIGHT: IMAGE GALLERY */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: 680, py: 3, position: 'relative' }}>
            {/* Large top image */}
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 4,
                border: '10px solid #fff',
                height: 380
              }}
            >
              <CardMedia
                component="img"
                height="380"
                image="https://daknong.1cdn.vn/2025/07/25/1(1).jpg"
                alt="wedding"
                sx={{ objectFit: "cover", borderRadius: 2 }}
              />
            </Card>

            {/* Bottom 2 images */}
            <Grid container spacing={4} px={2.5} position={'absolute'} top={'47%'}>
              <Grid item xs={6}>
                <Card sx={{ borderRadius: 2, border: '10px solid #fff', boxShadow: 4 }}>
                  <CardMedia
                    component="img"
                    height="320"
                    image="https://product.hstatic.net/200000054678/product/6_70ec2e65e933400c87271b223c275173.png"
                    alt="wedding"
                    sx={{ objectFit: "cover", borderRadius: 2 }}
                  />
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ borderRadius: 2, border: '10px solid #fff', boxShadow: 4 }}>
                  <CardMedia
                    component="img"
                    height="320"
                    image="https://mimosawedding.vn/wp-content/uploads/2023/08/phong-chup-anh-cuoi-2.jpg"
                    alt="wedding"
                    sx={{ objectFit: "cover", borderRadius: 2 }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
