import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CircleDot,
} from "lucide-react";
import { motion } from "framer-motion";

function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Comprehensive Transaction Mock Data
  const transactions = [
    {
      id: "TXN-90210",
      type: "buy",
      coin: "Bitcoin",
      symbol: "BTC",
      amount: "0.045",
      priceAtTime: "$64,200.50",
      totalValue: "$2,889.02",
      date: "May 08, 2026",
      time: "14:22",
      status: "completed",
    },
    {
      id: "TXN-88421",
      type: "sell",
      coin: "Ethereum",
      symbol: "ETH",
      amount: "1.20",
      priceAtTime: "$3,450.12",
      totalValue: "$4,140.14",
      date: "May 07, 2026",
      time: "09:15",
      status: "completed",
    },
    {
      id: "TXN-77321",
      type: "buy",
      coin: "Solana",
      symbol: "SOL",
      amount: "15.0",
      priceAtTime: "$145.80",
      totalValue: "$2,187.00",
      date: "May 05, 2026",
      time: "18:45",
      status: "pending",
    },
    {
      id: "TXN-66504",
      type: "sell",
      coin: "Dogecoin",
      symbol: "DOGE",
      amount: "12,500",
      priceAtTime: "$0.16",
      totalValue: "$2,000.00",
      date: "May 03, 2026",
      time: "11:30",
      status: "completed",
    },
  ];

  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-black text-blue-950 tracking-tight uppercase">
            Activity History
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Track your recent buy and sell orders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold
          text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* --- Search & Filters --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 transition-all
            text-sm font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl
            text-sm font-bold border border-slate-100"
          >
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* --- Transactions Table --- */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                <th className="px-8 py-5">Transaction</th>
                <th className="px-8 py-5">Date & Time</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Total Value</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                          txn.type === "buy"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {txn.type === "buy" ? (
                          <ArrowDownLeft size={20} />
                        ) : (
                          <ArrowUpRight size={20} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-950 capitalize">
                          {txn.type} {txn.coin}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                          ID: {txn.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-sm font-bold text-blue-950">
                        <Calendar size={12} className="text-slate-400" />{" "}
                        {txn.date}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                        <Clock size={10} /> {txn.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-blue-950">
                      {txn.amount} {txn.symbol}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      @ {txn.priceAtTime}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-blue-950">
                    {txn.totalValue}
                  </td>
                  <td className="px-8 py-5">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        txn.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : txn.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      <CircleDot size={10} />
                      {txn.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Empty State --- */}
        {filteredTransactions.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">
              No transactions found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
