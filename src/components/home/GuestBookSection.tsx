import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

type TMessage = {
  name: string;
  message: string;
};

export default function GuestBookSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<TMessage[]>([
    {
      name: "CEO meHappy",
      message:
        "Chúc hai bạn bắt đầu hành trình hôn nhân với trọn vẹn yêu thương, để mỗi ngày bên nhau đều là một ngày cưới.",
    },
    {
      name: "meWedding",
      message:
        "Tình yêu đẹp không chỉ nằm ở khoảnh khắc gặp nhau, mà ở chặng đường cùng nhau đi qua. Chúc hai bạn một đời hạnh phúc.",
    },
    {
      name: "Người lạ",
      message:
        "Ngày cưới là điểm bắt đầu, hạnh phúc mới là đích đến. Chúc hai bạn luôn tìm thấy niềm vui trên hành trình này.",
    },
  ]);
  
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwWyvbmNr3X82JqQLsYG7wiPCbldrSS0jNlhBe7Og5xUwdVzC5outiXPFaCDijs4LM4/exec";

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return;

    const payload = { name, message };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setMessages([{ name, message }, ...messages]);
    setName("");
    setMessage("");
  };


  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        background: "#f7f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* --- ICON + TITLE --- */}
      <FavoriteBorderOutlinedIcon
        sx={{
          fontSize: 48,
          color: "#b28a9a",
          mb: 2,
        }}
      />

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

      <Typography
        sx={{
          maxWidth: 600,
          fontSize: 18,
          color: "#7b6c75",
          mt: 2,
          mb: 8,
          lineHeight: 1.6,
        }}
      >
        Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng
        tốt đẹp nhất đến đám cưới của chúng tôi!
      </Typography>

      {/* --- 2 COLUMN LAYOUT --- */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* FORM */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            background: "#fff",
            border: "1px solid #eee",
          }}
        >
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 4 }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 999,
              py: 1.4,
              fontSize: 15,
              textTransform: "none",
              background: "#b28a9a",
              "&:hover": { background: "#9a7386" },
            }}
            onClick={handleSubmit}
          >
            Gửi lời chúc cho Dâu Rể
          </Button>
        </Paper>

        {/* MESSAGES LIST */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            background: "#fff",
            border: "1px solid #eee",
            maxHeight: 360,
            overflowY: "auto",
            textAlign: "left",
          }}
        >
          {messages.map((m, i) => (
            <Box key={i} sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#333",
                  mb: 0.5,
                }}
              >
                {m.name}
              </Typography>
              <Typography sx={{ fontSize: 14, lineHeight: 1.6, color: "#666" }}>
                {m.message}
              </Typography>
              {i < messages.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}
