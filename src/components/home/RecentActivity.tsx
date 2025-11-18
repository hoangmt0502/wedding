import { Box, Typography, Stack, Avatar, IconButton } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const activities = [
  {
    icon: <SyncIcon color="primary" />,
    user: "Admin Stefanus Weber",
    action: 'reviewed a refund request for Invoice ID: "INV1004"',
    time: "05:30 PM",
  },
  {
    icon: <EditNoteIcon color="secondary" />,
    user: "Wella McGrath",
    action:
      'updated ticket prices for the event: "Runway Revolution 2024" under the category "Fashion"',
    time: "02:00 PM",
  },
  {
    icon: <CancelIcon color="error" />,
    user: "Patrick Cooper",
    action: 'canceled a booking with Invoice ID: "INV10014"',
    time: "11:15 AM",
  },
  {
    icon: <AddCircleIcon color="success" />,
    user: "Andrew Shaw",
    action:
      'created a new event: "Symphony Under the Stars" under the category "Music"',
    time: "09:30 AM",
  },
];

export default function RecentActivity() {
  return (
    <Box
      flex={1}
      gap={2}
      p={2}
      borderRadius={3}
      bgcolor="background.default"
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.05)"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography textAlign={"start"} fontWeight="bold">
          Recent Activity
        </Typography>
        <IconButton size="small">
          <MoreHorizIcon />
        </IconButton>
      </Stack>

      <Stack spacing={2}>
        {activities.map((item, index) => (
          <Stack key={index} direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: "#F5F5F5" }}>{item.icon}</Avatar>
            <Box flex={1}>
              <Typography
                textAlign={"start"}
                fontWeight={600}
                fontSize="0.875rem"
              >
                {item.user}
              </Typography>
              <Typography
                textAlign={"start"}
                fontSize="0.875rem"
                color="text.secondary"
              >
                {item.action}
              </Typography>
              <Typography
                textAlign={"start"}
                fontSize="0.75rem"
                color="text.disabled"
              >
                {item.time}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
