import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export type TQRInfo = {
  title: string;
  qr: string;
  bank: string;
  account: string;
  owner: string;
};

export default function GiftQRModal({
  open,
  onClose,
  groom,
  bride,
}: {
  open: boolean;
  onClose: () => void;
  groom: TQRInfo;
  bride: TQRInfo;
}) {
  const [tab, setTab] = useState(0);

  const current = tab === 0 ? groom : bride;

  const copySTK = () => {
    navigator.clipboard.writeText(current.account);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          animation: "fadeZoom .35s ease",
        },
      }}
    >
      <style>
        {`
        @keyframes fadeZoom {
          0% { opacity: 0; transform: scale(.8) }
          100% { opacity: 1; transform: scale(1) }
        }
      `}
      </style>

      <DialogContent
        sx={{
          p: 2,
          background: "linear-gradient(180deg,#fff, #fbfaf4)",
          position: "relative",
        }}
      >
        {/* Close icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Box textAlign="center" pt={4}>
          <Typography
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 34,
              fontWeight: 600,
              color: "#c49a47",
              mb: 1,
            }}
          >
            Mừng cưới
          </Typography>

          <Typography sx={{ fontSize: 14, color: "#666", mb: 2 }}>
            Chân thành cảm ơn tình cảm của bạn dành cho chúng mình 🥰
          </Typography>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            centered
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: 15,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                px: 4,
              },
              "& .Mui-selected": {
                color: "#c49a47 !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#c49a47",
              },
            }}
          >
            <Tab label="Nhà Trai" />
            <Tab label="Nhà Gái" />
          </Tabs>
        </Box>

        {/* QR CARD */}
        <Box textAlign="center" p={3}>
          <Box
            sx={{
              display: "inline-block",
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(212,182,122,1), rgba(148,110,45,1))",
              p: "1px",
              mb: 3,
            }}
          >
            <Box
              component="img"
              src={current.qr}
              sx={{
                width: 240,
                borderRadius: 3,
                background: "#fff",
                boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
              }}
            />
          </Box>

          <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 0.5 }}>
            {current.owner}
          </Typography>

          <Typography sx={{ fontSize: 14, mb: 3 }}>
            STK: <b>{current.account}</b> — {current.bank}
          </Typography>

          {/* Copy STK ONLY */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              borderColor: "#c49a47",
              color: "#c49a47",
              fontWeight: 500,
              "&:hover": {
                borderColor: "#a78335",
                background: "rgba(212,182,122,0.1)",
              },
            }}
            onClick={copySTK}
          >
            Copy STK
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
