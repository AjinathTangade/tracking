import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [state, setState] = useState({
    series: [44, 55, 43],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C"],
      colors: ["#e11d48", "#0c0a09", "#10b981"], // ✅ Custom slice colors
      legend: {
        position: "bottom", // ✅ Moves labels (legend) to the bottom
        fontSize: "16px",
        fontWeight: 600,
        markers: {
          width: 12,
          height: 12,
        },
        formatter: (seriesName, opts) => {
          // ✅ Custom label colors (matches slice colors)
          const labelColors = ["#e11d48", "#0c0a09", "#10b981"];
          return `<span style="color: ${labelColors[opts.seriesIndex]}; font-weight: bold;">${seriesName}</span>`;
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="pie" width={300} />
    </div>
  );
};

export default PieChart;
