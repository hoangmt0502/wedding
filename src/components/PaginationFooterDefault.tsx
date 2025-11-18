import React from "react";
import {
  Box,
  Typography,
  TablePagination,
  Pagination,
} from "@mui/material";
import { useResponsive } from "../hooks/useResponsive";
import locales from "../locales";

type TProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (e: any, page: number) => void;
  onRowsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isHidePagination?: boolean;
}

export default function PaginationFooterDefault({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  isHidePagination = false,
} : TProps) {
  const {isMobile} = useResponsive()
  const { common: t_common } = locales['vi'];
  const totalPages = Math.ceil(count / rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(event, newPage);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 2,
          paddingRight: 2,
          flex: 1,
          flexDirection: {xs: 'column', sm: 'row'},
          border: '1px solid rgba(40, 42, 66, 0.05)'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {t_common.show} {count === 0 ? 0 : (page - 1) * rowsPerPage + 1} -{" "}
          {Math.min((page) * rowsPerPage, count)} {t_common.totalRecords(count)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: {xs: 'center', sm: 'flex-end'}, flex: 1, mr: {xs: 0, sm: 6} }}>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onRowsPerPageChange={onRowsPerPageChange}
            onPageChange={() => {}} 
            labelRowsPerPage={t_common.numberRow}
            sx={{ 
              '.MuiTablePagination-displayedRows': { display: 'none' },
              '.MuiTablePagination-actions': { display: 'none' }, 
              '.MuiInputBase-root': {marginRight: 0}
            }}
          />
        </Box>
        {!isHidePagination && <Pagination
          count={totalPages}
          page={page} 
          onChange={handlePageChange}
          boundaryCount={1} 
          siblingCount={2}
          showFirstButton
          showLastButton
          size="small"
          sx={{
            '& .MuiPagination-ul': {
              margin: 0,
            },
          }}
        />}
      </Box>
    </Box>
  );
}
