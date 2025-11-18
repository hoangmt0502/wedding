import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import RBarChart from "../charts/RBarChart";

const data = [
  { name: "Jan", revenue: 32000, profit: 15000 },
  { name: "Feb", revenue: 40000, profit: 20000 },
  { name: "Mar", revenue: 46000, profit: 18000 },
  { name: "Apr", revenue: 56320, profit: 23000 },
  { name: "May", revenue: 41000, profit: 17000 },
  { name: "Jun", revenue: 37000, profit: 16000 },
  { name: "Jul", revenue: 45000, profit: 10000 },
  { name: "Aug", revenue: 49000, profit: 17000 },
];

export default function SaleRevenue() {
  const theme = useTheme();
  const [period, setPeriod] = useState("8");

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value);
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600}>Sales Revenue</Typography>
        <Select
          sx={{ width: 200 }}
          size="small"
          value={period}
          onChange={handlePeriodChange}
        >
          <MenuItem value="8">Last 8 Months</MenuItem>
          <MenuItem value="12">Last 12 Months</MenuItem>
        </Select>
      </Stack>

      <Stack
        flexDirection={"row"}
        mt={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography textAlign={"start"} fontSize={14}>
            Total Revenue
          </Typography>
          <Typography textAlign={"start"} fontSize={24} fontWeight={700}>
            ${totalRevenue.toLocaleString()}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box width={12} height={12} bgcolor="#D6D9F6" borderRadius="50%" overflow={'hidden'} />
            <Typography fontSize={12}>Revenue</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box width={12} height={12} bgcolor="#F15BF2" borderRadius="50%" overflow={'hidden'} />
            <Typography fontSize={12}>Profit</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box mt={2} width="100%" height={240}>
        <RBarChart data={data} />
      </Box>
    </Box>
  );
}
