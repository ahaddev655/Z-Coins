import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import MainDashboardPage from "./pages/main/MainDashboardPage";
import MainPortfolioPage from "./pages/main/MainPortfolioPage";
import MainMarketPage from "./pages/main/MainMarketPage";
import MainProfilePage from "./pages/main/MainProfilePage";
import MainSearchPage from "./pages/main/MainSearchPage";

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
          path: "profile",
          element: <MainProfilePage />,
        },
        {
          path: "search",
          element: <MainSearchPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
