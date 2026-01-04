import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const PnlChartComponent = () => {
  const colors = {
    dark: "#212529",
    silver: "#dfe2e4",
    success: "#21bf73",
    danger: "#d90429",
    light: "#f8f9fa",
  };

  const pnlValues = [200, -150, 450, -300, 700, -200, 1000];

  const pnlChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Net PnL",
        data: pnlValues,
        borderColor:
          pnlValues[pnlValues.length - 1] >= 0 ? colors.success : colors.danger,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(
            0,
            pnlValues[pnlValues.length - 1] >= 0
              ? "rgba(33,191,115,0.3)"
              : "rgba(217,4,41,0.3)",
          );
          gradient.addColorStop(1, "rgba(255,255,255,0)");
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: colors.light,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.dark,
        titleColor: colors.light,
        bodyColor: colors.light,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: colors.dark },
      },
      y: {
        grid: { color: colors.silver },
        ticks: { color: colors.dark },
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Weekly PnL</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            pnlValues.reduce((a, b) => a + b, 0) >= 0
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          Net: {pnlValues.reduce((a, b) => a + b, 0)}
        </span>
      </div>

      <div className="h-72">
        <Line data={pnlChartData} options={options} />
      </div>
    </div>
  );
};

export default PnlChartComponent;
