import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
  {
    element: <Home />,
    errorElement: <Home />,
  },
]);
