import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Container } from "@mui/system";
import "./firebase/config";
import { AlertModalProvider } from "./context/AlertModal";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SidebarProvider } from "./context/SidebarProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "swiper/css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { useAppSelector } from "./store/hook";
import { CssBaseline } from "@mui/material";
import themeBuilder from "./theme/themeBuilder";
import GlobalScrollbarStyles from "./theme/GlobalScrollbarStyles";

const AppWrapper = () => {
  const { mode, themeColor, customColorOverrides, userThemeColor } = useAppSelector(state => state.theme)
  const muiTheme = themeBuilder(mode, themeColor, customColorOverrides, userThemeColor);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={muiTheme}>
        <GlobalScrollbarStyles />
        <CssBaseline />
        <AlertModalProvider>
          <SidebarProvider>
            <Container
              maxWidth={false}
              disableGutters
              sx={{
                textAlign: "center",
                minHeight: "100vh",
                bgcolor: muiTheme.palette.custom.bodyBg,
                color: muiTheme.palette.text.primary,
              }}
            >
              <RouterProvider router={router} />
            </Container>
            <ToastContainer />
          </SidebarProvider>
        </AlertModalProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  </StrictMode>
);
