import { Box, Typography } from "@mui/material";
import ImageWrapper from "./ImageWrapper";
import PrimaryButton from "../button/PrimaryButton";

export default function TopSection() {
  return (
    <ImageWrapper src="https://bellabridal.vn/public/upload/files/343342550_5955920044504242_5222768225392896037_n.jpg">
      <Box width={'100%'} height={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'flex-end'}>
        <Box mb={4}>
          <Typography
            variant="h1" // Kích thước chữ lớn, bạn có thể điều chỉnh
            sx={{
              fontFamily: "'Fleur De Leah', cursive", // Áp dụng font chữ đã nhúng
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '8rem' }, // Kích thước responsive
              color: '#F0E68C', // Màu vàng nhạt tương tự trong ảnh (hoặc dùng #FAD7A0, #FFE4B5)
              fontWeight: 800, // Độ đậm của chữ (nếu font có hỗ trợ)
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)', // Thêm bóng mờ cho chữ để nổi bật
              lineHeight: 1.2, // Khoảng cách dòng
            }}
          >
            Happy wedding
          </Typography>
          <Typography
          variant="h4"
          sx={{
            fontFamily: "'Dancing Script', cursive", // Dùng lại font hoặc một font khác thanh lịch
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            color: 'white', // Màu trắng cho tên
            marginTop: 2,
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
          }}
        >
          Minh Hoàng & Khánh Huyền
        </Typography>
  
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            marginTop: 1,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          13/01/2026 Nhà Gái - 15/01/2026 Nhà Trai
        </Typography>
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200, // Giới hạn chiều rộng
            mt: 3,
            // Dùng flex để sắp xếp 3 nút
            display: 'flex',
            justifyContent: 'space-around', // Khoảng cách đều giữa các nút
            padding: '0 20px',
          }}
        >
          {/* 1. Gửi lời chúc */}
          <PrimaryButton
            iconType="heart"
            label="Gửi lời chúc"
            onClick={() => {}}
          />
          
          {/* 2. Sự kiện cưới (Không icon trong ảnh, dùng icon sự kiện mặc định) */}
          <PrimaryButton
            iconType="event" // Icon sự kiện để làm ví dụ
            label="Sự kiện cưới"
            onClick={() => {}}
          />
          
          {/* 3. Mừng cưới */}
          <PrimaryButton
            iconType="gift"
            label="Mừng cưới"
            onClick={() => {}}
          />
        </Box>
        </Box>
      </Box>
    </ImageWrapper>
  )
}