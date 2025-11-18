import { PieChart, Pie, Cell, ResponsiveContainer, PieProps } from "recharts";
import { Box, BoxProps, Typography } from "@mui/material";

type TSlotProps = {
  containerProps: BoxProps;
  pieProps: PieProps;
};

type TProps = {
  data: { name: string; value: number; color: string }[];
  totalLabel?: string;
  total?: string | number;
  slotProps?: TSlotProps;
};

export default function RDonutChart({
  data,
  totalLabel = "Total",
  total,
  slotProps,
}: TProps) {
  const { containerProps = {}, pieProps = {} } = slotProps || {};

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      {...containerProps}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={"70%"}
            outerRadius={"100%"}
            dataKey="value"
            stroke="#fff"
            paddingAngle={4}
            startAngle={90}
            endAngle={-450}
            
            {...pieProps}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text */}
      {!!total && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          {!!totalLabel && (
            <Typography fontSize={12}>
              {totalLabel}
            </Typography>
          )}
          <Typography fontSize={22} fontWeight={700}>
            {total}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
