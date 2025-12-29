import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

const PnlChartComponent = () => {
  const chartColors = {
    dark: "#212529",
    darkSecondary: "#343a40",
    silver: "#dfe2e4",
    light: "#f8f9fa",
    success: "#21bf73",
    danger: "#d90429",
    mint: "#dcf9eb",
    blush: "#ffebee",
    primary: "#0063f5",
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: chartColors.dark,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: chartColors.dark,
        titleColor: chartColors.light,
        bodyColor: chartColors.light,
        borderColor: chartColors.primary,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: chartColors.silver,
          drawBorder: false,
        },
        ticks: {
          color: chartColors.darkSecondary,
        },
      },
      y: {
        grid: {
          color: chartColors.silver,
          drawBorder: false,
        },
        ticks: {
          color: chartColors.darkSecondary,
        },
      },
    },
  };

  const pnlChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Profit",
        data: [200, 450, 300, 700, 600, 850, 1000],
        borderColor: chartColors.success,
        backgroundColor: chartColors.mint,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: chartColors.success,
        pointBorderColor: chartColors.light,
        pointBorderWidth: 2,
      },
      {
        label: "Loss",
        data: [-150, -300, -180, -400, -250, -200, -350],
        borderColor: chartColors.danger,
        backgroundColor: chartColors.blush,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: chartColors.danger,
        pointBorderColor: chartColors.light,
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg md:col-span-2">
      <div>
        {/* PnL Line Chart */}
        <div
          className="bg-white p-4 rounded-xl border"
          style={{ borderColor: chartColors.silver }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-lg font-semibold"
              style={{ color: chartColors.dark }}
            >
              Weekly PnL
            </h2>
            <div className="flex gap-2">
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: chartColors.mint,
                  color: chartColors.success,
                }}
              >
                Profit: +1,000
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: chartColors.blush,
                  color: chartColors.danger,
                }}
              >
                Loss: -350
              </span>
            </div>
          </div>

          <div className="h-72">
            <Line data={pnlChartData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnlChartComponent;
