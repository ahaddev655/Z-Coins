import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PnlChartComponent from "../../components/main/PnlChartComponent";
import RecentActivitesComponent from "./../../components/main/RecentActivitesComponent";

function MainPortfolioPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="page space-y-8">
      {/* Banner */}
      <div className="py-6 px-5 text-white shadow-sm bg-oceanic-blue rounded-xl">
        <p className="font-medium sm:text-2xl text-xl">Portfolio</p>
        <p className="font-light text-sm mt-[15px]">Holding Value</p>
        <h1 className="mt-0.5 text-3xl font-semibold">$10,000.00</h1>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        <PnlChartComponent />
        <RecentActivitesComponent />
      </div>
    </div>
  );
}

export default MainPortfolioPage;
