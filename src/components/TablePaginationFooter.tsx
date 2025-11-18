import React from "react";
import { TableFooter, TableRow, TableCell, Box, Typography, TablePagination } from "@mui/material";

type TProps = {
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: VoidFunction;
    onRowsPerPageChange: VoidFunction;
}

export default function TablePaginationFooter({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange } : TProps) {
    return (
        <TableFooter>
            <TableRow>
                <TableCell colSpan={7}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2 }}>
                        <Typography>
                            Hiển thị {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, count)} trên tổng {count} bản ghi
                        </Typography>
                        <TablePagination
                            component="div" // Tránh lỗi <td> cannot be a child of <td>
                            rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onPageChange}
                            onRowsPerPageChange={onRowsPerPageChange}
                        />
                    </Box>
                </TableCell>
            </TableRow>
        </TableFooter>
    );
}
