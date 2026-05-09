import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  SearchX,
  X,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MarketPage() {
  const navigate = useNavigate();

  // --- UI State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isTrading, setIsTrading] = useState(false);

  // --- API Data State ---
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Trade Logic State ---
  const [usdInput, setUsdInput] = useState("");
  const [cryptoOutput, setCryptoOutput] = useState("0");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          per_page: 50,
          page: 1,
        },
      })
      .then((geckoRes) => {
        const coinData = geckoRes.data;

        const requests = coinData.map((coin) => {
          const binanceSymbol = `${coin.symbol.toUpperCase()}USDT`;

          return axios
            .get(
              `https://api.binance.com/api/v3/ticker/24hr?symbol=${binanceSymbol}`,
            )
            .then((binanceRes) => ({
              // ✅ ONLY using name & symbol from CoinGecko
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol.toUpperCase(),

              // ✅ Everything else from Binance (UI unchanged)
              price: `$${parseFloat(binanceRes.data.lastPrice).toLocaleString()}`,
              change: `${parseFloat(binanceRes.data.priceChangePercent).toFixed(
                2,
              )}%`,
              vol: `$${Math.round(binanceRes.data.quoteVolume).toLocaleString()}`,

              low24h: `$${parseFloat(binanceRes.data.lowPrice).toLocaleString()}`,
              high24h: `$${parseFloat(
                binanceRes.data.highPrice,
              ).toLocaleString()}`,

              // ✅ Removed CoinGecko-derived market data
              ath: "N/A",
              athDate: "N/A",
              rank: "N/A",

              sentiment:
                parseFloat(binanceRes.data.priceChangePercent) > 0
                  ? "Bullish"
                  : "Bearish",
            }))
            .catch(() => null);
        });

        return Promise.all(requests);
      })
      .then((results) => {
        setCoins(results.filter((c) => c !== null));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error syncing market data:", err);
        setLoading(false);
      });
  }, []);

  const handleUsdChange = (val) => {
    setUsdInput(val);
    setCryptoOutput("0.00"); // Calculation disabled as price data was removed
  };

  const executeTrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTradeSuccess(true);
      setTimeout(() => {
        setTradeSuccess(false);
        setSelectedCoin(null);
        setIsTrading(false);
        setUsdInput("");
        setCryptoOutput("0");
      }, 2500);
    }, 2000);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCoins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCoins.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-blue-950">
        Syncing Coin List...
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-blue-950 tracking-tight">
            Market Explorer
          </h1>
          <p className="text-sm text-slate-500 font-medium">Live Asset Index</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search coins..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 transition-all font-medium text-sm text-blue-950"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredCoins.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
                    <th className="px-8 py-5">Coin</th>
                    <th className="px-8 py-5">Price</th>
                    <th className="px-8 py-5">24h Change</th>
                    <th className="px-8 py-5 hidden md:table-cell">
                      24h Volume
                    </th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {currentItems.map((coin) => (
                    <tr
                      key={coin.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-blue-950 text-white rounded-xl flex items-center justify-center font-bold text-xs">
                            {coin.symbol.substring(0, 3)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-blue-950">
                              {coin.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-blue-950">
                        {coin.price}
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold flex items-center gap-1 text-slate-400">
                          <Activity size={14} /> {coin.change}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-500 hidden md:table-cell">
                        {coin.vol}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => {
                            setSelectedCoin(coin);
                            setIsTrading(false);
                          }}
                          className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-900 hover:text-white transition-all"
                        >
                          Analyze
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 border-t border-slate-50 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400">
                Showing {currentItems.length} assets out of {coins.length}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="p-2 rounded-xl border border-slate-100 disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 rounded-xl border border-slate-100 disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchX size={48} className="text-slate-300 mb-4" />
            <h2 className="text-xl font-black text-blue-950">
              No results found
            </h2>
          </div>
        )}
      </div>

      {/* Detail Popup */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 overflow-hidden"
            >
              <button
                onClick={() => setSelectedCoin(null)}
                className="absolute top-6 right-6 text-slate-400"
              >
                <X size={20} />
              </button>

              {tradeSuccess ? (
                <div className="text-center py-10">
                  <CheckCircle2
                    size={60}
                    className="mx-auto text-emerald-500 mb-4"
                  />
                  <h2 className="text-2xl font-black text-blue-950">
                    Success!
                  </h2>
                  <p className="text-sm text-slate-500">
                    Transaction confirmed.
                  </p>
                </div>
              ) : !isTrading ? (
                <div className="text-left">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-blue-950 text-white rounded-2xl flex items-center justify-center text-xl font-black">
                        {selectedCoin.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-black text-blue-950">
                            {selectedCoin.name}
                          </h2>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold">
                            Rank #{selectedCoin.rank}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-400">
                          {selectedCoin.symbol} / USDT
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-blue-950">
                        {selectedCoin.price}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      {
                        label: "24h Volume",
                        val: selectedCoin.vol,
                        icon: <BarChart3 size={14} />,
                      },
                      {
                        label: "Sentiment",
                        val: selectedCoin.sentiment,
                        icon: <Activity size={14} />,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          {item.icon}
                          <span className="text-[10px] font-bold uppercase">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-sm font-black text-blue-950">
                          {item.val}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() =>
                        navigate(`/coin/${selectedCoin.id?.toLowerCase()}`)
                      }
                      className="w-full flex items-center justify-center gap-2 py-4 bg-blue-950 text-white rounded-2xl font-bold"
                    >
                      <Eye size={18} /> View Asset
                    </button>
                    <button
                      onClick={() => setIsTrading(true)}
                      className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold"
                    >
                      Quick Trade
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-blue-950">
                        Quick Trade
                      </h2>
                      <p className="text-xs text-slate-400 font-bold uppercase">
                        Symbol: {selectedCoin.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                        Amount (USD)
                      </label>
                      <input
                        type="number"
                        value={usdInput}
                        onChange={(e) => handleUsdChange(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-2xl font-black text-blue-950 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    disabled={isProcessing || !usdInput}
                    onClick={executeTrade}
                    className="w-full py-5 bg-emerald-500 text-white rounded-3xl font-black"
                  >
                    {isProcessing ? "Connecting..." : "Confirm Trade"}
                  </button>
                  <button
                    onClick={() => setIsTrading(false)}
                    className="w-full mt-4 text-xs font-bold text-slate-400"
                  >
                    Back to Details
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MarketPage;
