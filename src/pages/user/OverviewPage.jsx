import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  TrendingUp,
  CircleDollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

function OverviewPage() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Chart Options
    const options = {
      chart: {
        type: "area",
        height: "100%",
        fontFamily: "inherit",
        toolbar: { show: false },
        sparkline: { enabled: false },
      },
      series: [
        {
          name: "Portfolio Value",
          data: [31000, 40000, 28000, 51000, 42000, 109000, 100000],
        },
      ],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100],
        },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { show: false },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      colors: ["#1e3a8a"],
    };

    // Initialize Chart
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // Cleanup on unmount
    return () => {
      chart.destroy();
    };
  }, []);

  const stats = [
    {
      label: "Total Balance",
      value: "$128,430.00",
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "24h Profit",
      value: "+$12,302.00",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Assets",
      value: "14 Coins",
      icon: CircleDollarSign,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* --- Top Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform
            hover:scale-[1.02]"
          >
            <div
              className={`h-12 w-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-xl font-black text-blue-950">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Main Chart --- */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-blue-950 tracking-tight">
                Portfolio Performance
              </h3>
              <p className="text-xs text-slate-400 font-medium tracking-wide">
                Dynamic growth for the current week
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full">
                LIVE
              </span>
            </div>
          </div>
          {/* The Chart Container */}
          <div className="w-full" ref={chartRef}></div>
        </div>

        {/* --- Quick Trade / Assets --- */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-blue-950 mb-4">Quick Trade</h3>
          <div className="mb-8">
            <Link to={"/u/market"}>
              <button
                className="w-full flex items-center justify-center gap-2 p-4 bg-emerald-500 text-white rounded-xl font-bold
              hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-100"
              >
                <ArrowDownLeft size={18} />
                <span>Buy Assets</span>
              </button>
            </Link>
            <Link to={"/u/market"}>
              <button
                className="w-full flex items-center justify-center mt-3 gap-2 p-4 bg-blue-950 text-white rounded-xl font-bold
              hover:bg-blue-900 transition-all active:scale-95 shadow-lg shadow-blue-100"
              >
                <ArrowUpRight size={18} />
                <span>Sell Assets</span>
              </button>
            </Link>
          </div>

          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            Market Watch
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Bitcoin",
                symbol: "BTC",
                price: "$64,200",
                change: "+2.4%",
              },
              {
                name: "Ethereum",
                symbol: "ETH",
                price: "$3,450",
                change: "-0.8%",
              },
              {
                name: "Solana",
                symbol: "SOL",
                price: "$145",
                change: "+12.1%",
              },
            ].map((asset, i) => (
              <div
                key={i}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center font-bold
                  text-[10px] text-blue-900 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors"
                  >
                    {asset.symbol}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-950">
                      {asset.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                      {asset.symbol} / USDT
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-950">
                    {asset.price}
                  </p>
                  <p
                    className={`text-[10px] font-black ${asset.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {asset.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
