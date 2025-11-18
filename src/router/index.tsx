import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import User from "../pages/User";
import Groups from "../pages/Groups";
import Permission from "../pages/Permission";
import ErrorPage from "../pages/ErrorPage";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import LoginLayout from "../components/LoginLayout";
import { PATH_NAME } from "../constants/path";
import {Permission as E_Permission} from '../enums/common'

// eslint-disable-next-line react-refresh/only-export-components
const AuthLayout = () => {
  const location = useLocation();
  return (
    <AuthProvider>
      {location.pathname === PATH_NAME.login ? (
        <LoginLayout>
          <Outlet />
        </LoginLayout>
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </AuthProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH_NAME.login,
        element: <Login />,
      },
      {
        path: PATH_NAME.home,
        element: <ProtectedRoute />, // Không cần quyền cho Home
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: PATH_NAME.user,
        element: <ProtectedRoute requiredPermission={E_Permission.Owner} />, // Quyền cho User
        children: [
          {
            index: true,
            element: <User />,
          },
        ],
      },
      {
        path: PATH_NAME.groups,
        element: <ProtectedRoute requiredPermission={E_Permission.Owner} />, // Quyền cho User
        children: [
          {
            index: true,
            element: <Groups />,
          },
        ],
      },
      {
        path: PATH_NAME.permission,
        element: <ProtectedRoute requiredPermission={E_Permission.Owner} />, // Quyền cho User
        children: [
          {
            index: true,
            element: <Permission />,
          },
        ],
      },
      
    ],
  },
]);
