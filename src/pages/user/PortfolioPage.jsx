import React, { useState } from "react";
import { X, ArrowUpRight, BarChart3, CircleDollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function PortfolioPage() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  const holdings = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      balance: 0.452,
      value: 29018.4,
      avgPrice: "$52,100",
      profit: "+12.4%",
      buyingPrice: "$47,800",
      currentPrice: "$64,200",
      investedAmount: "$21,605.60",
      volume24h: "$35.2B",
      description: "Bitcoin is the first decentralized digital currency.",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: 4.12,
      value: 14214.0,
      avgPrice: "$3,100",
      profit: "+11.2%",
      buyingPrice: "$2,750",
      currentPrice: "$3,450",
      investedAmount: "$11,330.00",
      volume24h: "$12.8B",
      description: "Ethereum is a smart contract platform.",
    },
    {
      name: "Solana",
      symbol: "SOL",
      balance: 124.5,
      value: 18052.5,
      avgPrice: "$165",
      profit: "-12.1%",
      buyingPrice: "$178",
      currentPrice: "$145",
      investedAmount: "$22,161.00",
      volume24h: "$4.1B",
      description: "Solana is a high-performance blockchain.",
    },
  ];

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
                  <th className="px-6 py-4">Buying Price</th>
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
                        <div
                          className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center font-black text-xs
                        text-blue-900 group-hover:bg-white transition-colors"
                        >
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
                      {coin.buyingPrice}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">
                      ${coin.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-sm">
                      <span
                        className={
                          coin.profit.startsWith("+")
                            ? "text-emerald-500"
                            : "text-red-500"
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
              <button
                onClick={() => setSelectedCoin(null)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-5 mb-10">
                <div
                  className="h-16 w-16 bg-blue-950 rounded-2xl flex items-center justify-center text-white text-xl font-black
                shadow-xl shadow-blue-100"
                >
                  {selectedCoin.symbol}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-blue-950">
                    {selectedCoin.name}
                  </h2>
                  <p
                    className={`text-sm font-bold mt-1 ${selectedCoin.profit.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {selectedCoin.profit} Today
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <CircleDollarSign size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Buying Price
                    </span>
                  </div>
                  <p className="text-sm font-black text-blue-950">
                    {selectedCoin.buyingPrice}
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
                    {selectedCoin.currentPrice}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <CircleDollarSign size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Invested
                    </span>
                  </div>
                  <p className="text-sm font-black text-blue-950">
                    {selectedCoin.investedAmount}
                  </p>
                </div>
              </div>
              <button
                className="w-full flex items-center justify-center gap-3 py-5 bg-red-500 text-white rounded-3xl font-black
              hover:bg-red-600 transition-all shadow-xl shadow-red-100 active:scale-[0.98]"
              >
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
