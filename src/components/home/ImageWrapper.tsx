import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function ImageWrapper({src, children} : {src: string; children: ReactNode}) {
  const backgroundImageUrl = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${src}')`; 
  //                              ^----- Lớp phủ đen mờ (0.4 là độ trong suốt 40%)
  return (
    <Box 
      sx={{
        backgroundImage: `url('${src}')`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        width: '100%',
        height: 850,
        display: 'flex', 
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: 'fill', 
        backgroundPosition: 'center',
        width: 1200,
        height: '100%',
        // boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1), -4px 0 10px rgba(0, 0, 0, 0.1)'
      }}
      >
        {children}
      </Box>
    </Box>
  )
}