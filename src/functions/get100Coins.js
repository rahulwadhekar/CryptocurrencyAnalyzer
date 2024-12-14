import axios from "axios";  // Import axios for making HTTP requests

// Function to fetch the top 100 coins in terms of market capitalization
export const get100Coins = () => {
  // Send a GET request to the CoinGecko API to fetch the top 100 coins
  const coins = axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      // API URL to fetch the top 100 coins sorted by market cap in descending order
    )
    .then((response) => {
      // If the request is successful, log the response data to the console
      console.log("RESPONSE>>>", response.data);
      // Return the data fetched from the API (top 100 coins)
      return response.data;
    })
    .catch((error) => {
      // If an error occurs during the request, log the error message
      console.log("ERROR>>>", error.message);
    });

  // Return the Promise object containing the result of the axios request
  return coins;
};
