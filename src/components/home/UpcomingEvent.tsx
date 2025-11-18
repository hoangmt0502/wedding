import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

interface EventCardProps {
  imageUrl: string;
  category: string;
  title: string;
  location: string;
  description: string;
  date: string;
  time: string;
}

export default function UpcomingEventCard({
  imageUrl,
  category,
  title,
  location,
  description,
  date,
  time,
}: EventCardProps) {
  return (
    <Box>
      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
          bgcolor: "background.default",
          flex: 1,
          border: "1.5px solid",
          borderColor: "primary.main",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", pt: "60%" }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Chip
            label={category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "background.default",
              color: "#000",
              fontWeight: 400,
            }}
          />
        </Box>

        <CardContent>
          <Typography
            textAlign={"start"}
            variant="h6"
            fontWeight={600}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            textAlign={"start"}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            {location}
          </Typography>
          <Typography
            textAlign={"start"}
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {description}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarMonth
                sx={{
                  color: "#666",
                  backgroundColor: "#fff",
                  p: 1.2,
                  borderRadius: 2,
                }}
                fontSize="small"
              />
              <Box>
                <Typography
                  textAlign={"start"}
                  variant="body2"
                  fontWeight={500}
                  fontSize={12}
                  lineHeight={"12px"}
                >
                  {date}
                </Typography>
                <Typography
                  textAlign={"start"}
                  variant="caption"
                  color="text.secondary"
                  fontSize={12}
                  lineHeight={"12px"}
                >
                  {time}
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#ec5cff",
                textTransform: "none",
                borderRadius: "999px",
                px: 2.5,
                ":hover": { bgcolor: "#d04ce2" },
              }}
            >
              View Details
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
