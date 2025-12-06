import { Box, Button, Typography } from "@mui/material";
import { CalendarMonth, AccessTime, PlaceOutlined } from "@mui/icons-material";
import { useContentWidth } from "../../hooks/useContentWidth";
import SharedImage from "../SharedImage";
import { idPage, MAIN_COLOR } from "../../constants/common";
import { scrollToSection } from "../../utils/common";

type TEvent = {
  id: string;
  title: string;
  time: string;
  placeLabel: string;
  address: string;
  image: string;
  primaryBtn: string;
  secondaryBtn: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const openCalendar = (event: TEvent) => {
  const text = event.title;
  const details = `${event.placeLabel} - ${event.address}`;
  const location = event.address;

  const start = "20260601T080000";
  const end = "20260601T100000";

  const link = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    text
  )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    location
  )}&dates=${start}/${end}`;

  window.open(link, "_blank");
};

const EVENTS: TEvent[] = [
  {
    id: "bride-party",
    title: "Tiệc Cưới Nhà Gái",
    time: "11h00 Thứ 3, ngày 13/01/2026",
    placeLabel: "TTTM Himlam Plaza",
    address: "Đường Trần Đăng Ninh, Phường Điện Biên Phủ, Điện Biên",
    image:
      "https://images.pexels.com/photos/4644406/pexels-photo-4644406.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Thêm vào lịch",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/G1MjgcMdq8SkBski8',
      "_blank"
    ),
    onSecondaryClick: () =>
      openCalendar({
        id: "bride-party",
        title: "Tiệc Cưới Nhà Gái",
        time: "",
        placeLabel: "",
        address: "TTTM Himlam Plaza: Đường Trần Đăng Ninh, Phường Điện Biên Phủ, Điện Biên",
        image: "",
        primaryBtn: "",
        secondaryBtn: "",
      }),
  },

  {
    id: "le-vu-quy",
    title: "Lễ Vu Quy",
    time: "10h00 Thứ 3, ngày 13/01/2026",
    placeLabel: "Tư gia nhà Gái",
    address: "Ngõ 175 - Tổ 6 Đường Sùng Phái Sinh, Phường Điện Biên Phủ, Điện Biên",
    image:
      "https://images.pexels.com/photos/3843326/pexels-photo-3843326.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Mừng cưới",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/vZ8EQJJL7TFHXUw36',
      "_blank"
    ),
    onSecondaryClick: () => scrollToSection(idPage.gift),
  },

  {
    id: "groom-party",
    title: "Tiệc Cưới Nhà Trai",
    time: "11h00 Chủ Nhật, ngày 02/06/2026",
    placeLabel: "Nhà văn hóa tổ 14, Đức Giang",
    address: "Số 72 ngõ 638 Ngô Gia Tự, Đức Giang, Long Biên, Hà Nội",
    image:
      "https://images.pexels.com/photos/3843326/pexels-photo-3843326.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Thêm vào lịch",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/pNfmtcPFxmA5torUA',
      "_blank"
    ),
    onSecondaryClick: () =>
      openCalendar({
        id: "groom-party",
        title: "Tiệc Cưới Nhà Trai",
        time: "",
        placeLabel: "",
        address: "Số 72 ngõ 638 Ngô Gia Tự, Đức Giang, Long Biên, Hà Nội",
        image: "",
        primaryBtn: "",
        secondaryBtn: "",
      }),
  },

  {
    id: "le-thanh-hon",
    title: "Lễ Thành Hôn",
    time: "10h30 Chủ Nhật, ngày 02/06/2026",
    placeLabel: "Nhà văn hóa tổ 14, Đức Giang",
    address: "Số 72 ngõ 638 Ngô Gia Tự, Đức Giang, Long Biên, Hà Nội",
    image:
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg",
    primaryBtn: "Xem chỉ đường",
    secondaryBtn: "Mừng cưới",

    onPrimaryClick: () => window.open(
      'https://maps.app.goo.gl/pNfmtcPFxmA5torUA',
      "_blank"
    ),
    onSecondaryClick: () => scrollToSection(idPage.gift),
  },
];

const EventCard = ({ event }: { event: TEvent }) => {

  return (
    <Box
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

        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: 3,
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(212,182,122,1), rgba(148,110,45,1))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          pointerEvents: "none",
        },
      }}
    >
      {/* WRAPPER chứa ảnh + sparkle */}
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: 16,
          width: 220,
          height: 140,
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 6px 26px rgba(0,0,0,0.35)",
          // SPARKLE GLIMMER ✨ gắn vào wrapper, không phải img
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: 2,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)",
            animation: "sparkle 2.6s infinite ease-in-out",
            pointerEvents: "none",
          },
        }}
      >
        <Box
          component="img"
          src={event.image}
          alt={event.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* KEYFRAMES (đặt 1 lần là đủ, dùng chung) */}
      <style>
        {`
          @keyframes sparkle {
            0%   { opacity: 0;   transform: translate(-10px, -10px) scale(0.8); }
            50%  { opacity: 0.5; transform: translate(10px, 10px)   scale(1.1); }
            100% { opacity: 0;   transform: translate(-10px, -10px) scale(0.8); }
          }
        `}
      </style>

      {/* Title */}
      <Typography
        sx={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          fontSize: 24,
          color: MAIN_COLOR,
          mb: 1.5,
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textAlign: "left",
        }}
      >
        {event.title}
      </Typography>

      {/* Time */}
      <Box display="flex" alignItems="flex-start" mb={1}>
        <AccessTime sx={{ fontSize: 18, mt: "2px", mr: 1, color: "#474747" }} />
        <Typography sx={{ fontSize: 14, lineHeight: 1.5, textAlign: 'left' }}>
          {event.time}
        </Typography>
      </Box>

      {/* Place */}
      <Box display="flex" alignItems="flex-start" mb={2}>
        <PlaceOutlined sx={{ fontSize: 18, mt: "2px", mr: 1, color: "#474747" }} />
        <Box>
          <Typography sx={{ fontSize: 14, textAlign: 'left' }}>{event.placeLabel}</Typography>
          <Typography sx={{ fontSize: 14, textAlign: 'left' }}>{event.address}</Typography>
        </Box>
      </Box>

      {/* Buttons */}
      <Box display="flex" justifyContent="space-between" gap={2} mt="auto">
        {[event.primaryBtn, event.secondaryBtn].map((btn, idx) => (
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
              "&:hover": {
                borderColor: "rgba(212,182,122,1)",
                backgroundColor: "#fff",
              },
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

export default function EventSection() {
  const { compactWidth } = useContentWidth();

  return (
    <Box
      id={idPage.event}
      sx={{
        width: "100%",
        py: 8,
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
        {/* Icon lịch */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "2px solid #444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <CalendarMonth sx={{ fontSize: 30, color: "#444" }} />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 40,
            fontWeight: 600,
            color: MAIN_COLOR,
          }}
        >
          Sự Kiện Cưới
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            mt: 1,
            fontSize: 16,
            color: "#555",
            mb: 14,
          }}
        >
          Hân hạnh đón tiếp Quý khách!
        </Typography>

        {/* Grid 2x2 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 12,
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
