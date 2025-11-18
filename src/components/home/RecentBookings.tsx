import {
  Box,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  InputBase,
  Select,
  MenuItem,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  TableContainer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const bookings = [
  {
    id: "INV10011",
    date: "2029/02/15",
    time: "10:30 AM",
    name: "Jackson Moore",
    event: "Symphony Under the Stars",
    category: "Music",
    qty: 2,
    amount: 100,
    status: "Confirmed",
  },
  {
    id: "INV10012",
    date: "2029/02/16",
    time: "03:45 PM",
    name: "Alicia Smithson",
    event: "Runway Revolution 2024",
    category: "Fashion",
    qty: 1,
    amount: 120,
    status: "Pending",
  },
  {
    id: "INV10013",
    date: "2029/02/17",
    time: "01:15 PM",
    name: "Marcus Rawless",
    event: "Global Wellness Summit",
    category: "Beauty & Wellness",
    qty: 3,
    amount: 240,
    status: "Confirmed",
  },
  {
    id: "INV10014",
    date: "2029/02/18",
    time: "09:00 AM",
    name: "Patrick Cooper",
    event: "Champions League Screening Night",
    category: "Sport",
    qty: 4,
    amount: 120,
    status: "Cancelled",
  },
  {
    id: "INV10015",
    date: "2029/02/18",
    time: "05:30 PM",
    name: "Gilda Ramos",
    event: "Artistry Unveiled: Modern Art Expo",
    category: "Art & Design",
    qty: 2,
    amount: 50,
    status: "Confirmed",
  },
];

const statusColorMap: Record<string, string> = {
  Confirmed: "#F5EAFE",
  Pending: "#E6F0FF",
  Cancelled: "#F1F2F4",
};

const statusTextColorMap: Record<string, string> = {
  Confirmed: "#D600D6",
  Pending: "#007BFF",
  Cancelled: "#6B7280",
};

const RecentBookings = () => {
  return (
    <Box
      flex={1}
      gap={2}
      p={{xs: 1, md: 2}}
      borderRadius={3}
      bgcolor="background.default"
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.05)"
    >
      <Stack
        direction={{xs: 'column', md: "row"}}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <Typography fontWeight="bold">Recent Bookings</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search name, event, etc"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 240 }}
          />
          <Select
            variant="outlined"
            size="small"
            defaultValue="This Week"
            IconComponent={ArrowDropDownIcon}
            sx={{
              fontSize: "0.875rem",
              borderRadius: 2,
              bgcolor: "custom.main",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
          >
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="Last Week">Last Week</MenuItem>
          </Select>
        </Stack>
      </Stack>
      <TableContainer sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Invoice ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>
                {b.date}
                <br />
                <Typography variant="caption" color="text.secondary">
                  {b.time}
                </Typography>
              </TableCell>
              <TableCell>{b.name}</TableCell>
              <TableCell>
                {b.event}
                <br />
                <Typography variant="caption" color="text.secondary">
                  {b.category}
                </Typography>
              </TableCell>
              <TableCell>{b.qty}</TableCell>
              <TableCell>${b.amount}</TableCell>
              <TableCell>
                <Chip
                  label={b.status}
                  sx={{
                    bgcolor: statusColorMap[b.status],
                    color: statusTextColorMap[b.status],
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    px: 1,
                  }}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentBookings;
