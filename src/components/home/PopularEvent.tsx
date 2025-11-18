import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import RHorizontalBarChart from "../charts/RHorizontalBarchart";

const data = [
  {
    name: "Music",
    percent: 70,
    events: 20000,
    color: "#E5E8FE",
    textColor: "#000000",
  },
  {
    name: "Sports",
    percent: 35,
    events: 17500,
    color: "#F07CE5",
    textColor: "#FFFFFF",
  },
  {
    name: "Fashion",
    percent: 20,
    events: 12500,
    color: "#2E3162",
    textColor: "#FFFFFF",
  },
];

export default function PopularEvents() {
  const [sort, setSort] = useState("Popular");

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  return (
    <Box
      flex={1}
      gap={2}
      p={2}
      borderRadius={3}
      bgcolor={"background.default"}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.05)"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600}>Popular Events</Typography>
        <Select
          sx={{ width: 200 }}
          size="small"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="Popular">Popular</MenuItem>
          <MenuItem value="12">Last 12 Months</MenuItem>
        </Select>
      </Stack>

      <Box mt={2} width="100%" height={150}>
        <RHorizontalBarChart data={data} />
      </Box>
    </Box>
  );
}
