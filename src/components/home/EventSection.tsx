import { Box, Button, Typography } from "@mui/material";
import { CalendarMonth, AccessTime, PlaceOutlined } from "@mui/icons-material";
import { useContentWidth } from "../../hooks/useContentWidth";
import { EVENTS, idPage, MAIN_COLOR } from "../../constants/common";
import { scrollToSection } from "../../utils/common";
import { motion } from "framer-motion";

/* ================= EVENT CARD ================= */

const EventCard = ({ event }: any) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-160px" }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      sx={{
        position: "relative",
        width: { xs: "100%", md: "46%" },
        minHeight: 220,
        background: "linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%)",
        borderRadius: 3,
        border: "1px solid rgba(212,182,122,0.6)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
        px: 3,
        pt: 4,
        pb: 2.5,
        color: "#404040",
      }}
    >
      {/* ===== IMAGE (GIỮ NGUYÊN) ===== */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: -44, sm: -70 },
          right: { xs: 8, sm: 16 },
          width: { xs: "42%", sm: 220 },
          height: { xs: 80, sm: 140 },
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 6px 26px rgba(0,0,0,0.35)",
        }}
      >
        <Box
          component="img"
          src={event.image}
          alt={event.title}
          sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: event?.imagePosition }}
        />
      </Box>

      {/* ===== TITLE ===== */}
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          fontSize: 24,
          color: MAIN_COLOR,
          mb: 1.5,
          textDecoration: "underline",
          textAlign: "left",
        }}
      >
        {event.title}
      </Typography>

      {/* ===== TIME ===== */}
      <Box display="flex" alignItems="flex-start" mb={1}>
        <AccessTime sx={{ fontSize: 18, mt: "2px", mr: 1 }} />
        <Typography sx={{ fontSize: 14 }}>{event.time}</Typography>
      </Box>

      {/* ===== PLACE ===== */}
      <Box display="flex" alignItems="flex-start" mb={2}>
        <PlaceOutlined sx={{ fontSize: 18, mt: "2px", mr: 1 }} />
        <Box>
          <Typography sx={{ fontSize: 14, textAlign: 'left' }}>{event.placeLabel}</Typography>
          <Typography sx={{ fontSize: 14, textAlign: 'left' }}>{event.address}</Typography>
        </Box>
      </Box>

      {/* ===== BUTTONS ===== */}
      <Box display="flex" justifyContent="space-between" gap={2}>
        {[event.primaryBtn, event.secondaryBtn].map((btn: string, idx: number) => (
          <Button
            key={idx}
            variant="contained"
            disableElevation
            sx={{
              flex: 1,
              backgroundColor: "#fff",
              border: "1px solid rgba(212,182,122,0.6)",
              fontSize: 13,
              fontWeight: 500,
              textTransform: "none",
              color: "#5c5c5c",
            }}
            onClick={idx === 0 ? event.onPrimaryClick : event.onSecondaryClick}
          >
            {btn}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

/* ================= SECTION ================= */

export default function EventSection() {
  const { compactWidth } = useContentWidth();

  return (
    <Box
      id={idPage.event}
      sx={{
        width: "100%",
        pb: 8,
        pt: { xs: 4, sm: 8 },
        background: "linear-gradient(180deg, #ffffff 0%, #f8f5ee 100%)",
      }}
    >
      <Box
        width={compactWidth}
        mx="auto"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* ===== HEADER ===== */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-160px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
        >
          <Box
            sx={{
              width: { xs: 46, sm: 60 },
              height: { xs: 46, sm: 60 },
              borderRadius: "50%",
              border: "2px solid #444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: { xs: 1, sm: 2 },
            }}
          >
            <CalendarMonth sx={{ fontSize: { xs: 24, sm: 30 }, color: "#444" }} />
          </Box>

          <Typography
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: { xs: 32, sm: 40 },
              fontWeight: 600,
              color: MAIN_COLOR,
            }}
          >
            Sự Kiện Cưới
          </Typography>

          <Typography sx={{ mt: 1, fontSize: 16, color: "#555" }}>
            Hân hạnh đón tiếp Quý khách!
          </Typography>
        </Box>

        {/* ===== GRID ===== */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 12,
            mt: { xs: 12, sm: 14 },
            px: { xs: 1, sm: 0 },
          }}
        >
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
