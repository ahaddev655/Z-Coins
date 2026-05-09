import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import AuthenticationPage from "./pages/AuthenticationPage";
import UserLayout from "./layouts/UserLayout";
import OverviewPage from "./pages/user/OverviewPage";
import PortfolioPage from "./pages/user/PortfolioPage";
import MarketPage from "./pages/user/MarketPage";
import SettingsPage from "./pages/user/SettingsPage";
import HistoryPage from "./pages/user/HistoryPage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SplashScreen />,
    },
    {
      path: "/auth",
      element: <AuthenticationPage />,
    },
    {
      path: "/u/",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <OverviewPage />,
        },
        {
          path: "portfolio",
          element: <PortfolioPage />,
        },
        {
          path: "market",
          element: <MarketPage />,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },
        {
          path: "history",
          element: <HistoryPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
