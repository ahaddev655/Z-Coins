import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PnlChartComponent from "../../components/main/PnlChartComponent";
import HoldedTradesComponent from "../../components/main/HoldedTradesComponent";

function MainPortfolioPage() {
  const navigate = useNavigate();
  const holdingValue = Number(localStorage.getItem("holdingValue") || 0);

  useEffect(() => {
    if (!localStorage.getItem("sessionToken")) navigate("/");
  }, [navigate]);

  return (
    <div className="page space-y-8">
      {/* Banner */}
      <div className="py-6 px-5 text-white shadow-sm bg-oceanic-blue rounded-xl">
        <p className="font-medium sm:text-2xl text-xl">Portfolio</p>
        <p className="font-light text-sm mt-[15px]">Holding Value</p>
        <h1 className="mt-0.5 text-3xl font-semibold">
          ${holdingValue.toLocaleString()}
        </h1>
      </div>

      {/* Charts */}
      <PnlChartComponent />
      <HoldedTradesComponent />
    </div>
  );
}

export default MainPortfolioPage;
