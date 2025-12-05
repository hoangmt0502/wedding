import { GlobalStyles } from "@mui/material";

export default function GlobalScrollbarStyles() {
  return (
    <GlobalStyles
    styles={{
      "*::-webkit-scrollbar": {
        width: 6,
        height: 6,
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "#999",
        borderRadius: 6,
      },
      "*::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#666",
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "#f0f0f0",
      },
      "button:focus, button:focus-visible": {
        outline: 'none'
      }
    }}
  />
  ) 
}
