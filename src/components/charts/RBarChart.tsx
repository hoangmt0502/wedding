// components/RevenueChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, useTheme, Box, BoxProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

type TProps = {
  data: { name: string; revenue: number; profit: number }[];
  slotProps?: {
    containerProps?: BoxProps;
    chartProps?: Partial<CategoricalChartProps>;
  };
};

export default function RBarChart({ data, slotProps }: TProps) {
  const theme = useTheme();
  const { containerProps = {}, chartProps = {} } = slotProps || {};

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <Paper elevation={3} sx={{ p: 1.5 }}>
          <Typography fontSize={12}>Revenue</Typography>
          <Typography fontSize={14} fontWeight={600}>
            ${payload[0].value.toLocaleString()}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
      {...containerProps}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={8} {...chartProps}>
          <CartesianGrid vertical={false} strokeDasharray="3" />
          <XAxis dataKey="name" 
            tick={{
              fill: alpha(theme.palette.text.primary, 0.8)
            }}
          />
          <YAxis tickFormatter={(value) => `${value / 1000}K`}
             tick={{
              fill: alpha(theme.palette.text.primary, 0.8)
            }}
          />
          <Tooltip
            content={CustomTooltip}
            cursor={{
              fill: alpha(theme.palette.primary.main, 0.2),
              opacity: 0.5,
              radius: 6,
            }}
          />
          <Bar dataKey="revenue" radius={[10, 10, 0, 0]} fill="#D6D9F6" />
          <Bar dataKey="profit" radius={[10, 10, 0, 0]} fill="#F15BF2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
