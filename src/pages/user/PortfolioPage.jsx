import React, { useState, useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import {
  TrendingUp,
  PieChart as PieIcon,
  X,
  ArrowUpRight,
  Activity,
  BarChart3,
  Coins,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function PortfolioPage() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const pnlChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const holdings = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      balance: 0.452,
      value: 29018.4,
      avgPrice: "$52,100",
      profit: "+12.4%",
      isPositive: true,
      marketCap: "$1.28T",
      volume24h: "$35.2B",
      totalSupply: "19.7M BTC",
      description: "Bitcoin is the first decentralized digital currency.",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: 4.12,
      value: 14214.0,
      avgPrice: "$3,100",
      profit: "+11.2%",
      isPositive: true,
      marketCap: "$380.5B",
      volume24h: "$12.8B",
      totalSupply: "120.2M ETH",
      description: "Ethereum is a smart contract platform.",
    },
    {
      name: "Solana",
      symbol: "SOL",
      balance: 124.5,
      value: 18052.5,
      avgPrice: "$165",
      profit: "-12.1%",
      isPositive: false,
      marketCap: "$64.2B",
      volume24h: "$4.1B",
      totalSupply: "448.3M SOL",
      description: "Solana is a high-performance blockchain.",
    },
  ];

  const totalPortfolioValue = holdings.reduce(
    (acc, coin) => acc + coin.value,
    0,
  );

  useEffect(() => {
    // --- 1. Daily PNL Area Chart ---
    const pnlOptions = {
      chart: {
        type: "area",
        height: 200,
        toolbar: { show: false },
        sparkline: { enabled: true },
      },
      stroke: { curve: "smooth", width: 2 },
      fill: { type: "gradient", gradient: { opacityFrom: 0.4, opacityTo: 0 } },
      series: [
        { name: "Daily PNL", data: [400, -200, 800, 500, -100, 1200, 900] },
      ],
      colors: ["#10b981"],
      tooltip: { theme: "light" },
    };

    // --- 2. Real-time Allocation Pie Chart ---
    const pieOptions = {
      chart: { type: "donut", height: 280 },
      labels: holdings.map((c) => c.name),
      series: holdings.map((c) => c.value),
      colors: ["#1e3a8a", "#10b981", "#f59e0b"],
      legend: { position: "bottom", fontWeight: 600 },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Value",
                formatter: () => `$${(totalPortfolioValue / 1000).toFixed(1)}k`,
              },
            },
          },
        },
      },
    };

    const pnlChart = new ApexCharts(pnlChartRef.current, pnlOptions);
    const pieChart = new ApexCharts(pieChartRef.current, pieOptions);

    pnlChart.render();
    pieChart.render();

    return () => {
      pnlChart.destroy();
      pieChart.destroy();
    };
  }, []);

  return (
    <div className="space-y-6 relative">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-blue-950 tracking-tight">
          Portfolio Analysis
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Tracking {holdings.length} active positions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Allocation Card (Now Dynamic) --- */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-blue-950">Asset Allocation</h3>
            <PieIcon size={20} className="text-slate-400" />
          </div>
          <div ref={pieChartRef}></div>
        </div>

        {/* --- Daily PNL Chart --- */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-blue-950">Daily PNL Performance</h3>
              <p className="text-xs text-emerald-500 font-bold">
                + $1,200.45 today
              </p>
            </div>
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div ref={pnlChartRef} className="mt-auto"></div>
        </div>

        {/* --- Holdings Table --- */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-blue-950">Holding Coins</h3>
            <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">
              Click row for details
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.15em] text-slate-400 font-black">
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4">Balance</th>
                  <th className="px-6 py-4">Current Value</th>
                  <th className="px-6 py-4 text-right">Profit/Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {holdings.map((coin, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedCoin(coin)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center font-black text-xs text-blue-900 group-hover:bg-white transition-colors">
                          {coin.symbol}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-blue-950">
                            {coin.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-950">
                      {coin.balance} {coin.symbol}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">
                      ${coin.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-sm">
                      <span
                        className={
                          coin.isPositive ? "text-emerald-500" : "text-red-500"
                        }
                      >
                        {coin.profit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup remains identical to the previous version but with marketcap data updated */}
      <AnimatePresence>
        {selectedCoin && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCoin(null)}
              className="absolute inset-0 bg-blue-950/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-8 lg:p-10 overflow-hidden"
            >
              {/* Content of the Modal from previous response */}
              <button
                onClick={() => setSelectedCoin(null)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-5 mb-10">
                <div className="h-16 w-16 bg-blue-950 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-xl shadow-blue-100">
                  {selectedCoin.symbol}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-blue-950">
                    {selectedCoin.name}
                  </h2>
                  <p
                    className={`text-sm font-bold mt-1 ${selectedCoin.isPositive ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {selectedCoin.profit} Today
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Activity size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Market Cap
                    </span>
                  </div>
                  <p className="text-sm font-black text-blue-950">
                    {selectedCoin.marketCap}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <BarChart3 size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      24h Vol
                    </span>
                  </div>
                  <p className="text-sm font-black text-blue-950">
                    {selectedCoin.volume24h}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Coins size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Supply
                    </span>
                  </div>
                  <p className="text-sm font-black text-blue-950">
                    {selectedCoin.totalSupply}
                  </p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-3 py-5 bg-red-500 text-white rounded-3xl font-black hover:bg-red-600 transition-all shadow-xl shadow-red-100 active:scale-[0.98]">
                <ArrowUpRight size={22} strokeWidth={3} />
                <span>LIQUIDATE ASSETS (SELL)</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PortfolioPage;
