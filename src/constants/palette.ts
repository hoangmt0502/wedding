import { error } from "console";

export const paletteColors = {
  pink: {
    main: "#1976d2", // Màu chính (xanh dương)
    light: "#42a5f5", // Màu sáng hơn
    dark: "#1565c0", // Màu tối hơn
    contrastText: "#fff", // Màu chữ tương phản
  },
  deepBlue: {
    main: "#394286",
    light: "#6d76b3",
    dark: "#282f60",
    contrastText: "#ffffff",
  },
};

const palette = {
  primary: {
    ...paletteColors.pink,
    bgColor: "#f7f7f7",
    secondColor: "#eef0ff",
  },
  secondary: paletteColors.deepBlue,
};

export default palette;
