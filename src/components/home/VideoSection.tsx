import { useState } from "react";
import { Box, IconButton, Typography, Dialog } from "@mui/material";
import ImageWrapper from "./ImageWrapper";
import { PlayCircleOutline } from "@mui/icons-material";
import ReactPlayer from "react-player";

export default function VideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ImageWrapper
        src="https://tuart.net/wp-content/uploads/2022/01/270284502_1589108414821889_2158477857562109361_n.jpg"
        opacity={0.4}
        height={700}
        isCompactWidth
      >
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box textAlign="center" color="#fff" mt={30} px={2}>

            <Typography sx={{ fontSize:{xs:"2rem", md:"3rem"}, fontFamily:"'Fleur De Leah', cursive", fontWeight:600, mb:1 }}>
              Xem video cưới của chúng tôi!
            </Typography>

            <Typography sx={{ fontSize:{xs:"1rem", md:"1.2rem"}, maxWidth:700, mx:"auto", opacity:.9, mb:3 }}>
              Hạnh phúc không ồn ào. Hạnh phúc là khi có người nắm tay mình đi qua mọi ngày.
            </Typography>

            <IconButton onClick={()=>setOpen(true)} sx={{width:140, height:140, color:"#ff6e6e", "&:hover":{transform:"scale(1.08)", color:"#ff8a8a"}}}>
              <PlayCircleOutline sx={{ fontSize:140 }} />
            </IconButton>
          </Box>
        </Box>
      </ImageWrapper>

      {/* Modal Video */}
      <Dialog open={open} onClose={()=>setOpen(false)} maxWidth="lg" fullWidth PaperProps={{ sx:{background:"transparent", boxShadow:"none"} }}>
        <Box p={2}>
          <ReactPlayer
            src="https://www.youtube.com/watch?v=lY2yjAdbvdQ"
            playing={open}
            controls
            width="100%"
            height="70vh"
            style={{ borderRadius:12, overflow:"hidden" }}
          />
        </Box>
      </Dialog>
    </>
  );
}
