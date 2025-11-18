import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Avatar,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CalendarToday,
  AccessTime,
} from "@mui/icons-material";
import moment from "moment";

const MOTHS = [
  { value: 1, label: "Tháng 1" },
  { value: 2, label: "Tháng 2" },
  { value: 3, label: "Tháng 3" },
  { value: 4, label: "Tháng 4" },
  { value: 5, label: "Tháng 5" },
  { value: 6, label: "Tháng 6" },
  { value: 7, label: "Tháng 7" },
  { value: 8, label: "Tháng 8" },
  { value: 9, label: "Tháng 9" },
  { value: 10, label: "Tháng 10" },
  { value: 11, label: "Tháng 11" },
  { value: 12, label: "Tháng 12" },
];

const events = [
  {
    date: "2025-06-03",
    title: "Panel Discussion",
    subtitle: "Tech Beyond 2024",
    type: "Technology",
    time: "10:00 AM – 12:00 PM",
  },
  {
    date: "2025-06-05",
    title: "Live Concert",
    subtitle: "Echo Beats Festival",
    type: "Music",
    time: "6:00 PM – 11:00 PM",
  },
  {
    date: "2025-06-23",
    title: "Fashion Showcase",
    subtitle: "Spring Trends Runway Show",
    type: "Fashion",
    time: "3:00 PM – 5:00 PM",
    color: "#6366f1",
  },
  {
    date: "2025-06-23",
    title: "Fashion Showcase",
    subtitle: "Spring Trends Runway Show",
    type: "Fashion",
    time: "3:00 PM – 5:00 PM",
  },
];

export default function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(moment(new Date()));
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));
  const eventRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentYear = moment().year();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const handleMonthChange = (monthIndex: number) => {
    const newDate = currentMonth.clone().month(monthIndex);
    setCurrentMonth(newDate);
  };

  const handleYearChange = (year: number) => {
    const newDate = currentMonth.clone().year(year);
    setCurrentMonth(newDate);
  };

  const prevMonth = () =>
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  const nextMonth = () =>
    setCurrentMonth((prev) => prev.clone().add(1, "month"));

  useEffect(() => {
    const found = events.find((ev) =>
      moment(ev.date).isSame(selectedDate, "day")
    );
    if (found) {
      const el = eventRefs.current[found.date];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedDate]);

  const generateCalendar = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();

    const days: React.ReactNode[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<Box key={`empty-${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = currentMonth.clone().date(d);
      const hasEvent = events.some((ev) => moment(ev.date).isSame(date, "day"));
      const isSelected = date.isSame(selectedDate, "day");

      days.push(
        <Box
          key={d}
          onClick={() => setSelectedDate(date)}
          sx={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            cursor: "pointer",
            bgcolor: isSelected ? "primary.main" : "transparent",
            color: isSelected ? "white" : "inherit",
            fontWeight: isSelected ? "bold" : "normal",
            position: "relative",
          }}
        >
          {d}
          {hasEvent && (
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "primary.main",
                position: "absolute",
                bottom: 0,
              }}
            />
          )}
        </Box>
      );
    }

    return days;
  };

  const renderEvents = () =>
    events
      .filter((ev) => moment(ev.date).isSame(selectedDate, "day") || true)
      .map((event, index) => {
        const date = moment(event.date);
        return (
          <Paper
            key={index}
            sx={{
              display: "flex",
              p: 2,
              mt: 2,
              backgroundColor: selectedDate.isSame(date, "day")
                ? "primary.secondColor"
                : "background.default",
              alignItems: "center",
            }}
            ref={(el) => {
              eventRefs.current[event.date] = el;
            }}
          >
            <Stack
              sx={{
                mr: 2,
                width: 48,
                height: 60,
                backgroundColor: selectedDate.isSame(date, "day")
                  ? "primary.main"
                  : "secondary.main",
                py: 0.5,
                borderRadius: 2,
                justifyContent: "space-around",
              }}
            >
              <Typography color="#fff">{date.date()}</Typography>
              <Typography color="#fff" sx={{ fontSize: "0.75rem" }}>
                {weekdays[date.day()]}
              </Typography>
            </Stack>
            <Stack justifyContent={"space-between"} flex={1}>
              <Box>
                <Typography textAlign={"start"} fontWeight="bold">
                  {event.title}
                </Typography>
                <Typography
                  textAlign={"start"}
                  variant="body2"
                  color="text.secondary"
                >
                  {event.subtitle}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
                  <CalendarToday sx={{ fontSize: 12 }} />
                  <Typography sx={{ fontSize: 12 }}>{event.type}</Typography>
                </Stack>
                <Stack flexDirection={"row"} gap={0.5} alignItems={"center"}>
                  <AccessTime sx={{ fontSize: 12 }} />
                  <Typography sx={{ fontSize: 12 }}>{event.time}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        );
      });

  return (
    <Box>
      <Box
        flex={1}
        gap={2}
        p={2}
        borderRadius={3}
        bgcolor="background.default"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.05)"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" gap={1}>
            <Select
              size="small"
              value={currentMonth.month()}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              sx={{ width: 120 }}
            >
              {MOTHS.map((month, idx) => (
                <MenuItem key={month.value} value={idx}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
            <Select
              size="small"
              value={currentMonth.year()}
              onChange={(e) => handleYearChange(Number(e.target.value))}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <IconButton onClick={prevMonth}>
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton onClick={nextMonth}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={1}>
          {weekdays.map((day) => (
            <Grid item xs={1.71} key={day}>
              <Typography align="center" variant="caption" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}
          {generateCalendar().map((day, i) => (
            <Grid
              item
              xs={1.71}
              key={i}
              alignContent={"center"}
              justifyItems={"center"}
            >
              {day}
            </Grid>
          ))}
        </Grid>

        <Box
          mt={3}
          sx={{
            maxHeight: 360,
            overflowY: "auto",
            pr: 1, // để tránh che scrollbar
          }}
        >
          {renderEvents()}
        </Box>
      </Box>
    </Box>
  );
}
