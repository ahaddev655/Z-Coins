import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
);

const PnlChartComponent = () => {
  const rawPnl = JSON.parse(localStorage.getItem("PNL")) || [];

  // Group PnL by date
  const dailyPnl = {};

  rawPnl.forEach((item) => {
    if (!item?.date) return;

    const date = item.date; // use directly
    dailyPnl[date] = (dailyPnl[date] || 0) + Number(item.pnl || 0);
  });

  const labels = Object.keys(dailyPnl);
  const values = Object.values(dailyPnl);

  const netPnl = values.reduce((a, b) => a + b, 0);
  const isProfit = netPnl >= 0;

  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: isProfit ? "#21bf73" : "#d90429",
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(
            0,
            isProfit ? "rgba(33,191,115,0.3)" : "rgba(217,4,41,0.3)",
          );
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Weekly PnL</h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isProfit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          Net: {netPnl.toFixed(2)}
        </span>
      </div>

      <div className="h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PnlChartComponent;
