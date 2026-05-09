import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Coins,
  SearchX,
  X,
  Zap,
  ShoppingCart,
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

  // --- Real-Life Trade Logic State ---
  const [usdInput, setUsdInput] = useState("");
  const [cryptoOutput, setCryptoOutput] = useState("0");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);

  const itemsPerPage = 6;

  // Mock Data
  const allCoins = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      price: "$64,200.50",
      change: "+2.45%",
      cap: "$1.2T",
      vol: "$35B",
      supply: "19.7M BTC",
      low24h: "$62,100",
      high24h: "$65,800",
      ath: "$73,737",
      athDate: "Mar 14, 2024",
      rank: "#1",
      sentiment: "Bullish",
      dominance: "52.4%",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,450.12",
      change: "+1.15%",
      cap: "$415B",
      vol: "$12B",
      supply: "120M ETH",
      low24h: "$3,380",
      high24h: "$3,520",
      ath: "$4,878",
      athDate: "Nov 10, 2021",
      rank: "#2",
      sentiment: "Neutral",
      dominance: "17.2%",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      price: "$145.80",
      change: "-4.20%",
      cap: "$64B",
      vol: "$4B",
      supply: "448M SOL",
      low24h: "$142",
      high24h: "$158",
      ath: "$259.96",
      athDate: "Nov 06, 2021",
      rank: "#5",
      sentiment: "Bearish",
      dominance: "3.1%",
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      price: "$0.45",
      change: "+0.85%",
      cap: "$16B",
      vol: "$400M",
      supply: "35B ADA",
      low24h: "$0.43",
      high24h: "$0.48",
      ath: "$3.09",
      athDate: "Sep 02, 2021",
      rank: "#10",
      sentiment: "Neutral",
      dominance: "0.8%",
    },
    {
      id: "ripple",
      name: "Ripple",
      symbol: "XRP",
      price: "$0.62",
      change: "-1.10%",
      cap: "$34B",
      vol: "$1.2B",
      supply: "55B XRP",
      low24h: "$0.60",
      high24h: "$0.65",
      ath: "$3.40",
      athDate: "Jan 04, 2018",
      rank: "#7",
      sentiment: "Neutral",
      dominance: "1.5%",
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      price: "$7.20",
      change: "+5.30%",
      cap: "$10B",
      vol: "$200M",
      supply: "1.4B DOT",
      low24h: "$6.80",
      high24h: "$7.50",
      ath: "$54.98",
      athDate: "Nov 04, 2021",
      rank: "#15",
      sentiment: "Bullish",
      dominance: "0.5%",
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      price: "$0.16",
      change: "+12.4%",
      cap: "$23B",
      vol: "$2.5B",
      supply: "144B DOGE",
      low24h: "$0.14",
      high24h: "$0.19",
      ath: "$0.73",
      athDate: "May 08, 2021",
      rank: "#9",
      sentiment: "Bullish",
      dominance: "1.1%",
    },
    {
      id: "chainlink",
      name: "Chainlink",
      symbol: "LINK",
      price: "$18.50",
      change: "-2.15%",
      cap: "$11B",
      vol: "$500M",
      supply: "587M LINK",
      low24h: "$17.90",
      high24h: "$19.20",
      ath: "$52.70",
      athDate: "May 10, 2021",
      rank: "#14",
      sentiment: "Neutral",
      dominance: "0.6%",
    },
  ];

  // --- Real-Life Calculation Helpers ---
  const parsePrice = (priceStr) => parseFloat(priceStr.replace(/[$,]/g, ""));

  const handleUsdChange = (val) => {
    setUsdInput(val);
    if (!val || val <= 0) {
      setCryptoOutput("0");
      return;
    }
    const price = parsePrice(selectedCoin.price);
    const result = val / price;
    setCryptoOutput(result.toFixed(6));
  };

  const executeTrade = () => {
    setIsProcessing(true);
    // Simulate Blockchain Latency
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

  // --- Filtering & Pagination ---
  const filteredCoins = allCoins.filter(
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-blue-950 tracking-tight">
            Market Explorer
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Live Asset Trading & Analysis
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search coins (BTC, ETH...)"
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
                      Market Cap
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
                            {coin.symbol}
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
                        <span
                          className={`text-xs font-bold flex items-center gap-1 ${coin.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                        >
                          {coin.change.startsWith("+") ? (
                            <TrendingUp size={14} />
                          ) : (
                            <TrendingDown size={14} />
                          )}
                          {coin.change}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-500 hidden md:table-cell">
                        {coin.cap}
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
            {/* Pagination */}
            <div className="p-6 border-t border-slate-50 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-400">
                Total: {filteredCoins.length} assets
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
            <p className="text-sm text-slate-400 mt-2 font-medium">
              Try checking your spelling or search for another coin.
            </p>
          </div>
        )}
      </div>

      {/* --- Popup Logic --- */}
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
                    Transaction confirmed on blockchain.
                  </p>
                </div>
              ) : !isTrading ? (
                /* --- Inside the Popup AnimatePresence, replace the !isTrading block with this --- */
                <div className="text-left">
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-blue-950 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg">
                        {selectedCoin.symbol}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-black text-blue-950">
                            {selectedCoin.name}
                          </h2>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-tighter">
                            Rank {selectedCoin.rank}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-400">
                          {selectedCoin.symbol} / USD
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-blue-950">
                        {selectedCoin.price}
                      </p>
                      <p
                        className={`text-xs font-bold ${selectedCoin.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {selectedCoin.change} (24h)
                      </p>
                    </div>
                  </div>

                  {/* 24h Price Gauge */}
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>24h Low: {selectedCoin.low24h}</span>
                      <span>24h High: {selectedCoin.high24h}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }} // Simulated current position between low and high
                        className="h-full bg-blue-950 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Detailed Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      {
                        label: "Market Cap",
                        val: selectedCoin.cap,
                        icon: <Activity size={14} />,
                      },
                      {
                        label: "Volume (24h)",
                        val: selectedCoin.vol,
                        icon: <BarChart3 size={14} />,
                      },
                      {
                        label: "Circ. Supply",
                        val: selectedCoin.supply,
                        icon: <Coins size={14} />,
                      },
                      {
                        label: "Market Dom.",
                        val: selectedCoin.dominance,
                        icon: <Zap size={14} />,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-3 bg-slate-50 rounded-2xl border border-slate-100"
                      >
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                          {item.icon}
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-sm font-black text-blue-950">
                          {item.val}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Sentiment & ATH Section */}
                  <div className="bg-blue-50/50 rounded-3xl p-4 mb-8 border border-blue-100/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-blue-400 uppercase">
                        Market Sentiment
                      </span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {selectedCoin.sentiment}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold text-blue-400 uppercase">
                          All-Time High
                        </p>
                        <p className="text-sm font-black text-blue-950">
                          {selectedCoin.ath}
                        </p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400">
                        {selectedCoin.athDate}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => navigate(`/coin/${selectedCoin.id}`)}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-blue-950 text-white rounded-2xl font-bold hover:bg-blue-900 transition-all active:scale-95 shadow-lg shadow-blue-100"
                    >
                      <Eye size={18} />
                      Open Full Technical Chart
                    </button>
                    <button
                      onClick={() => setIsTrading(true)}
                      className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-100 transition-all active:scale-95 border border-emerald-100"
                    >
                      Buy {selectedCoin.name}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-blue-950">
                        Quick Trade
                      </h2>
                      <p className="text-xs text-slate-400 font-bold uppercase">
                        Price: {selectedCoin.price}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                        Spend (USD)
                      </label>
                      <input
                        type="number"
                        value={usdInput}
                        onChange={(e) => handleUsdChange(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-2xl font-black text-blue-950 outline-none"
                      />
                    </div>
                    <div className="p-4 bg-emerald-50/50 rounded-2xl">
                      <label className="text-[10px] font-black text-emerald-600 uppercase block mb-1">
                        Receive ({selectedCoin.symbol})
                      </label>
                      <p className="text-2xl font-black text-blue-950">
                        {cryptoOutput}
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={isProcessing || !usdInput}
                    onClick={executeTrade}
                    className="w-full py-5 bg-emerald-500 text-white rounded-3xl font-black shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all uppercase"
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
