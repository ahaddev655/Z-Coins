import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import MainDashboardPage from "./pages/main/MainDashboardPage";
import MainPortfolioPage from "./pages/main/MainPortfolioPage";
import MainMarketPage from "./pages/main/MainMarketPage";
import MainSearchPage from "./pages/main/MainSearchPage";
import MainSettingsPage from "./pages/main/MainSettingsPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/main/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <MainDashboardPage />,
        },
        {
          path: "portfolio",
          element: <MainPortfolioPage />,
        },
        {
          path: "market",
          element: <MainMarketPage />,
        },
        {
          path: "search",
          element: <MainSearchPage />,
        },
        {
          path: "settings",
          element: <MainSettingsPage />,
        },
      ],
    },
    {
      path: "/66e5753c/",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "users",
          element: <AdminUsers />,
        },
        {
          path: "settings",
          element: <AdminSettingsPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
