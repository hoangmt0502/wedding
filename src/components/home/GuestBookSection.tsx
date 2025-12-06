import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { GOOGLE_SCRIPT_URL, idPage, suggestions } from "../../constants/common";

export default function GuestBookSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 🎁 Random
  const randomSuggest = () => {
    const r = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMessage(r.message);
  };

  // 🧨 Confetti + Heart Animation
  const runConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // <-- FIX 1

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // <-- FIX 2

    const particles: Array<{
      x: number;
      y: number;
      color: string;
      radius: number;
      vx: number;
      vy: number;
      gravity: number;
    }> = [];

    canvas.width = window.innerWidth;
    canvas.height = 400;

    for (let i = 0; i < 28; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        color: ["#ff92a5", "#ffc0cb", "#fde2e4", "#ffbacf"][Math.floor(Math.random() * 4)],
        radius: Math.random() * 6 + 4,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * -4 - 2,
        gravity: 0.15,
      });
    }

    function draw() {
      // giải pháp check ctx 1 lần là đủ
      if (!ctx) return;
      if (!canvas) return; // <-- FIX 1

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    setTimeout(() => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 2000);
  };

  // ⏳ Ẩn warning tự động
  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => setWarning(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  // 📨 Gửi Google Sheets
  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      setWarning("Vui lòng nhập tên và lời chúc!");
      return;
    }

    setWarning(null);
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      // ----------------------------
      // SUCCESS EFFECTS 🚀💖
      // ----------------------------
      setSuccess(true); // Toast success
      runConfetti();   // Tim - confetti
      setName("");
      setMessage("");
    } catch {
      setWarning("Gửi thất bại, vui lòng thử lại!");
    }

    setLoading(false);
  };

  // 💬 UI
  return (
    <Box id={idPage.guestBook} sx={{ width: "100%", py: 10, background: "#f7f5f5", position: "relative" }}>
      {/* Canvas Hearts / Confetti */}
      <canvas
        ref={canvasRef}
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Toast */}
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}   // 👈 Đặt dưới
        ContentProps={{
          sx: {
            background: "linear-gradient(135deg, #ff9ab6 0%, #ffc8d8 100%)", // 🌸 pastel hồng
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(255, 140, 170, 0.4)",
            px: 3,
            py: 1.6,
            textAlign: "center",
          },
        }}
        message="💖 Đã gửi lời chúc! Cảm ơn bạn rất nhiều!"
      />

      {/* Header */}
      <Box textAlign="center">
        <FavoriteBorderOutlinedIcon sx={{ fontSize: 48, color: "#b28a9a", mb: 2 }} />

        <Typography
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 46,
            fontWeight: 600,
            color: "#b28a9a",
          }}
        >
          Sổ Lưu Bút
        </Typography>

        <Typography sx={{ maxWidth: 580, mx: "auto", mt: 2, mb: 8, fontSize: 18, color: "#7b6c75" }}>
          Hãy để lại lời chúc dành cho chúng mình nhé 💗
        </Typography>
      </Box>

      {/* Main */}
      <Box
        sx={{
          maxWidth: 980,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          px: 2,
        }}
      >
        {/* FORM */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 3, background: "#fff", border: "1px solid #eee" }}>
          {warning && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: 2, fontSize: 14 }}>
              {warning}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Tên của bạn *"
            size="small"
            sx={{ mb: 3 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Lời chúc của bạn *"
            size="small"
            multiline
            minRows={5}
            sx={{ mb: 4 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            sx={{
              borderRadius: 999,
              py: 1.4,
              fontSize: 15,
              textTransform: "none",
              background: loading ? "#cbb8c1" : "#b28a9a",
              "&:hover": { background: loading ? "#cbb8c1" : "#9a7386" },
            }}
          >
            {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Gửi lời chúc"}
          </Button>
        </Paper>

        {/* Suggest */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 3, background: "#fff", border: "1px solid #eee" }}>
          <Button
            onClick={randomSuggest}
            fullWidth
            sx={{
              mb: 3,
              borderRadius: 999,
              border: "1px solid #b28a9a",
              textTransform: "none",
              color: "#b28a9a",
              fontSize: 14,
              "&:hover": { background: "rgba(178,138,154,0.1)" },
            }}
          >
            🎁 Gợi ý ngẫu nhiên
          </Button>

          <Box sx={{overflowY: 'auto'}} height={300}>
            {suggestions.map((s, i) => (
              <Box key={i} sx={{ mb: 3, textAlign: 'left' }}>
                <Typography sx={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
                  {s.message}
                </Typography>
  
                <Button
                  size="small"
                  onClick={() => setMessage(s.message)}
                  sx={{
                    textTransform: "none",
                    color: "#b28a9a",
                    fontSize: 12,
                    mt: 1,
                  }}
                >
                  📌 Dùng lời chúc này
                </Button>
  
                {i < suggestions.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
