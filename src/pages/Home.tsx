import { Box, Stack } from "@mui/material";
import UpcomingEventCard from "../components/home/UpcomingEvent";
import ReportCharts from "../components/home/ReportCharts";
import EventCalendar from "../components/home/EventCalendar";
import EventCarousel from "../components/home/EventCarousel";
import RecentActivity from "../components/home/RecentActivity";
import RecentBookings from "../components/home/RecentBookings";

export default function Home() {
  return (
    <Box mt={2} mb={1}>
      <Stack flexDirection={{xs: 'column', md: "row"}} gap={3}>
        <Stack flex={0.7} gap={3}>
          <ReportCharts />
          <EventCarousel />
          <RecentBookings />
        </Stack>
        <Stack flex={0.3} gap={3}>
          <UpcomingEventCard
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAc55TGWqEA4LsRUJrk43XSVm9UuotBo1omw&s"
            category="Music"
            title="Rhythm & Beats Music Festival"
            location="Sunset Park, Los Angeles, CA"
            description="Immerse yourself in electrifying performances by top pop, rock, EDM, and hip-hop artists, indulge in delic..."
            date="Apr 20, 2029"
            time="12:00 PM - 11:00 PM"
          />
          <EventCalendar />
          <RecentActivity />
        </Stack>
      </Stack>
    </Box>
  );
}
