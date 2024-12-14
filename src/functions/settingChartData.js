import { gettingDate } from "./getDate";

// Function to set chart data for displaying price trends of two cryptocurrencies
export const settingChartData = (setChartData, prices1, prices2) => {
  // Check if data for the second cryptocurrency (prices2) exists
  if (prices2) {
    // If both price data (prices1 and prices2) exist, set the chart data for both cryptocurrencies
    setChartData({
      labels: prices1?.map((data) => gettingDate(data[0])),  // Map the timestamps of prices1 to readable date format using gettingDate function
      datasets: [
        {
          label: "Crypto 1",  // Label for the first cryptocurrency
          data: prices1?.map((data) => data[1]),  // Extract price data from prices1
          borderWidth: 1,  // Set the width of the line border
          fill: false,  // Do not fill the area under the line
          backgroundColor: "rgba(58, 128, 233,0.1)",  // Set a transparent background color for the line
          tension: 0.25,  // Set line tension (curvature)
          borderColor: "#3a80e9",  // Set the color of the line
          pointRadius: 0,  // Remove the points on the line
          yAxisID: "crypto1",  // Assign the dataset to the first y-axis
        },
        {
          label: "Crypto 2",  // Label for the second cryptocurrency
          data: prices2?.map((data) => data[1]),  // Extract price data from prices2
          borderWidth: 1,  // Set the width of the line border
          fill: false,  // Do not fill the area under the line
          tension: 0.25,  // Set line tension (curvature)
          borderColor: "#61c96f",  // Set the color of the line
          pointRadius: 0,  // Remove the points on the line
          yAxisID: "crypto2",  // Assign the dataset to the second y-axis
        },
      ],
    });
  } else {
    // If only data for the first cryptocurrency (prices1) exists, set the chart data for the first cryptocurrency
    setChartData({
      labels: prices1?.map((data) => gettingDate(data[0])),  // Map the timestamps of prices1 to readable date format using gettingDate function
      datasets: [
        {
          data: prices1?.map((data) => data[1]),  // Extract price data from prices1
          borderWidth: 1,  // Set the width of the line border
          fill: true,  // Fill the area under the line
          backgroundColor: "rgba(58, 128, 233,0.1)",  // Set a transparent background color for the line
          tension: 0.25,  // Set line tension (curvature)
          borderColor: "#3a80e9",  // Set the color of the line
          pointRadius: 0,  // Remove the points on the line
          yAxisID: "crypto1",  // Assign the dataset to the first y-axis
        },
      ],
    });
  }
};
