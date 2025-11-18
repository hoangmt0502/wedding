import { Box, Paper, TableContainer } from "@mui/material";
import { ReactNode } from "react";

type TProps = {
  sx?: React.CSSProperties;
  children: ReactNode;
}

export default function RTableContainer({children, sx}: TProps) {
  return (
    <Box component={Paper} elevation={0} sx={{ mt: 2, borderRadius: 1, overflow: 'hidden', ...sx }}>
      <TableContainer 
        sx={{ 
          boxShadow: "none", 
          borderRadius: 0,
          '& tfoot .MuiTableCell-root': {
            fontSize: '0.9rem'
          }
        }}
      >
        {children}
      </TableContainer>
    </Box>
  )
}