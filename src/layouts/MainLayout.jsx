import React from "react";
import MainSidebarComponent from "../components/MainSidebarComponent";
import { Outlet } from "react-router-dom";
import MainHeaderComponent from "./../components/MainHeaderComponent";

function MainLayout() {
  return (
    <div className="flex">
      <MainSidebarComponent />
      <div className="lg:w-[80%] w-full">
        <MainHeaderComponent />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
