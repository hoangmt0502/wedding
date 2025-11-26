import { useEffect, useState } from "react";
import { Box, Typography, Fade } from "@mui/material";

export default function InvitationCover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const loop = setInterval(() => {
      setStage(prev => (prev === 2 ? 0 : (prev + 1) as 0 | 1 | 2));
    }, 500); // thời gian đổi frame (điều chỉnh được)

    return () => clearInterval(loop);
  }, []);

  return (
    <>
      {!open && (
        <Box
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            inset: 0,
            overflowY: "auto",
            background: "#faf6f2",
            textAlign: "center",
            fontFamily: "serif",
            cursor: "pointer",
            zIndex: 99999,
            px: 2,
          }}
        >

          {/* ===== HEADER ===== */}
          <Typography sx={{ mt: 4, fontSize: 14, letterSpacing: 8, opacity: 0.7 }}>
            W E D D I N G &nbsp; I N V I T A T I O N
          </Typography>

          <Typography
            sx={{
              fontSize: 22,
              mt: 2,
              mb: 5,
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
              Mai Anh
            </Typography>
            <Typography sx={{ fontSize: 34, opacity: 0.6 }}>&</Typography>
            <Typography sx={{ fontFamily: "'Great Vibes',cursive", fontSize: 42, color: "#443" }}>
              Quốc Huy
            </Typography>
          </Box>

          {/* SONG HỶ */}
          <Box
            sx={{
              width: 70,
              height: 70,
              mx: "auto",
              mt: 2.5,
              background: "url('/images/song_hi.png') center/contain no-repeat",
              opacity: 0.95,
            }}
          />

          {/* ===== ENVELOPE (ĐỎ) ===== */}
          <Box sx={{ mt: 4, pb: 6 }}>
            <Box
              sx={{
                width: 350,
                aspectRatio: "1.48/1",
                background: "url('/images/envelope.png') center/contain no-repeat",
                borderRadius: "6px",
                transition: "transform 1.4s ease, filter .8s ease, box-shadow 1.4s ease",

                // === 3 FRAME giống hình bạn đưa ===
                transform:
                  stage === 0 ? "translateY(0px)" :
                  stage === 1 ? "translateY(-14px)" :
                                "translateY(-28px)",

                boxShadow:
                  stage === 0 ? "0 25px 45px rgba(0,0,0,.20)" :
                  stage === 1 ? "0 32px 65px rgba(0,0,0,.28)" :
                                "0 45px 85px rgba(0,0,0,.38)",

                filter:
                  stage === 2 ? "brightness(.95)" :
                  stage === 1 ? "brightness(.98)" :
                                "brightness(1)",
              }}
            />
          </Box>

          {/* ===== CLICK LABEL ===== */}
          <Typography
            sx={{
              mt: 6,
              mb: 3,
              fontSize: 18,
              opacity: 0.65,
              fontStyle: "italic",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            Chạm để mở thiệp
          </Typography>
        </Box>
      )}

      {/* ─── PAGE HIỂN THỊ SAU KHI MỞ ─── */}
      <Fade in={open} timeout={1600}>
        <Box
          sx={{
            animation: "fadePage 1s ease forwards",
          }}
        >
          {children}
        </Box>
      </Fade>

      <style>{`
        @keyframes fadePage {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
