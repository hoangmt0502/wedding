// components/HorizontalBarChart.tsx
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Cell,
  LabelList,
} from "recharts";
import { alpha, Box, BoxProps, Typography, useTheme } from "@mui/material";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

type HorizontalBarChartData = {
  name: string;
  percent: number;
  events: number;
  color: string;
  textColor?: string;
};

type TProps = {
  data: HorizontalBarChartData[];
  slotProps?: {
    containerProps?: BoxProps;
    chartProps?: Partial<CategoricalChartProps>;
  };
};

export default function RHorizontalBarChart({ data, slotProps }: TProps) {
  const { containerProps = {}, chartProps = {} } = slotProps || {};
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", height: "100%" }} {...containerProps}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barCategoryGap={20}
          barSize={30}
          {...chartProps}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            width={120}
            tick={({ x, y, payload }) => (
              <Typography x={x! - 110} y={y! + 6} component="text" fill={alpha(theme.palette.text.primary, 0.8)}>
                {payload.value}
              </Typography>
            )}
          />
          <Bar
            dataKey="percent"
            // radius={[4, 4, 4, 4]}
            background={{ fill: "#f7f7f7" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}

            {/* Label bên trong bar */}
            <LabelList
              dataKey="percent"
              position="insideLeft"
              content={({ x, y, index, value }) => {
                const entry = typeof index === "number" ? data[index] : null;
                if (!entry || typeof x !== "number" || typeof y !== "number")
                  return null;
                return (
                  <Typography
                    component="text"
                    x={x + 8}
                    y={y + 20}
                    fill={entry.textColor || "#000"}
                    fontWeight={600}
                    fontSize={14}
                  >
                    {`${value}%`}
                  </Typography>
                );
              }}
            />

            {/* Label bên ngoài (số lượng events) */}
            <LabelList
              dataKey="events"
              content={({ x, y, width, value, index }) => {
                if (
                  typeof x !== "number" ||
                  typeof y !== "number" ||
                  typeof width !== "number"
                )
                  return null;
                const entry = typeof index === "number" ? data[index] : null;
                let newWidth = width;

                if (!!entry?.percent && entry?.percent > 70) {
                  newWidth -= 100;
                } else {
                  newWidth += 8;
                }

                return (
                  <Typography
                    component="text"
                    x={x + newWidth}
                    y={y + 20}
                    fill="#000"
                    fontSize={14}
                  >
                    {`${value?.toLocaleString()} events`}
                  </Typography>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
