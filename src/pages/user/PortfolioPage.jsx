import React, { useState, useEffect } from "react";
import { X, ArrowUpRight, BarChart3, CircleDollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function PortfolioPage() {
  // --- State Variables ---
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const userId = localStorage.getItem("id");
  const [userBalance, setUserBalance] = useState(null);
  // --- Helpers ---
  const parsePrice = (value) => Number(value) || 0;

  const profitCoin = (buyingPrice, currentPrice) => {
    return parsePrice(currentPrice) - parsePrice(buyingPrice);
  };

  const formatPnL = (value) => {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}$${Math.abs(value).toLocaleString()}`;
  };

  // --- Fetch Holdings ---
  const fetchHoldings = async () => {
    try {
      const response = await axios.get(
        `https://z-coins-backend.vercel.app/api/trade/holdings/${userId}`,
      );

      const rawHoldings = response?.data?.holdedCoins?.holdedCoins;

      const symbol = rawHoldings[0]?.symbol || rawHoldings[0]?.coinName;

      const binanceRes = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`,
      );

      const askPrice = Number(binanceRes?.data?.askPrice);

      if (isNaN(askPrice)) {
        toast.error("Invalid market data");
        return;
      }

      const formattedHoldings = rawHoldings.map((item) => ({
        id: item.coinName,
        symbol: item.symbol,
        name: item.coinName,
        buyingPrice: Number(item.buyingPrice) || 0,
        currentPrice: askPrice,
        volume24h: Number(binanceRes?.data?.quoteVolume)?.toFixed(2) || 0,
        value: askPrice,
        balance: Number(item.lots) || 0,
      }));

      setHoldings(formattedHoldings);
    } catch (error) {}
  };

  // --- Delete Holding ---
  const deleteHolding = (buyingPrice, currentPrice, coinSymbol) => {
    const bp = parsePrice(buyingPrice);
    const cp = parsePrice(currentPrice);

    if (isNaN(bp) || isNaN(cp)) {
      console.log("Invalid values:", { bp, cp });
      toast.error("Invalid price values");
      return;
    }

    const PNL = Math.round(Number(cp) - Number(bp));

    const newBalance = Math.round(Number(userBalance) + PNL);

    console.log("Sending:", { newBalance: newBalance, pnl: PNL });

    axios
      .delete(
        `https://z-coins-backend.vercel.app/api/trade/delete-holding/${userId}/${coinSymbol}`,
        { data: { newBalance } },
      )
      .then((response) => {
        toast.success(response?.data?.message);
        fetchHoldings();
        setSelectedCoin(null);
        // --- PNL Update API ---
        axios
          .put(`https://z-coins-backend.vercel.app/api/trade/update-pnl/${userId}`, {
            PNL: PNL,
          })
          .then((response) => {
            console.log(response?.data);
          })
          .catch(() => {});
        // --- Traded Coins Updated API ---
        axios
          .put(`https://z-coins-backend.vercel.app/api/trade/update-assets/${userId}`)
          .then((response) => {
            console.log(response?.data);
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  // --- Auto Refresh ---
  useEffect(() => {
    fetchHoldings();
    const interval = setInterval(fetchHoldings, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(`https://z-coins-backend.vercel.app/api/user/details/${userId}`)
      .then((response) => {
        console.log(response?.data);

        setUserBalance(response?.data.user_details.userBalance || "");
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6 relative">
      <ToastContainer
        theme="colored"
        autoClose={1000}
        hideProgressBar
        position="top-center"
      />
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
                          {coin?.symbol}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-blue-950">
                            {coin?.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {coin?.symbol}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-950">
                      {coin?.balance} {coin?.symbol}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">
                      ${coin?.buyingPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">
                      ${coin?.value.toLocaleString()}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-bold text-end ${
                        profitCoin(coin?.buyingPrice, coin?.currentPrice) >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatPnL(
                        profitCoin(coin?.buyingPrice, coin?.currentPrice),
                      )}
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
                    className={`text-sm font-bold mt-1 ${
                      profitCoin(
                        selectedCoin.buyingPrice,
                        selectedCoin.currentPrice,
                      ) >= 0
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatPnL(
                      profitCoin(
                        selectedCoin.buyingPrice,
                        selectedCoin.currentPrice,
                      ),
                    )}{" "}
                    Today
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
                    ${selectedCoin.buyingPrice.toLocaleString()}
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
                    ${selectedCoin.currentPrice}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  deleteHolding(
                    selectedCoin?.buyingPrice,
                    selectedCoin?.currentPrice,
                    selectedCoin?.symbol,
                  )
                }
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
