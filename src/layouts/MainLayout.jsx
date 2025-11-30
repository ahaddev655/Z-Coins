import React from "react";
import MainSidebarComponent from "../components/MainSidebarComponent";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex">
      <MainSidebarComponent />
      <Outlet />
    </div>
  );
}

export default MainLayout;
