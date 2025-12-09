import { useEffect, useState } from "react";
import { Box, Typography, Fade } from "@mui/material";

export default function InvitationCover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => setT(v => v + 1), 18); // tốc độ nhịp (điều chỉnh được)
    return () => clearInterval(loop);
  }, []);

  // 🔥 Disable scroll sau khi mở thiệp
  useEffect(() => {
    document.body.style.overflow = !open ? "hidden" : "auto";
    window.scrollTo({ top: 0, behavior: "instant" }); // về đầu trang ngay
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  // chuyển động dạng sóng mềm
  const offset = Math.sin(t / 18) * 12;   // biên độ + độ mềm (càng lớn càng nhún nhiều)
  const shadow = Math.sin(t / 18) * 20;   // bóng thay đổi tương ứng

  return (
    <>
      {!open && (
        <Box
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            inset: 0,
            overflowY: "auto",
            // background: "#faf6f2",
            background: "url('/images/bg_welcome.png') center/contain repeat",
            // backgroundSize: 'cover',
            textAlign: "center",
            fontFamily: "serif",
            cursor: "pointer",
            zIndex: 99999,
            px: 2,
          }}
        >

          {/* ===== HEADER ===== */}
          <Typography sx={{ mt: 4, fontSize: 14, letterSpacing: {xs: 3, sm: 8}, opacity: 0.7 }}>
            W E D D I N G &nbsp; I N V I T A T I O N
          </Typography>

          <Typography
            sx={{
              fontSize: 22,
              mt: 2,
              mb: 3,
              color: "#6b3a36",
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            THIỆP MỜI CƯỚI
          </Typography>

          {/* ===== NAME PAIR ===== */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, alignItems: "center" }}>
            <Typography sx={{ fontFamily: "'Great Vibes',cursive", fontSize: 42, color: "#443" }}>
              Minh Hoàng
            </Typography>
            <Typography sx={{ fontSize: 34, opacity: 0.6 }}>&</Typography>
            <Typography sx={{ fontFamily: "'Great Vibes',cursive", fontSize: 42, color: "#443" }}>
              Khánh Huyền
            </Typography>
          </Box>

          {/* SONG HỶ */}
          <Box
            sx={{
              width: 160,
              height: 160,
              mx: "auto",
              mt: 2,
              background: "url('/images/song_hi.png') center/contain no-repeat",
              opacity: 0.95,
            }}
          />

          {/* ===== ENVELOPE ===== */}
          <Box sx={{mt: -6, position: "relative", display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: 600,
                aspectRatio: "1.48/1",
                background: "url('/images/envelope.png') center/contain no-repeat",
                borderRadius: "6px",
                transform: `translateY(${offset}px)`,
                transition: "transform 0.4s ease-out",
              }}
            />

            {/* BÓNG MỊN – NHỊP THEO CHUYỂN ĐỘNG */}
            <Box
              sx={{
                width: 400,
                height: 30,
                position: "absolute",
                bottom: -24,
                left: "50%",
                borderRadius: "50%",
                filter: "blur(10px)",
                opacity: 0.5,
                background: "rgba(0,0,0,.38)",
                transformOrigin: "center",
                transform: `translateX(-50%) scale(${1 + shadow / 90})`, // <<< FIX CHÍNH
                transition: "transform 0.4s ease-out",
              }}
            />
          </Box>

          {/* ===== CLICK LABEL ===== */}
          <Typography
            sx={{
              fontSize: 20,
              opacity: 0.85,
              fontStyle: "italic",
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 700,
              mt: -1
            }}
          >
            Chạm để mở thiệp
          </Typography>
        </Box>
      )}

      {/* ─ PAGE SAU KHI MỞ — Chỉ fade, không scale ─ */}
      {open && <Fade in={open} timeout={1600}>
        <Box sx={{ animation:"fadeOnly 1s ease forwards" }}>
          {children}
        </Box>
      </Fade>}

      <style>{`
        @keyframes fadeOnly {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>
    </>
  );
}
