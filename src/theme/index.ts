import { alpha, createTheme } from "@mui/material/styles";
import palette from "../constants/palette";

// Định nghĩa theme
const theme = createTheme({
  // Palette: Tùy chỉnh màu sắc
  palette: {
    primary: {
      main: "#1976d2", // Màu chính (xanh dương)
      light: "#42a5f5", // Màu sáng hơn
      dark: "#1565c0", // Màu tối hơn
      contrastText: "#fff", // Màu chữ tương phản
    },
    secondary: {
      main: "#9c27b0", // Màu phụ (tím)
    },
    error: {
      main: "#d32f2f", // Màu lỗi (đỏ)
    },
    background: {
      default: "#f5f5f5", // Màu nền mặc định
      paper: "#fff", // Màu nền cho Paper (bảng, modal, v.v.)
    },
    text: {
      primary: "#334155", // Màu chữ chính (xám đậm)
      secondary: "#64748b", // Màu chữ phụ (xám nhạt)
    },
    grey: {
      900: "#1e293b", // Xám đen cho header
      100: "#f1f5f9", // Xám nhạt cho hover
    },
  },


  // Typography: Tùy chỉnh kiểu chữ
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif", // Font mặc định
    h6: {
      fontWeight: 600, // Đậm cho tiêu đề nhỏ
    },
    subtitle2: {
      fontWeight: 600, // Đậm cho tiêu đề bảng
    },
    body2: {
      fontSize: "0.875rem", // Kích thước chữ nhỏ cho nội dung
    },
  },

  // Components: Tùy chỉnh style cho các component cụ thể
  components: {
    // Table
    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: 650,
        },
      },
    },
    // TableHead: Không áp dụng hover
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f7fa", // Nền tối cho header
        },
      },
    },
    // TableCell
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#333", // Chữ trắng cho header
          fontWeight: 600,
          padding: "12px", // Tăng padding cho dễ nhìn
        },
        body: {
          color: "#334155", // Chữ xám đậm cho body
          padding: "12px",
          borderBottom: "1px solid #e5e7eb", // Đường viền ngang
          borderRight: "1px solid #e5e7eb", // Viền phải giữa các ô
          "&:last-child": {
            borderRight: "none",
          },
        },
      },
    },
    // Checkbox
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#64748b", // Màu xám nhạt khi chưa chọn
          "&.Mui-checked": {
            color: palette.primary.main,
          },
        },
      },
    },
    // TableRow: Hover chỉ áp dụng cho body, không ảnh hưởng đến header
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f1f5f9", // Hover effect xám nhạt (chỉ cho body)
          },
          "&.Mui-selected": {
            backgroundColor: alpha(palette.primary.light, 0.6),
          },
        },
      },
    },
    // TableContainer
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Bo góc
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ
        },
      },
    },
    // IconButton
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#64748b", // Màu xám nhạt cho icon
          "&:hover": {
            color: palette.primary.light,
          },
        },
      },
    },
    // MenuItem
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: palette.primary.light,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          "&:focus": {
            outline: "none",
          },
          "&:focus-visible": {
            outline: "none",
            boxShadow: "none",
          },
        },
        outlined: {
          "&:hover": {
            borderColor: palette.primary.main,
          },
        },
      },
    },
  },
});

export default theme;
