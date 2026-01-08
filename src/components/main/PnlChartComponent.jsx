import React from "react";
import Chart from "react-apexcharts";

const PnlChartComponent = () => {
  const rawPnl = JSON.parse(localStorage.getItem("PNL")) || [];

  // Group PnL by date
  const dailyPnl = {};

  rawPnl.forEach((item) => {
    if (!item?.date) return;
    dailyPnl[item.date] = (dailyPnl[item.date] || 0) + Number(item.pnl || 0);
  });

  const labels = Object.keys(dailyPnl);
  const values = Object.values(dailyPnl);

  const netPnl = values.reduce((a, b) => a + b, 0);
  const isProfit = netPnl >= 0;

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: [isProfit ? "#21bf73" : "#d90429"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
      labels: { show: true },
    },
    yaxis: {
      labels: { show: true },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => val.toFixed(2),
      },
    },
  };

  const chartSeries = [
    {
      name: "PnL",
      data: values,
    },
  ];

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
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PnlChartComponent;
