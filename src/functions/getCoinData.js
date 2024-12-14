import axios from "axios";  // Import axios for making HTTP requests

// Function to fetch data of a specific coin by its ID
export const getCoinData = (id, setError) => {
  // Send a GET request to the CoinGecko API to fetch data for a specific coin by its ID
  const coin = axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}`)
    // Construct the API URL dynamically using the provided coin ID
    .then((response) => {
      // If the request is successful and data is returned
      if (response.data) {
        // Return the coin data (e.g., market data, history, etc.)
        return response.data;
      }
    })
    .catch((e) => {
      // If an error occurs during the request, log the error message
      console.log(e.message);
      // If an error setter function is provided, call it to set an error state (e.g., for error handling in UI)
      if (setError) {
        setError(true); // Indicate an error has occurred
      }
    });

  // Return the Promise containing the result of the axios request
  return coin;
};
