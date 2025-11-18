import {
  Box,
  Typography,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";

type EventSlideProps = {
  title: string;
  location: string;
  category: string;
  image: string;
  date: string;
  price: string;
};

export default function EventSlide({
  title,
  location,
  category,
  image,
  date,
  price,
}: EventSlideProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "background.default",
        boxShadow: "none",
        height: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box position="relative">
        <CardMedia component="img" height="180" image={image} alt={title} />
        <Chip
          label={category}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            bgcolor: "#eef",
            fontWeight: "bold",
          }}
        />
      </Box>
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography textAlign={"start"} fontWeight="bold">
            {title}
          </Typography>
          <Typography
            textAlign={"start"}
            variant="body2"
            color="text.secondary"
          >
            {location}
          </Typography>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarTodayIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">
              {moment(date).format("MMM D, YYYY")}
            </Typography>
          </Stack>
          <Typography fontWeight="bold" variant="h6" color="primary">
            ${price}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
