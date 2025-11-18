import {
  Box,
  Typography,
  Stack,
  Select,
  SelectChangeEvent,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import DonutChart from "../charts/RDonutChart";

const data = [
  { name: "Sold Out", value: 1251, color: "#F15BF2", percent: 45 },
  { name: "Fully Booked", value: 834, color: "#2D336D", percent: 30 },
  { name: "Available", value: 695, color: "#E5E6F0", percent: 25 },
];

export default function TicketSales() {
  const theme = useTheme();
  const [age, setAge] = useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Box
      flex={1}
      gap={2}
      p={2}
      borderRadius={3}
      bgcolor={theme.palette.background.default}
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.05)"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        gap={3}
      >
        <Typography fontWeight={600}>Ticket Sales</Typography>
        <Select
          sx={{ width: 180 }}
          value={age}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: 3,
        }}
      >
        {/* Pie Chart */}
        <Box
          sx={{
            width: "90%",
            height: "auto",
            aspectRatio: 1,
          }}
        >
          <DonutChart
            data={data}
            totalLabel="Total Ticket"
            total={data.reduce((sum, item) => sum + item.value, 0)}
          />
        </Box>

        {/* Legend */}
        <Stack sx={{ mt: 3, width: "100%", gap: 2 }}>
          {data.map((item) => (
            <Stack
              key={item.name}
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Stack flexDirection={"row"}>
                <Box
                  sx={{
                    width: 10,
                    height: 44,
                    borderRadius: 99,
                    backgroundColor: item.color,
                    border: '1px solid #fff'
                  }}
                />
                <Box ml={1}>
                  <Typography textAlign={"start"} fontSize={14}>
                    {item.name}
                  </Typography>
                  <Typography
                    textAlign={"start"}
                    fontSize={18}
                    fontWeight={600}
                  >
                    {item.value.toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
              <Box
                sx={{
                  ml: "auto",
                  bgcolor: "#F1F1F5",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: 16,
                  fontWeight: 600,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.percent}%
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
