import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export default function DefaultWrapper({children, ...other} : {children: ReactNode} & BoxProps) {
    return (
        <Box style={{ position: 'relative' }} bgcolor={"background.default"} p={2} borderRadius={2} {...other}>
            {children}
        </Box>
    )
}