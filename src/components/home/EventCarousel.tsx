import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import EventSlide from "./EventSlide";

const mockEvents = [
  {
    title: "Champions League Screening Night",
    location: "SkyDome Stadium, Toronto, ON",
    category: "Sport",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
    date: "2029-04-20",
    price: "30",
  },
  {
    title: "Culinary Delights Festival",
    location: "Gourmet Plaza, San Francisco, CA",
    category: "Food & Culinary",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
    date: "2029-03-03",
    price: "40",
  },
  {
    title: "Artistry Unveiled: Modern Art Expo",
    location: "Vogue Hall, Los Angeles, CA",
    category: "Fashion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
    date: "2029-03-10",
    price: "110",
  },
  {
    title: "Artistry Unveiled: Modern Art Expo",
    location: "Vogue Hall, Los Angeles, CA",
    category: "Fashion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s",
    date: "2029-03-10",
    price: "110",
  },
];

export default function EventCarousel() {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography ml={2} fontWeight="bold" variant="h6">
          All Events
        </Typography>
        <Button variant="text" size="small">
          View All Event
        </Button>
      </Box>

      <Swiper
        modules={[]}
        spaceBetween={16}
        slidesPerView={"auto"}
        style={{ width: "100%", height: "auto" }}
      >
        {mockEvents.map((event, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "calc((100% - 32px) / 3)", // 3 slides per view with spacing
              boxSizing: "border-box",
            }}
          >
            <EventSlide {...event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
