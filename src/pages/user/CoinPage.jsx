import { useState, useEffect } from "react";
import {
  TrendingUp,
  X,
  Info,
  ExternalLink,
  RefreshCcw,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function CoinPage() {
  const navigate = useNavigate();
  const [tradeType, setTradeType] = useState(null);
  const [lots, setLots] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const coinGeckoId = pathParts[2] || "bitcoin";

  const [coin, setCoin] = useState({
    id: coinGeckoId,
    name: "",
    symbol: "",
    price: "0.00",
    change: "0.00%",
    high24h: "$0",
    low24h: "$0",
    rawPrice: 0,
  });

  const tradingViewUrl = `https://s.tradingview.com/widgetembed/?hideideas=1&theme=Light&symbol=BINANCE:${coin.symbol}USDT`;
  const numericLots = parseFloat(lots) || 0;
  const totalAmount = numericLots * coin.rawPrice;

  // --- Fetch Metadata from CoinGecko ---
  useEffect(() => {
    const fetchMetadata = () => {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${coinGeckoId}`)
        .then((res) => {
          setCoin((prev) => ({
            ...prev,
            name: res.data.name,
            symbol: res.data.symbol.toUpperCase(),
          }));
        })
        .catch((err) => console.error("CoinGecko Metadata Error:", err));
    };
    fetchMetadata();
  }, [coinGeckoId]);

  // --- Fetch Live Price from Binance ---
  useEffect(() => {
    if (!coin.symbol) return;

    const fetchBinanceData = () => {
      const binanceSymbol = `${coin.symbol}USDT`;
      axios
        .get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${binanceSymbol}`,
        )
        .then((res) => {
          const data = res.data;
          const rawPrice = parseFloat(data.lastPrice);
          setCoin((prev) => ({
            ...prev,
            rawPrice: rawPrice,
            price: rawPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }),
            change: `${parseFloat(data.priceChangePercent).toFixed(2)}%`,
            high24h: parseFloat(data.highPrice).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }),
            low24h: parseFloat(data.lowPrice).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }),
          }));
          setLoading(false);
        })
        .catch((err) => {
          console.error("Binance Price Error:", err);
          setLoading(false);
        });
    };

    fetchBinanceData();
    const interval = setInterval(fetchBinanceData, 5000);
    return () => clearInterval(interval);
  }, [coin.symbol]);

  // --- Lots Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lots || String(lots).trim() === "") {
      toast.error("Lots are required");
      return;
    }

    const newLot = {
      coinName: coin.name,
      symbol: coin.symbol,
      buyingPrice: coin.rawPrice,
      lots: numericLots,
    };

    // const existingLots = JSON.parse(
    //   localStorage.getItem("holdingLots") || "[]",
    // );
    // const updatedLots = [...existingLots, newLot];
    const payload = { lots: JSON.stringify(newLot) };
    console.log("API payload:", payload);

    toast.success("Lots Bought successfully");
    setTradeType(null);
    setLots("");
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-slate-50 font-sans">
      <button
        onClick={() => navigate("/u/")}
        className="flex items-center gap-2 text-slate-400 hover:text-blue-950 transition-colors font-bold text-sm group"
      >
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
          <ChevronLeft size={18} />
        </div>
        Back to Dashboard
      </button>

      {/* Header Info */}
      <div className="flex justify-between items-center bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-950 text-white rounded-2xl flex items-center justify-center font-black shadow-lg uppercase">
            {coin.symbol || "..."}
          </div>
          <div>
            <h1 className="text-2xl font-black text-blue-950 tracking-tight">
              {coin.name || "Loading..."}
            </h1>
            <p
              className={`${parseFloat(coin.change) >= 0 ? "text-emerald-500" : "text-red-500"} text-xs font-bold flex items-center gap-1`}
            >
              <TrendingUp size={14} /> {coin.change}
              <span className="text-slate-300 font-medium ml-1">
                {loading ? "Syncing..." : "Binance Live"}
              </span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-blue-950 tracking-tighter">
            {coin.price}
          </p>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
            Market Index
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-4xl overflow-hidden shadow-2xl h-150 relative bg-white border border-slate-100">
            {coin.symbol && (
              <iframe
                title="TradingView"
                src={tradingViewUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="rounded-4xl"
              />
            )}
          </div>

          <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-blue-950 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={16} className="text-blue-900" /> Asset Overview
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Metadata provided by <strong>CoinGecko</strong>. Pricing and
              market stats streamed directly from <strong>Binance</strong>.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-4xl p-6 border border-slate-100 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Market Metrics
              </h3>
              {loading && (
                <RefreshCcw size={12} className="animate-spin text-slate-300" />
              )}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 italic">
                  24h High
                </span>
                <span className="text-sm font-black text-blue-950">
                  {coin.high24h}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 italic">
                  24h Low
                </span>
                <span className="text-sm font-black text-blue-950">
                  {coin.low24h}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setTradeType("buy")}
              className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Buy {coin.symbol} <ExternalLink size={14} />
            </button>
            <button
              onClick={() => setTradeType("sell")}
              className="w-full py-5 bg-white text-red-500 border-2 border-red-50 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95"
            >
              Sell {coin.symbol}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {tradeType && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTradeType(null)}
              className="absolute inset-0 bg-blue-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] p-10 shadow-2xl"
            >
              <button
                onClick={() => setTradeType(null)}
                className="absolute top-6 right-6 text-slate-300"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black text-blue-950 uppercase text-center mb-6">
                {tradeType} {coin.symbol}
              </h2>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Lots
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="0.0"
                  value={lots}
                  onChange={(e) => setLots(e.target.value)}
                  className="w-full bg-transparent text-xl font-black text-blue-950 outline-none"
                />
              </div>
              {tradeType !== "buy" ? (
                ""
              ) : (
                <>
                  <p className="text-right text-sm font-bold text-slate-500 mb-4">
                    Total:{" "}
                    <span className="text-blue-950 font-black">
                      {totalAmount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </p>
                </>
              )}
              <button
                className={`w-full py-4 rounded-2xl font-black text-white uppercase ${tradeType === "buy" ? "bg-emerald-500" : "bg-red-500"}`}
                onClick={handleSubmit}
              >
                Confirm Order
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CoinPage;
