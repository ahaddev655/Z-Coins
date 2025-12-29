import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PnlChartComponent from "../../components/main/PnlChartComponent";

function MainPortfolioPage() {
  const navigate = useNavigate();

  const coins = [
    {
      img: "/assets/bitcoin.png",
      name: "Bitcoin",
      shortForm: "BTC",
      pnl: 9.77,
      amount: "2,509.75",
    },
    {
      img: "/assets/bitcoin.png",
      name: "Ethereum",
      shortForm: "ETH",
      pnl: -3.12,
      amount: "1,842.20",
    },
    {
      img: "/assets/bitcoin.png",
      name: "Cardano",
      shortForm: "ADA",
      pnl: 4.21,
      amount: "0.52",
    },
    {
      img: "/assets/bitcoin.png",
      name: "Solana",
      shortForm: "SOL",
      pnl: -1.68,
      amount: "98.42",
    },
  ];

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
      <div className="grid md:grid-cols-3 grid-cols-1">
      <PnlChartComponent />
      </div>
    </div>
  );
}

export default MainPortfolioPage;
