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

// Register ChartJS components
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

const AdminChartsComponent = () => {
  // Chart colors from your palette
  const chartColors = {
    primary: "#0063f5", // --color-oceanic-blue
    dark: "#212529", // --color-midnight-gray
    darkSecondary: "#343a40", // --color-charcoal-stone
    gray: "#6c757d", // --color-slate-mist
    light: "#f8f9fa", // --color-cloud-white
    warning: "#ff6d00", // --color-amber-flare
    success: "#21bf73", // --color-emerald-leaf
    danger: "#d90429", // --color-crimson-fire
    silver: "#dfe2e4", // --color-silver-fog
    sky: "#ecf4ff", // --color-sky-mist
    blush: "#ffebee", // --color-blush-petal
    mint: "#dcf9eb", // --color-mint-frost
    royal: "#005be3", // --color-royal-azure
    indigo: "#203ed6", // --color-indigo-wave
  };

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: chartColors.dark,
          font: {
            size: 12,
          },
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

  // Line Chart Data - User Growth
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "New Users",
        data: [120, 190, 300, 500, 700, 850, 1000],
        borderColor: chartColors.success,
        backgroundColor: chartColors.mint,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: chartColors.success,
        pointBorderColor: chartColors.light,
        pointBorderWidth: 2,
      },
      {
        label: "Active Users",
        data: [800, 850, 900, 950, 1000, 1050, 1100],
        borderColor: chartColors.warning,
        backgroundColor: `${chartColors.warning}20`,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: chartColors.warning,
        pointBorderColor: chartColors.light,
        pointBorderWidth: 2,
      },
    ],
    };
    
  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg md:col-span-2">
      <div>

        {/* Line Chart */}
        <div
          className="bg-white p-4 rounded-xl border"
          style={{ borderColor: chartColors.silver }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-lg font-semibold"
              style={{ color: chartColors.dark }}
            >
              User Growth
            </h2>
            <div className="flex gap-2">
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: chartColors.mint,
                  color: chartColors.success,
                }}
              >
                New: 1,000
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${chartColors.warning}20`,
                  color: chartColors.warning,
                }}
              >
                Active: 1,100
              </span>
            </div>
          </div>
          <div className="h-72">
            <Line data={lineChartData} options={commonOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChartsComponent;
