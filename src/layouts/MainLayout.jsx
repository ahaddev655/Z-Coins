import React from "react";
import { Outlet } from "react-router-dom";
import MainSidebarComponent from './../components/main/MainSidebarComponent';

function MainLayout() {
  return (
    <div className="flex">
      <MainSidebarComponent />
      <Outlet />
    </div>
  );
}

export default MainLayout;
