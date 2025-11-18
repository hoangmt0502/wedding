import { Box, Grid } from "@mui/material";
import TicketSales from "./TicketSales";
import PopularEvents from "./PopularEvent";
import SaleRevenue from "./SaleRevenue";
import BoxTag from "./BoxTag";
import { CalendarMonth } from "@mui/icons-material";

export default function ReportCharts() {
  return (
    <Grid container spacing={2}>
      {/* Hàng 1: 3 thẻ nhỏ */}
      <BoxTag icon={<CalendarMonth />} label="Upcoming Events" value={345} />
      <BoxTag icon={<CalendarMonth />} label="Upcoming Events" value={345} />
      <BoxTag icon={<CalendarMonth />} label="Upcoming Events" value={345} />

      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="stretch">
          {/* TicketSales bên trái */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TicketSales />
            </Box>
          </Grid>

          {/* Khối bên phải */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
              <Grid item xs={12}>
                <SaleRevenue />
              </Grid>
              <Grid item xs={12}>
                <PopularEvents />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
