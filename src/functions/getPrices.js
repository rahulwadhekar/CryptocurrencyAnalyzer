import axios from "axios";

// Function to fetch price data for a specific coin based on the selected price type (prices, market_caps, or total_volumes)
export const getPrices = (id, days, priceType, setError) => {
  // Making a GET request to CoinGecko API to fetch market chart data for the given coin (`id`), within the given `days`, and with daily interval data
  const prices = axios
    .get(
      // API URL to fetch market chart data for the coin using `id`, `days`, and interval as daily
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((response) => {
      if (response.data) {
        // Log the response data for debugging
        console.log("Prices>>>", response.data);
        
        // Based on the `priceType`, return the relevant data
        if (priceType == "market_caps") {
          // If priceType is "market_caps", return the market_caps data from the response
          return response.data.market_caps;
        } else if (priceType == "total_volumes") {
          // If priceType is "total_volumes", return the total_volumes data from the response
          return response.data.total_volumes;
        } else {
          // If priceType is anything else (default case), return the prices data from the response
          return response.data.prices;
        }
      }
    })
    .catch((e) => {
      // Log any errors that occur during the API call
      console.log(e.message);
      
      // If an error occurs, update the error state (if `setError` is provided)
      if (setError) {
        setError(true);
      }
    });

  // Return the promise (as the API call is asynchronous)
  return prices;
};
