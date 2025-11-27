import { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import moment, { Moment } from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface WeddingEvent {
  label: string;
  date: string;       // YYYY-MM-DD HH:mm
  lunar?: string;     // Optional: ngày âm lịch
  highlightDay: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const events: WeddingEvent[] = [
  {
    label: "LỊCH CƯỚI NHÀ CHÚ RỂ",
    date: "2026-09-22 11:00",
    lunar: "12/08 Bính Ngọ",
    highlightDay: 22,
  },
  {
    label: "LỊCH CƯỚI NHÀ CÔ DÂU",
    date: "2026-09-25 17:00",
    lunar: "15/08 Bính Ngọ",
    highlightDay: 25,
  }
];

const EventSection = () => {
  const [selected, setSelected] = useState<number>(0);

  const wedding: WeddingEvent = events[selected];
  const weddingDate: Moment = moment(wedding.date, "YYYY-MM-DD HH:mm");

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [selected]);

  function getTimeLeft(): TimeRemaining {
    const now = moment();
    const diff = moment.duration(weddingDate.diff(now));
    return {
      days: Math.floor(diff.asDays()),
      hours: diff.hours(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
    };
  }

  // Calendar build
  const year = weddingDate.year();
  const month = weddingDate.month();
  const startOfMonth = moment([year, month, 1]);
  const daysInMonth = startOfMonth.daysInMonth();
  const firstWeekday = startOfMonth.day();

  const calendarDays: (number | null)[] = [];
  const empty = firstWeekday === 0 ? 6 : firstWeekday - 1;
  for (let i = 0; i < empty; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <Box textAlign="center" py={8}>

      {/* ==== NÚT CHỌN LỊCH NHÀ TRAI / NHÀ GÁI ==== */}
      <Box display="flex" justifyContent="center" gap={4} mb={6}>
        {events.map((e, i) => (
          <Paper
            key={i}
            onClick={() => setSelected(i)}
            sx={{
              p: 2, px: 6, fontWeight: 600, cursor: "pointer",
              bgcolor: selected === i ? "#E7D3A5" : "#F6E7CC",
              transition: "0.25s",
              border: selected === i ? "2px solid #B68A43" : "2px solid transparent",
            }}
          >
            {e.label}
          </Paper>
        ))}
      </Box>

      <FavoriteIcon sx={{ fontSize: 46, color: "#b46a6a", mb: 1 }} />

      <Typography variant="h5" fontWeight={700} mb={3}>
        Tháng {month + 1} / {year}
      </Typography>

      {/* ==== CALENDAR ==== */}
      <Grid container spacing={1} sx={{ maxWidth: 600, mx: "auto" }}>
        {["Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7","CN"].map(d => (
          <Grid item xs={12/7} key={d}><Typography fontWeight={600}>{d}</Typography></Grid>
        ))}

        {calendarDays.map((d, idx) => (
          <Grid item xs={12/7} key={idx} textAlign="center" sx={{ py: 2 }}>
            {d ? (
              <Box
                sx={{
                  width: 34, height: 34, mx:"auto",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  borderRadius:"50%",
                  color: d === wedding.highlightDay ? "red" : "inherit",
                  fontWeight: d === wedding.highlightDay ? 700 : 400,
                  position:"relative"
                }}
              >
                {d}
                {d === wedding.highlightDay && (
                  <FavoriteIcon sx={{ position:"absolute", bottom:-15, fontSize:22, color:"red" }} />
                )}
              </Box>
            ) : <Box sx={{ width:34, height:34, mx:"auto" }} />}
          </Grid>
        ))}
      </Grid>

      {/* ==== THÔNG TIN SỰ KIỆN ==== */}
      <Typography mt={5} fontSize={20}>
        {moment(wedding.date).format("HH:mm")} - {moment(wedding.date).format("DD/MM/YYYY")}
      </Typography>
      {wedding.lunar && (
        <Typography sx={{opacity: 0.7}} mb={4}>
          (Tức ngày {wedding.lunar})
        </Typography>
      )}

      {/* ==== ĐẾM NGƯỢC ==== */}
      <Box display="flex" justifyContent="center" gap={6}>
        <TimeBlock label="Ngày" value={timeLeft.days}/>
        <TimeBlock label="Giờ" value={timeLeft.hours}/>
        <TimeBlock label="Phút" value={timeLeft.minutes}/>
        <TimeBlock label="Giây" value={timeLeft.seconds}/>
      </Box>

    </Box>
  );
};

export default EventSection;


interface TimeBlockProps { label: string; value: number; }
const TimeBlock = ({ label, value }: TimeBlockProps) => (
  <Box textAlign="center">
    <Typography fontSize={42} fontWeight={700}>{value}</Typography>
    <Typography sx={{opacity: 0.7}}>{label}</Typography>
  </Box>
);
