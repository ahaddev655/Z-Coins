import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bounce, toast, ToastContainer } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function MainCoinPage() {
  const { coinId } = useParams();

  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [buySellPopUp, setBuySellPopUp] = useState(""); // "buy" or "sell"
  const [lots, setLots] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  const intervalRef = useRef(null);

  // Fetch coin info
  const fetchCoinData = async (signal) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        { signal },
      );
      setCoinData(res.data);
    } catch (error) {
      if (!axios.isCancel(error))
        console.error("Error fetching coin data:", error);
    }
  };

  // Fetch chart data
  const fetchChartData = async (signal) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        { params: { vs_currency: "usd", days: 7 }, signal },
      );

      const labels = res.data.prices.map((p) => {
        const date = new Date(p[0]);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      });

      const prices = res.data.prices.map((p) => p[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: `${coinId.toUpperCase()} Price`,
            data: prices,
            borderColor: "#0063f5",
            backgroundColor: "rgba(0, 99, 245, 0.2)",
            tension: 0.3,
          },
        ],
      });
    } catch (error) {
      if (!axios.isCancel(error))
        console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    if (!coinId) return;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAll = () => {
      fetchCoinData(signal);
      fetchChartData(signal);
    };

    fetchAll();

    intervalRef.current = setInterval(fetchAll, 20_000);

    return () => {
      controller.abort();
      clearInterval(intervalRef.current);
    };
  }, [coinId]);

  // Update total cost
  useEffect(() => {
    if (coinData) {
      setTotalCost(lots * coinData.market_data.current_price.usd);
    }
  }, [lots, coinData]);

  /* ================= BUY/SELL LOGIC ================= */
  const handleConfirm = () => {
    const nLots = Number(lots);
    if (!nLots || nLots <= 0) return;

    const selectedCoin = {
      name: coinData.name,
      shortForm: coinData.symbol.toUpperCase(),
      amount: coinData.market_data.current_price.usd,
    };

    const yourCoins = JSON.parse(localStorage.getItem("yourCoins")) || [];
    const PNL = JSON.parse(localStorage.getItem("PNL")) || [];
    let holdingValue = Number(localStorage.getItem("holdingValue") || 0);

    const totalTradeValue = nLots * selectedCoin.amount;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    if (buySellPopUp === "buy") {
      if (holdingValue < totalTradeValue) {
        toast.error("Not enough funds to complete this purchase.");
        return;
      }

      const existing = yourCoins.find(
        (c) => c.shortForm === selectedCoin.shortForm,
      );
      existing
        ? (existing.lots += nLots)
        : yourCoins.push({
            ...selectedCoin,
            lots: nLots,
            buyPrice: selectedCoin.amount,
          });

      holdingValue -= totalTradeValue;
      localStorage.setItem("yourCoins", JSON.stringify(yourCoins));
      localStorage.setItem("holdingValue", holdingValue.toFixed(2));
    }

    if (buySellPopUp === "sell") {
      const coin = yourCoins.find(
        (c) => c.shortForm === selectedCoin.shortForm,
      );
      if (!coin || coin.lots < nLots) {
        toast.error("You do not have enough coins to sell.");
        return;
      }

      coin.lots -= nLots;
      const pnl = (selectedCoin.amount - coin.buyPrice) * nLots;

      PNL.push({
        name: selectedCoin.name,
        shortForm: selectedCoin.shortForm,
        lots: nLots,
        pnl,
        soldAt: selectedCoin.amount,
        date: today, // ✅ Add the date here
      });

      holdingValue += nLots * selectedCoin.amount;
      localStorage.setItem("PNL", JSON.stringify(PNL));
      localStorage.setItem(
        "yourCoins",
        JSON.stringify(yourCoins.filter((c) => c.lots > 0)),
      );
      localStorage.setItem("holdingValue", holdingValue.toFixed(2));
    }

    toast.success(
      `${buySellPopUp.toUpperCase()} ${nLots} ${
        selectedCoin.shortForm
      } for $${totalTradeValue.toFixed(2)}`,
    );
    setBuySellPopUp("");
    setLots(1);
  };

  if (!coinData || !chartData)
    return <p className="text-center mt-10">Loading coin data...</p>;

  return (
    <div className="min-h-screen bg-cloud-white p-6">
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="light"
        transition={Bounce}
      />
      {/* Coin Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src={coinData.image.small}
            alt={coinData.name}
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-semibold">
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setBuySellPopUp("buy")}
            className="px-4 py-2 rounded-md bg-emerald-leaf text-white font-semibold hover:bg-green-600 transition"
          >
            Buy
          </button>
          <button
            onClick={() => setBuySellPopUp("sell")}
            className="px-4 py-2 rounded-md bg-crimson-fire text-white font-semibold hover:bg-red-600 transition"
          >
            Sell
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Line data={chartData} />
      </div>

      {/* Buy/Sell PopUp */}
      {(buySellPopUp === "buy" || buySellPopUp === "sell") && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50"
          onClick={() => setBuySellPopUp("")}
        >
          <div
            className="bg-cloud-white p-6 rounded-lg w-[360px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center text-xl font-semibold mb-4">
              {buySellPopUp.toUpperCase()} {coinData.symbol.toUpperCase()}
            </h1>
            <input
              type="number"
              value={lots}
              onChange={(e) => setLots(Number(e.target.value))}
              className="w-full border border-silver-fog p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
              step={0.1}
            />
            <p className="text-center font-medium mb-4">
              Total: ${totalCost.toFixed(2)}
            </p>
            <button
              onClick={handleConfirm}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                buySellPopUp === "buy"
                  ? "bg-emerald-leaf hover:bg-green-600"
                  : "bg-crimson-fire hover:bg-red-600"
              } transition`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainCoinPage;
