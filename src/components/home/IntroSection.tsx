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
            Cảm ơn bạn đã dành tình cảm cho vợ chồng mình. Chúng mình biết các bạn đều đang rất bận, bận với công việc, với cuộc sống và với cả gia đình bạn.
            {"\n"}{"\n"}
            Nhưng thực sự sẽ rất tuyệt vời nếu như ngày Hạnh Phúc của chúng mình có thêm sự góp mặt của bạn và người thương. 
            Vợ chồng mình rất hi vọng sẽ có mặt bạn trong ngày quan trọng này để chứng kiến và chia sẻ niềm hạnh phúc này cùng chúng mình.
            {"\n"}{"\n"}
            Một lần nữa, chân thành cảm ơn tất cả các bạn 💗
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
              src="https://daknong.1cdn.vn/2025/07/25/1(1).jpg"
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
