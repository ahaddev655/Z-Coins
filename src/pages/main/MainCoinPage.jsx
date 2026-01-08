import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import { Bounce, toast, ToastContainer } from "react-toastify";

function MainCoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [chartSeries, setChartSeries] = useState([]);
  const [popupType, setPopupType] = useState("");
  const [lots, setLots] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // -----------------------------
  // Fetch coin & OHLC chart data
  // -----------------------------
  useEffect(() => {
    if (!coinId) return;

    const controller = new AbortController();
    let isMounted = true;

    const fetchDataSafe = async () => {
      try {
        const [coinRes, ohlcRes] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
            signal: controller.signal,
          }),
          axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc`, {
            params: { vs_currency: "usd", days: 7 },
            signal: controller.signal,
          }),
        ]);

        if (!isMounted) return;

        setCoinData(coinRes.data);

        const candleData = ohlcRes.data.map((c) => ({
          x: new Date(c[0]),
          y: [c[1], c[2], c[3], c[4]], // open, high, low, close
        }));

        setChartSeries([{ data: candleData }]);
      } catch (err) {
        if (!axios.isCancel(err)) console.error(err);
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
  // Update total cost
  // -----------------------------
  useEffect(() => {
    if (!coinData) return;
    const price = coinData.market_data.current_price.usd;
    setTotalCost(lots * price);
  }, [lots, coinData]);

  // -----------------------------
  // Auth check
  // -----------------------------
  useEffect(() => {
    if (!localStorage.getItem("sessionToken")) navigate("/");
  }, [navigate]);

  // -----------------------------
  // Buy / Sell logic
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
        (c) => c.shortForm === selectedCoin.shortForm
      );

      if (existing) existing.lots += nLots;
      else
        yourCoins.push({
          ...selectedCoin,
          lots: nLots,
          buyPrice: selectedCoin.amount,
        });

      holdingValue -= totalTrade;
    } else {
      const coin = yourCoins.find(
        (c) => c.shortForm === selectedCoin.shortForm
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
    }

    localStorage.setItem(
      "yourCoins",
      JSON.stringify(yourCoins.filter((c) => c.lots > 0))
    );
    localStorage.setItem("PNL", JSON.stringify(PNL));
    localStorage.setItem("holdingValue", holdingValue.toFixed(2));

    toast.success(
      `${popupType.toUpperCase()} ${nLots} ${selectedCoin.shortForm}`
    );

    setPopupType("");
    setLots(1);
  };

  // -----------------------------
  // Apex Candle Options
  // -----------------------------
  const chartOptions = {
    chart: {
      type: "candlestick",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#21bf73",
          downward: "#d90429",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: { enabled: true },
    },
    grid: { show: false },
  };

  return (
    <div className="min-h-screen bg-cloud-white p-6">
      <ToastContainer autoClose={2500} transition={Bounce} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {coinData && (
          <div className="flex items-center gap-4">
            <img src={coinData.image.small} alt="" className="w-10 h-10" />
            <h1 className="text-2xl font-semibold hidden sm:block">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </h1>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setPopupType("buy")}
            className="px-4 py-2 bg-emerald-leaf text-white rounded-md"
          >
            Buy
          </button>
          <button
            onClick={() => setPopupType("sell")}
            className="px-4 py-2 bg-crimson-fire text-white rounded-md"
          >
            Sell
          </button>
        </div>
      </div>

      {/* Candlestick Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md h-[420px]">
        {chartSeries.length ? (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="candlestick"
            height="100%"
          />
        ) : (
          <p className="text-center">Loading chart...</p>
        )}
      </div>

      {/* Buy/Sell Popup */}
      {popupType && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setPopupType("")}
        >
          <div
            className="bg-white p-6 rounded-lg w-[360px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-xl font-semibold text-center mb-4">
              {popupType.toUpperCase()} {coinData.symbol.toUpperCase()}
            </h1>

            <input
              type="number"
              value={lots}
              onChange={(e) => setLots(Number(e.target.value))}
              className="w-full border p-2 rounded mb-3"
            />

            <p className="text-center mb-4 font-medium">
              Total: ${totalCost.toFixed(2)}
            </p>

            <button
              onClick={handleConfirm}
              className={`w-full py-3 text-white rounded-md ${
                popupType === "buy" ? "bg-emerald-leaf" : "bg-crimson-fire"
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
