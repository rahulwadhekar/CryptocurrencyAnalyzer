import React from "react";
import { Line } from "react-chartjs-2"; // Importing the Line chart component from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto"; // Importing Chart.js and auto-configuring it. DO NOT remove this line.

function LineChart({ chartData, multiAxis }) {
  // Chart options configuration
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false, // Displays the legend only if multiAxis is true
      },
    },
    responsive: true, // Ensures the chart is responsive (adjusts to screen size)
    interaction: {
      mode: "index", // Allows interaction with the chart where the user can hover over the chart elements
      intersect: false, // Disables the requirement for hover to intersect chart elements
    },
    scales: {
      // Configuring the y-axes for the chart
      crypto1: {
        position: "left", // Positions the first chart axis on the left
      },
      crypto2: multiAxis && {
        position: "right", // If multiAxis is true, positions the second axis on the right
      },
    },
  };

  // Return the Line chart component with the provided chart data and options
  return <Line data={chartData} options={options} />;
}

export default LineChart;
