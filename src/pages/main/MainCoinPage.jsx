import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Line } from "react-chartjs-2";

function MainCoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [popupType, setPopupType] = useState("");
  const [lots, setLots] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // -----------------------------
  // Fetch coin & chart data safely
  // -----------------------------
  useEffect(() => {
    if (!coinId) return;

    const controller = new AbortController();
    let isMounted = true; // flag to prevent state update after unmount

    const fetchDataSafe = async () => {
      try {
        const [coinRes, chartRes] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
            signal: controller.signal,
          }),
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
            {
              params: { vs_currency: "usd", days: 7 },
              signal: controller.signal,
            },
          ),
        ]);

        if (!isMounted) return; // do not update state if unmounted

        setCoinData(coinRes.data);

        const labels = chartRes.data.prices.map((p) => {
          const date = new Date(p[0]);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        });

        const prices = chartRes.data.prices.map((p) => p[1]);

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
        if (!axios.isCancel(error)) console.error("Fetch error:", error);
      }
    };

    fetchDataSafe();
    intervalRef.current = setInterval(fetchDataSafe, 20000);

    return () => {
      isMounted = false;
      controller.abort();
      clearInterval(intervalRef.current);
    };
  }, [coinId]);

  // -----------------------------
  // Update total cost when lots or price changes
  // -----------------------------
  useEffect(() => {
    if (coinData) {
      const price = coinData?.market_data?.current_price?.usd || 0;
      setTotalCost(lots * price);
    }
  }, [lots, coinData]);

  // -----------------------------
  // Redirect if not logged in
  // -----------------------------
  useEffect(() => {
    if (!localStorage.getItem("sessionToken")) navigate("/");
  }, [navigate]);

  // -----------------------------
  // Buy/Sell confirmation logic
  // -----------------------------
  const handleConfirm = () => {
    const nLots = Number(lots);
    if (!nLots || nLots <= 0) return toast.error("Invalid lot value.");

    const selectedCoin = {
      name: coinData.name,
      shortForm: coinData.symbol.toUpperCase(),
      amount: coinData.market_data.current_price.usd,
    };

    const yourCoins = JSON.parse(localStorage.getItem("yourCoins")) || [];
    const PNL = JSON.parse(localStorage.getItem("PNL")) || [];
    let holdingValue = Number(localStorage.getItem("holdingValue") || 0);
    const totalTrade = nLots * selectedCoin.amount;
    const today = new Date().toISOString().slice(0, 10);

    if (popupType === "buy") {
      if (holdingValue < totalTrade) return toast.error("Not enough funds.");

      const existing = yourCoins.find(
        (c) => c.shortForm === selectedCoin.shortForm,
      );

      if (existing) {
        existing.lots += nLots;
      } else {
        yourCoins.push({
          ...selectedCoin,
          lots: nLots,
          buyPrice: selectedCoin.amount,
        });
      }

      holdingValue -= totalTrade;
    } else if (popupType === "sell") {
      const coin = yourCoins.find(
        (c) => c.shortForm === selectedCoin.shortForm,
      );

      if (!coin || coin.lots < nLots)
        return toast.error("Not enough coins to sell.");

      coin.lots -= nLots;
      PNL.push({
        name: coin.name,
        shortForm: coin.shortForm,
        lots: nLots,
        pnl: (selectedCoin.amount - coin.buyPrice) * nLots,
        soldAt: selectedCoin.amount,
        date: today,
      });

      holdingValue += totalTrade;

      // Remove coins with 0 lots
      const filteredCoins = yourCoins.filter((c) => c.lots > 0);
      localStorage.setItem("yourCoins", JSON.stringify(filteredCoins));
    }

    localStorage.setItem("PNL", JSON.stringify(PNL));
    localStorage.setItem("yourCoins", JSON.stringify(yourCoins));
    localStorage.setItem("holdingValue", holdingValue.toFixed(2));

    toast.success(
      `${popupType.toUpperCase()} ${nLots} ${
        selectedCoin.shortForm
      } for $${totalTrade.toFixed(2)}`,
    );

    setPopupType("");
    setLots(1);
  };

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
        {coinData && (
          <div className="flex items-center gap-4">
            <img
              src={coinData.image.small}
              alt={coinData.name}
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-semibold sm:block hidden">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </h1>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setPopupType("buy")}
            className="px-4 py-2 rounded-md bg-emerald-leaf text-white font-semibold hover:bg-green-600"
          >
            Buy
          </button>
          <button
            onClick={() => setPopupType("sell")}
            className="px-4 py-2 rounded-md bg-crimson-fire text-white font-semibold hover:bg-red-600"
          >
            Sell
          </button>
        </div>
      </div>

      {/* Responsive Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md h-[400px]">
        {chartData ? (
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        ) : (
          <p className="text-center">Loading chart...</p>
        )}
      </div>

      {/* Buy/Sell PopUp */}
      {popupType && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50"
          onClick={() => setPopupType("")}
        >
          <div
            className="bg-cloud-white p-6 rounded-lg w-[360px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center text-xl font-semibold mb-4">
              {popupType.toUpperCase()} {coinData.symbol.toUpperCase()}
            </h1>
            <input
              type="number"
              value={lots}
              onChange={(e) => setLots(Number(e.target.value))}
              className="w-full border p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
              step={0.1}
            />
            <p className="text-center font-medium mb-4">
              Total: ${totalCost.toFixed(2)}
            </p>
            <button
              onClick={handleConfirm}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                popupType === "buy"
                  ? "bg-emerald-leaf hover:bg-green-600"
                  : "bg-crimson-fire hover:bg-red-600"
              }`}
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
