import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  TrendingUp,
  CircleDollarSign,
  TrendingDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function OverviewPage() {
  // --- UserData ---
  const [totalBalance, setTotalBalance] = useState("");
  const [totalPnl, setTotalPnl] = useState("");
  const [totalCoins, setTotalCoins] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [balanceHistory, setBalanceHistory] = useState([]);

  const userName = (fname, lname) => {
    const first = (fname || "").slice(0, 1);
    const last = (lname || "").slice(0, 1);
    const uname = `${first}${last}`.toUpperCase();
    return uname;
  };
  const userId = localStorage.getItem("id");
  const userDetails = () => {
    setIsUserLoading(true);
    axios
      .get(`http://z-coins-backend.vercel.app/api/user/details/${userId}`)
      .then((response) => {
        console.log(response?.data);

        setTotalBalance(response?.data.user_details.userBalance || "");
        setTotalCoins(response?.data.user_details.tradedCoins || "");
        setTotalPnl(response?.data.user_details.pnl || "");
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => {
          setIsUserLoading(false);
        }, 2000);
      });
  };
  useEffect(() => {
    if (userId) userDetails();
    else setIsUserLoading(false);
  }, [userId]);

  // --- Chart Logic ---

  const chartRef = useRef(null);
  const balanceHistoryKey = userId
    ? `balanceHistory:${userId}`
    : "balanceHistory";

  useEffect(() => {
    if (!userId) return;
    const savedHistory = localStorage.getItem(balanceHistoryKey);
    if (!savedHistory) return;

    try {
      const parsed = JSON.parse(savedHistory);
      if (!Array.isArray(parsed)) return;

      const normalized = parsed
        .map((item) => {
          if (typeof item === "number" || typeof item === "string") {
            const value = Number(item);
            return Number.isFinite(value) ? { day: "Older", value } : null;
          }
          const numValue = Number(item?.value);
          if (item?.day && Number.isFinite(numValue)) {
            return { day: item.day, value: numValue };
          }
          return null;
        })
        .filter(Boolean);

      setBalanceHistory(normalized);
    } catch (_) {}
  }, [userId, balanceHistoryKey]);

  useEffect(() => {
    const numericBalance = Number(totalBalance);
    if (!Number.isFinite(numericBalance)) return;
    const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

    setBalanceHistory((prev) => {
      if (!prev.length) {
        const first = [{ day: today, value: numericBalance }];
        localStorage.setItem(balanceHistoryKey, JSON.stringify(first));
        return first;
      }

      const updated = [...prev];
      const lastEntry = updated[updated.length - 1];
      if (lastEntry.day === today) {
        if (lastEntry.value === numericBalance) return prev;
        updated[updated.length - 1] = { day: today, value: numericBalance };
      } else {
        if (lastEntry.value === numericBalance) return prev;
        updated.push({ day: today, value: numericBalance });
      }

      localStorage.setItem(balanceHistoryKey, JSON.stringify(updated));
      return updated;
    });
  }, [totalBalance, balanceHistoryKey]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new ApexCharts(chartRef.current, {
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
          data: balanceHistory.map((item) => item.value),
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
        categories: balanceHistory.map((item) => item.day),
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { show: false },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
      colors: ["#1e3a8a"],
    });
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [balanceHistory]);

  const stats = [
    {
      label: "Total Balance",
      value: `$${Number(totalBalance).toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "PNL",
      value: `${totalPnl > 0 ? "+" : totalPnl < 0 ? "-" : ""}${Number(
        totalPnl,
      ).toLocaleString()}`,
      icon: totalPnl > 0 ? TrendingUp : TrendingDown,
      color: totalPnl > 0 ? "text-emerald-600" : "text-red-600",
      bg: totalPnl > 0 ? "bg-emerald-50" : "bg-red-50",
    },
    {
      label: "Total Assets",
      value: `${Number(totalCoins).toLocaleString()} Coins`,
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
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-fit">
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
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
