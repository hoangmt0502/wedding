import React from "react";
import { Box, Grid, SvgIconProps, Typography, useTheme } from "@mui/material";

type TProps = {
  icon: React.ReactElement<SvgIconProps>;
  label: string;
  value: number | string;
  iconColor?: string;
};

export default function BoxTag({ icon, label, value }: TProps) {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={4}>
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        gap={2}
        p={2}
        borderRadius={3}
        bgcolor={theme.palette.background.default}
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.05)"
      >
        <Box
          width={40}
          height={40}
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor={"primary.main"}
        >
          {React.cloneElement(icon, {
            sx: { color: "#fff", fontSize: 20 },
          })}
        </Box>

        <Box>
          <Typography textAlign={"start"} variant="body2" color="textSecondary">
            {label}
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            fontWeight={600}
            textAlign={"start"}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
