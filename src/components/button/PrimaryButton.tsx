import { Button, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite'; // Icon trái tim
import EventIcon from '@mui/icons-material/Event'; // Icon sự kiện (ví dụ)
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'; // Icon mừng cưới/quà (ví dụ)

// Dùng type cho props để code dễ quản lý hơn
interface PrimaryButtonProps {
  iconType: 'heart' | 'event' | 'gift'; // Loại icon để chọn
  label: string;
  onClick: () => void;
}

const iconMap = {
  heart: <FavoriteIcon sx={{ color: 'red', marginRight: 1 }} />,
  event: <EventIcon sx={{ color: 'black', marginRight: 1 }} />,
  gift: <CardGiftcardIcon sx={{ color: '#E42C44', marginRight: 1 }} />, // Màu đỏ/hồng cho mừng cưới
};

export default function PrimaryButton({ iconType, label, onClick }: PrimaryButtonProps) {
  return (
    <Button
      onClick={onClick}
      // Dùng variant="contained" (hoặc "text") và chỉnh màu bằng sx
      variant="contained"
      sx={{
        // STYLE CƠ BẢN CỦA BUTTON
        // Nền trắng
        backgroundColor: 'white', 
        // Bo tròn góc (như trong ảnh, có thể là 1 hoặc 2)
        borderRadius: 1, 
        // Vị trí icon và text (dùng flex mặc định của Button)
        display: 'flex', 
        alignItems: 'center',
        
        // STYLE BÓNG ĐỔ (giống trong ảnh, tạo cảm giác hơi nổi)
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        
        // STYLE CHỮ
        color: 'black', // Màu chữ
        textTransform: 'none', // Bỏ chế độ viết hoa mặc định của MUI Button
        padding: '10px 20px', // Điều chỉnh padding
        
        // Hiệu ứng hover (tùy chọn)
        '&:hover': {
          backgroundColor: '#f0f0f0', // Nền hơi xám khi hover
          boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15), 0 3px 5px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      {/* Icon */}
      {iconMap[iconType]}
      
      {/* Text */}
      <Typography variant="body1" sx={{ fontWeight: 400 }}>
        {label}
      </Typography>
    </Button>
  );
}