import { Outlet } from "react-router-dom";
import { useState } from "react";
import UserSidebar from "../components/UserSidebar";
import {
  BookUser,
  ChartCandlestick,
  Clock,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import UserHeader from "../components/UserHeader";

function UserLayout() {
  const [offCanvas, setOffCanvasToggle] = useState(false);
  const links = [
    {
      text: "Overview",
      path: "/u/",
      icon: LayoutDashboard,
    },
    {
      text: "Portfolio",
      path: "/u/portfolio",
      icon: BookUser,
    },
    {
      text: "Market",
      path: "/u/market",
      icon: ChartCandlestick,
    },
    {
      text: "Settings",
      path: "/u/settings",
      icon: Settings,
    },
    {
      text: "Transaction History",
      path: "/u/history",
      icon: Clock,
    },
  ];
  return (
    <div className="flex">
      <UserSidebar
        offCanvas={offCanvas}
        setOffCanvasToggle={setOffCanvasToggle}
        linksArray={links}
      />
      <div className="w-full">
        <UserHeader setOffCanvasToggle={setOffCanvasToggle} />
        <div className="py-6 px-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
