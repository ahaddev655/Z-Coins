import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import AuthenticationPage from "./pages/AuthenticationPage";
import UserLayout from "./layouts/UserLayout";

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
          element: "OverView",
        },
        {
          path: "portfolio",
          element: "Portfolio",
        },
        {
          path: "market",
          element: "Market",
        },
        {
          path: "settings",
          element: "Settings",
        },
        {
          path: "history",
          element: "History",
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
