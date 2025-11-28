import { Box, Typography, Container } from "@mui/material";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";
import { MAIN_COLOR } from "../../constants/common";

export default function IntroSection() {
  const {compactWidth} = useContentWidth();
  return (
    <Box
      sx={{
        width: "100%",
        py: 4,
        backgroundColor: 'rgb(248, 246, 246)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box width={compactWidth} mx={'auto'} display={'flex'} flexDirection={'column'} alignItems={'center'}>

        <SharedImage src="/images/logo.png" width={160} style={{marginBottom: 32}}/>
        
        {/* --- TITLE --- */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
            mb: 3,
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: 1,
            color: MAIN_COLOR
          }}
        >
          LỜI NGỎ
        </Typography>

        {/* --- DESCRIPTION TEXT --- */}
        <Typography
          sx={{
            fontSize: 18,
            color: "#555",
            lineHeight: 1.8,
            px: { xs: 2, md: 20 },
            whiteSpace: "pre-line",
          }}
        >
          Cảm ơn bạn đã dành tình cảm cho vợ chồng mình. Chúng mình biết các bạn đều đang rất bận, bận với công việc, với cuộc sống và với cả gia đình bạn.
          {"\n"}{"\n"}
          Nhưng thực sự sẽ rất tuyệt vời nếu như ngày Hạnh Phúc của chúng mình có thêm sự góp mặt của bạn và người thương. 
          Vợ chồng mình rất hi vọng sẽ có mặt bạn trong ngày quan trọng này để chứng kiến và chia sẻ niềm hạnh phúc này cùng chúng mình.
          {"\n"}{"\n"}
          Một lần nữa, chân thành cảm ơn tất cả các bạn 💗
        </Typography>

        {/* --- IMAGE --- */}
        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src="https://daknong.1cdn.vn/2025/07/25/1(1).jpg" // đổi ảnh sau nếu muốn
            alt="wedding"
            sx={{
              width: "80%",
              borderRadius: 2,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
