import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Snackbar,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { idPage, GOOGLE_SCRIPT_URL } from "../../constants/common";
import { Variants, motion } from "framer-motion";

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"yes" | "no" | "">("");

  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ================= ANIMATION ================= */

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!name.trim() || !status) {
      setWarning("Vui lòng nhập tên và xác nhận tham dự!");
      return;
    }

    setWarning(null);
    setLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          rsvp: status === "yes" ? "Tham dự" : "Không tham dự",
        }),
      });

      setSuccess(true);
      setName("");
      setStatus("");
    } catch {
      setWarning("Gửi thất bại, vui lòng thử lại!");
    }

    setLoading(false);
  };

  /* ================= UI ================= */

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 4, md: 10 },
        px: { xs: 1, md: 0 },
        background: "linear-gradient(180deg,#fff,#f7f5f5)",
      }}
    >
      {/* Toast */}
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          sx: {
            background: "linear-gradient(135deg, #ff9ab6 0%, #ffc8d8 100%)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(255,140,170,0.4)",
            px: 3,
            py: 1.6,
          },
        }}
        message="💖 Cảm ơn bạn đã phản hồi!"
      />

      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Box textAlign="center">
          <FavoriteBorderOutlinedIcon
            sx={{ fontSize: 48, color: "#b28a9a", mb: 1 }}
          />

          <Typography
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: { xs: 32, sm: 46 },
              fontWeight: 600,
              color: "#b28a9a",
            }}
          >
            Xác Nhận Tham Dự
          </Typography>

          <Typography
            sx={{
              maxWidth: 520,
              mx: "auto",
              mt: 1,
              mb: { xs: 4, md: 8 },
              fontSize: { xs: 16, sm: 18 },
              color: "#7b6c75",
            }}
          >
            Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng mình 💗
          </Typography>
        </Box>
      </motion.div>

      {/* Form */}
      <Box maxWidth={520} mx="auto">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: "#fff",
              border: "1px solid #eee",
            }}
          >
            {warning && (
              <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
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

            <RadioGroup
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Tôi sẽ tham dự 💐"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="Xin phép không tham dự 🌿"
              />
            </RadioGroup>

            <motion.div
              animate={loading ? { scale: [1, 0.97, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: loading ? Infinity : 0 }}
            >
              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={handleSubmit}
                sx={{
                  mt: 3,
                  borderRadius: 999,
                  py: 1.4,
                  fontSize: 15,
                  textTransform: "none",
                  background: loading ? "#cbb8c1" : "#b28a9a",
                  "&:hover": {
                    background: loading ? "#cbb8c1" : "#9a7386",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={22} sx={{ color: "#fff" }} />
                ) : (
                  "Gửi xác nhận"
                )}
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}
