import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useContentWidth } from "../../hooks/useContentWidth";

export default function ImageWrapper({
  src, 
  children, 
  isCompactWidth = false, 
  height = 850,
  opacity = 0.1
} : {
  src: string; 
  children: ReactNode; 
  isCompactWidth?: boolean; 
  height?: number | string;
  opacity?: number;
}) {
  const {mainWidth, compactWidth} = useContentWidth();
  const backgroundImageUrl = `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), url('${src}')`; 
  return (
    <Box 
      sx={{
        backgroundImage: `url('${src}')`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: height,
        display: 'flex', 
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: isCompactWidth ? compactWidth : mainWidth,
        height: '100%',
      }}
      >
        {children}
      </Box>
    </Box>
  )
}