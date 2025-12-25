import { Box, Grid, Paper, Typography, Card, CardMedia } from "@mui/material";
import SharedImage from "../SharedImage";
import { useContentWidth } from "../../hooks/useContentWidth";
import { useResponsive } from "../../hooks/useResponsive";

// === ADD ===
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

export default function StorySection() {
  const { compactWidth } = useContentWidth();
  const { isMobile, isTablet } = useResponsive();
  // === ADD ===
  const imageRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(imageRef, { margin: "-120px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [isInView, controls]);


  // === ADD animation config ===
  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 50 : 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUpDelay = (delay: number): Variants => ({
    hidden: {
      opacity: 0,
      y: isMobile ? 20 : 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f7f7f7",
        py: { xs: 3, md: 6 },
        px: { xs: 0, md: 2 },
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          width: { xs: '96%', xl: compactWidth },
          px: { xs: 0, md: 4 }
        }}
      >
        {/* LEFT: STORY */}
        <Grid item xs={12} md={5}>
          {/* === ADD motion wrapper === */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px"  }}
          >
            <Paper
              elevation={4}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                bgcolor: "white",
                height: { xs: 'unset', md: 680 }
              }}
            >
              {/* Decor icon */}
              <Box sx={{ display: 'flex', justifyContent: "center", mb: 2 }}>
                <SharedImage 
                  src="/images/story_icon.png" 
                  alt="decor" 
                  width={100}
                  height={50 }
                  variant="cover" 
                />
              </Box>

              <Typography
                variant={'h6'}
                align="center"
                sx={{
                  fontFamily: "serif",
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 2,
                }}
              >
                CHUYỆN CHÚNG MÌNH
              </Typography>

              <Typography sx={{ color: "text.secondary", lineHeight: {xs: 1.5, sm: 1.8}, whiteSpace: 'pre-line' }} fontSize={{xs: 15, sm: 16}} textAlign={'justify'}>
                {"Chúng mình gặp nhau tại một câu lạc bộ cầu lông – nơi mọi thứ bắt đầu thật tình cờ và giản dị. Trong một buổi liên hoan nhỏ của câu lạc bộ, Hoàng và Huyền có dịp trò chuyện, làm quen với nhau bằng những câu chuyện rất đời thường. Không ai nghĩ rằng, từ cuộc gặp gỡ ấy, hai trái tim lại dần tìm thấy sự đồng điệu.\nNhững buổi đánh cầu cùng nhau sau đó trở thành những khoảnh khắc đáng nhớ. Qua từng lần gặp gỡ, từng tin nhắn hỏi han, từng câu chuyện tâm sự về những điều nhỏ bé trong cuộc sống, khoảng cách giữa chúng mình dần được rút ngắn. Sự quan tâm đến nhau đến thật tự nhiên, nhẹ nhàng như một thói quen lúc nào không hay.\nKhông cần những lời hứa lớn lao, tình yêu của chúng mình được vun đắp từ sự chân thành, lắng nghe và sẻ chia. Và rồi, từ những điều bình dị ấy, chúng mình đã chọn nắm tay nhau, cùng bước tiếp trên hành trình mang tên hạnh phúc."}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        {/* RIGHT: IMAGE GALLERY */}
        <Grid item xs={12} md={7}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: { xs: 400, sm: 760, md: 680 }, py: { xs: 2, md: 3 }, position: 'relative' }}>

            {/* Large top image */}
            {/* === ADD motion wrapper === */}
            <motion.div
              variants={fadeUpDelay(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px"  }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 4,
                  border: '10px solid #fff',
                  height: { xs: 240, sm: 380 }
                }}
              >
                <CardMedia
                  component="img"
                  height={isMobile ? "240" : "380"}
                  image="/collections/web/HLE08843.jpg"
                  alt="wedding"
                  sx={{ objectFit: "cover", borderRadius: 2 }}
                />
              </Card>
            </motion.div>

            {/* Bottom 2 images */}
            <Grid ref={imageRef} container spacing={{ xs: 2, sm: 4 }} px={2.5} position={'absolute'} top={!isTablet ? '47%' : "43%"}>

              <Grid item xs={6}>
                {/* === ADD motion wrapper (LEFT → RIGHT) === */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? -50 : -100 }}
                  animate={controls}
                  transition={{
                    duration: isMobile ? 0.5 : 0.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card sx={{ borderRadius: 2, border: '10px solid #fff', boxShadow: 4 }}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "200" : !isTablet ? "320" : "400"}
                      image="/collections/web/HLE09021.jpg"
                      alt="wedding"
                      sx={{ objectFit: "cover", borderRadius: 2, objectPosition: 'center' }}
                    />
                  </Card>
                </motion.div>
              </Grid>

              <Grid item xs={6}>
                {/* === ADD motion wrapper (RIGHT → LEFT) === */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 50 : 100 }}
                  animate={controls}
                  transition={{
                    duration: isMobile ? 0.5 : 0.8,
                    delay: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card sx={{ borderRadius: 2, border: '10px solid #fff', boxShadow: 4 }}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "200" : !isTablet ? "320" : "400"}
                      image="/collections/web/HLE09186.jpg"
                      alt="wedding"
                      sx={{ objectFit: "cover", borderRadius: 2, objectPosition: 'center' }}
                    />
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
