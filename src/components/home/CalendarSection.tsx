import { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import moment, { Moment } from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";

// ==== PULSE HEART ANIMATION ====
const PulseHeart = styled(FavoriteIcon)`
  color: #e63946;
  animation: pulse 1.4s infinite ease-in-out;

  @keyframes pulse {
    0%   { transform: scale(1);   opacity: 0.9; }
    50%  { transform: scale(1.32); opacity: 1; }
    100% { transform: scale(1);   opacity: 0.9; }
  }
`;

// ==== DATA 2 LỊCH ====
const events = [
  {
    label: "💍 Lịch cưới nhà chú rể",
    date: "2026-01-15 17:00",
    lunar: "27/11/2025",
    highlightDay: 15,
  },
  {
    label: "🌸 Lịch cưới nhà cô dâu",
    date: "2026-01-13 11:00",
    lunar: "25/11/2025",
    highlightDay: 13,
  },
] as const;

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EventSection = () => {
  const [selected, setSelected] = useState(0);
  const event = events[selected];

  const date: Moment = moment(event.date, "YYYY-MM-DD HH:mm");
  const [timeLeft, setLeft] = useState(getTime());

  useEffect(() => {
    const i = setInterval(() => setLeft(getTime()), 1000);
    return () => clearInterval(i);
  }, [selected]);

  function getTime(): TimeRemaining {
    const now = moment();
    const diff = moment.duration(date.diff(now));

    return {
      days: Math.floor(diff.asDays()),
      hours: diff.hours(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
    };
  }

  // === BUILD CALENDAR ===
  const year = date.year();
  const month = date.month();
  const start = moment([year, month, 1]);
  const totalDays = start.daysInMonth();
  const firstWeekday = start.day();
  const empty = firstWeekday === 0 ? 6 : firstWeekday - 1;

  const days:(number|null)[] = [];
  for (let i=0;i<empty;i++) days.push(null);
  for (let i=1;i<=totalDays;i++) days.push(i);

  return (
    <Box
      textAlign="center"
      sx={{
        background: "linear-gradient(180deg,#fffaf1,#f8e9c5)",
        // background:"#fff7e0",
      }}
    >
      <Box py={6}>
      {/* ===== 2 BUTTON TABS ===== */}
        <Box display="flex" justifyContent="center" gap={4} mb={7}>
          {events.map((e,i)=>(
            <Paper key={i} onClick={()=>setSelected(i)}
              sx={{
                p:2, px:6, cursor:"pointer", fontWeight:600, borderRadius:3,
                bgcolor: selected===i ? "#f8e6ba" : "#faead0",
                border:selected===i?"3px solid #c49b45":"2px solid #e7d9b1",
                boxShadow:selected===i?"0 5px 18px rgba(180,140,40,.55)":
                                    "0 4px 10px rgba(180,140,40,.25)",
                transform:selected===i?"scale(1.07)":"scale(1)",
                transition:"0.3s",
                "&:hover":{transform:"scale(1.1)"}
              }}
            >
              {e.label}
            </Paper>
          ))}
        </Box>

        {/* ===== SHINY HEART ===== */}
        <PulseHeart sx={{ fontSize:60, mb:1 }}/>

        <Typography variant="h4" fontWeight={700} mb={3}
          sx={{fontFamily:"'Playfair Display', serif"}}>
          Tháng {month+1} / {year}
        </Typography>

        {/* ===== CALENDAR ===== */}
        <Grid container spacing={1} sx={{maxWidth:650,mx:"auto"}}>
          {["Th2","Th3","Th4","Th5","Th6","Th7","CN"].map(d=>(
            <Grid xs={12/7} key={d}><Typography fontWeight={700}>{d}</Typography></Grid>
          ))}

          {days.map((d,i)=>(
            <Grid xs={12/7} key={i} textAlign="center" sx={{py:2}}>
              {d ? (
                <Box sx={{
                  width:40,height:40,borderRadius:"50%",mx:"auto",
                  display:"flex",justifyContent:"center",alignItems:"center",
                  fontWeight:d===event.highlightDay?700:400,
                  color:d===event.highlightDay?"#d41c28":"#5f5f5f",
                  background:d===event.highlightDay?
                  "linear-gradient(135deg,#fff1d6,#ffe5a9)":"transparent",
                  boxShadow:d===event.highlightDay?
                  "0 0 12px rgba(255,215,120,.9)":"none",
                  border:d===event.highlightDay?"2px solid #d1a34b":"none",
                  transition:"0.25s"
                }}>
                  {d}
                </Box>
              ): <Box sx={{height:40}}/>}
            </Grid>
          ))}
        </Grid>

        {/* ===== EVENT INFO ===== */}
        <Typography mt={5} fontSize={22} fontWeight={600}>
          {moment(event.date).format("HH:mm")} - {moment(event.date).format("DD/MM/YYYY")}
        </Typography>
        <Typography sx={{opacity: 0.7}} mb={5}>
          (Âm lịch: {event.lunar})
        </Typography>

        {/* ===== COUNTDOWN ===== */}
        <Countdown value={timeLeft.days} label="Ngày"/>
        <Countdown value={timeLeft.hours} label="Giờ"/>
        <Countdown value={timeLeft.minutes} label="Phút"/>
        <Countdown value={timeLeft.seconds} label="Giây"/>
      </Box>
    </Box>
  );
};

export default EventSection;


// ==== SUB COMPONENT COUNTDOWN ====
const Countdown = ({value,label}:{value:number,label:string})=>(
  <Box display="inline-block" mx={2} textAlign="center"
    sx={{
      p:3,px:4,borderRadius:4,fontWeight:700,minWidth:100,
      background:"linear-gradient(145deg, #fff4dc, #fee6b2)",
      border:"2px solid #d7b06c",
      boxShadow:"0 6px 18px rgba(160,115,50,.45)",
      fontSize:34,
      mt:1, mb:4
    }}>
    {value}
    <Typography fontSize={14} mt={1}>{label}</Typography>
  </Box>
);
