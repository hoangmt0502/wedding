import { Box, Typography, Container } from "@mui/material";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";
import { MAIN_COLOR } from "../../constants/common";
import { useResponsive } from "../../hooks/useResponsive";

// === ADD ===
import { motion, Variants } from "framer-motion";

export default function IntroSection() {
  const {compactWidth} = useContentWidth();
  const {isMobile} = useResponsive();

  /* ================= ANIMATION CONFIG ================= */

  const fadeFar: Variants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 60 : 120,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeFarDelay = (delay: number): Variants => ({
    hidden: {
      opacity: 0,
      y: isMobile ? 50 : 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  });

  const fadeScaleSlow: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.6,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* ==================================================== */

  return (
    <Box
      component={motion.div}
      variants={fadeFar}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-160px" }}
      sx={{
        width: "100%",
        py: 4,
        backgroundColor: 'rgb(248, 246, 246)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        width={compactWidth}
        mx={'auto'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >

        {/* --- LOGO --- */}
        <motion.div
          variants={fadeScaleSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-160px" }}
        >
          <SharedImage
            src="/images/logo.png"
            width={isMobile ? 120 : 160}
            style={{marginBottom: isMobile ? 8 : 32}}
          />
        </motion.div>

        {/* --- TITLE --- */}
        <motion.div
          variants={fadeFarDelay(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-160px" }}
        >
          <Typography
            variant={isMobile ? 'h4' : "h3"}
            sx={{
              fontWeight: 500,
              mb: {xs: 1, sm: 3},
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: 1,
              color: MAIN_COLOR
            }}
          >
            LỜI NGỎ
          </Typography>
        </motion.div>

        {/* --- DESCRIPTION TEXT --- */}
        <motion.div
          variants={fadeFarDelay(0.35)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-160px" }}
        >
          <Typography
            sx={{
              fontSize: {xs: 16, sm: 18},
              color: "#555",
              lineHeight: {xs: 1.6, sm: 1.8},
              px: { xs: 1, md: 20 },
              whiteSpace: "pre-line",
              textAlign: {xs: 'justify', sm: 'center'},
            }}
          >
            Hành trình yêu thương của chúng mình sẽ trọn vẹn hơn rất nhiều khi có sự hiện diện của bạn – những người thân yêu và trân quý.
            {"\n"}{"\n"}
            Giữa những bộn bề của cuộc sống, sự sắp xếp thời gian và tấm lòng mà bạn dành cho vợ chồng mình luôn là điều vô cùng đáng quý.
            {"\n"}{"\n"}
            Chúng mình mong rằng trong ngày Hạnh Phúc sắp tới, sẽ được đón bạn đến chung vui, chứng kiến khoảnh khắc ý nghĩa này và cùng chúng mình lưu giữ thêm những kỷ niệm thật đẹp.
            {"\n"}{"\n"}
            Chân thành cảm ơn và hẹn gặp bạn trong ngày trọng đại 💗
          </Typography>
        </motion.div>

        {/* --- IMAGE --- */}
        <motion.div
          variants={fadeScaleSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-160px" }}
        >
          <Box
            sx={{
              mt: {xs: 2, sm: 6},
              px: {xs: 1, sm: 0},
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Box
              component="img"
              src="/images/introImage.png"
              alt="wedding"
              sx={{
                width: {xs: "100%", sm: "80%"},
                borderRadius: 2,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
                objectFit: "cover",
              }}
            />
          </Box>
        </motion.div>

      </Box>
    </Box>
  );
}
