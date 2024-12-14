import React, { useEffect, useState } from "react";
import Info from "../components/CoinPage/Info"; // Component for displaying coin info (title and description)
import LineChart from "../components/CoinPage/LineChart"; // Component to render a line chart for price data
import ToggleComponents from "../components/CoinPage/ToggleComponent"; // Component to toggle between different price types (e.g., "prices" or "market_cap")
import Header from "../components/Common/Header"; // Common header component for the page
import Loader from "../components/Common/Loader"; // Loader component to show during loading state
import SelectCoins from "../components/ComparePage/SelectCoins"; // Component to select which coins to compare
import List from "../components/Dashboard/List"; // Component for displaying coin data in a list format
import { get100Coins } from "../functions/get100Coins"; // Function to fetch the top 100 coins
import { getCoinData } from "../functions/getCoinData"; // Function to fetch data for a specific coin by its ID
import { getPrices } from "../functions/getPrices"; // Function to fetch price data for a specific coin
import { settingChartData } from "../functions/settingChartData"; // Function to set the chart data from the fetched prices
import { settingCoinObject } from "../functions/settingCoinObject"; // Function to set coin data in the correct format

function Compare() {
  const [allCoins, setAllCoins] = useState([]); // State to store the list of all available coins
  const [loading, setLoading] = useState(false); // State to manage the loading state
  // State variables to store selected cryptocurrencies (default: bitcoin and ethereum)
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  // State variables to store the fetched coin data for each cryptocurrency
  const [coin1Data, setCoin1Data] = useState({});
  const [coin2Data, setCoin2Data] = useState({});
  // State to store the selected number of days for price data and the price type (e.g., "prices", "market_cap")
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  // State for chart data to display on the LineChart component
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // useEffect hook to fetch initial data (top 100 coins) when the component is mounted
  useEffect(() => {
    getData(); // Call the getData function to fetch data
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Function to fetch and set all necessary data for comparison (coins and price data)
  const getData = async () => {
    setLoading(true); // Set loading to true before starting data fetching
    const coins = await get100Coins(); // Fetch top 100 coins data
    if (coins) {
      setAllCoins(coins); // Store the list of all coins in the state
      const data1 = await getCoinData(crypto1); // Fetch data for the first selected cryptocurrency
      const data2 = await getCoinData(crypto2); // Fetch data for the second selected cryptocurrency
      settingCoinObject(data1, setCoin1Data); // Set coin 1 data in the correct format
      settingCoinObject(data2, setCoin2Data); // Set coin 2 data in the correct format
      if (data1 && data2) {
        // Once both coins are fetched, fetch price data for both coins
        const prices1 = await getPrices(crypto1, days, priceType); 
        const prices2 = await getPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2); // Set the fetched price data into chart data format
        setLoading(false); // Set loading state to false once data is fetched and chart is ready
      }
    }
  };

  // Function to handle changes in coin selection (either for coin1 or coin2)
  const onCoinChange = async (e, isCoin2) => {
    setLoading(true); // Set loading state to true while fetching new data
    if (isCoin2) {
      const newCrypto2 = e.target.value; // Update crypto2 with the selected value
      setCrypto2(newCrypto2); // Update state for crypto2
      const data2 = await getCoinData(newCrypto2); // Fetch new data for coin2
      settingCoinObject(data2, setCoin2Data); // Update coin2 data
      // Fetch price data again for both coins after coin change
      const prices1 = await getPrices(crypto1, days, priceType);
      const prices2 = await getPrices(newCrypto2, days, priceType);
      settingChartData(setChartData, prices1, prices2); // Update chart data with the new prices
    } else {
      const newCrypto1 = e.target.value; // Update crypto1 with the selected value
      setCrypto1(newCrypto1); // Update state for crypto1
      const data1 = await getCoinData(newCrypto1); // Fetch new data for coin1
      settingCoinObject(data1, setCoin1Data); // Update coin1 data
      // Fetch price data again for both coins after coin change
      const prices1 = await getPrices(newCrypto1, days, priceType);
      const prices2 = await getPrices(crypto2, days, priceType);
      settingChartData(setChartData, prices1, prices2); // Update chart data with the new prices
    }
    setLoading(false); // Set loading to false after fetching and updating data
  };

  // Function to handle changes in the selected number of days for price data
  const handleDaysChange = async (e) => {
    const newDays = e.target.value; // Get the new number of days from the input
    setLoading(true); // Set loading state to true while fetching new data
    setDays(newDays); // Update the state for days
    const prices1 = await getPrices(crypto1, newDays, priceType); // Fetch price data for coin1
    const prices2 = await getPrices(crypto2, newDays, priceType); // Fetch price data for coin2
    settingChartData(setChartData, prices1, prices2); // Update chart data with the new prices
    setLoading(false); // Set loading state to false after fetching and updating data
  };

  // Function to handle changes in the price type (e.g., prices or market_cap)
  const handlePriceTypeChange = async (e) => {
    const newPriceType = e.target.value; // Get the new price type from the input
    setLoading(true); // Set loading state to true while fetching new data
    setPriceType(newPriceType); // Update the state for price type
    const prices1 = await getPrices(crypto1, days, newPriceType); // Fetch price data for coin1 with the new price type
    const prices2 = await getPrices(crypto2, days, newPriceType); // Fetch price data for coin2 with the new price type
    settingChartData(setChartData, prices1, prices2); // Update chart data with the new prices
    setLoading(false); // Set loading state to false after fetching and updating data
  };

  return (
    <div>
      <Header /> {/* Render the header */}
      {loading || !coin1Data?.id || !coin2Data?.id ? ( // Show the loader while data is being fetched
        <Loader />
      ) : (
        <>
          {/* Render coin selection and other controls */}
          <SelectCoins
            allCoins={allCoins}
            crypto1={crypto1}
            crypto2={crypto2}
            onCoinChange={onCoinChange}
            days={days}
            handleDaysChange={handleDaysChange}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} /> {/* Render coin1 data in a list */}
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} /> {/* Render coin2 data in a list */}
          </div>
          <div className="grey-wrapper">
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            /> {/* Render the toggle for price types */}
            <LineChart chartData={chartData} multiAxis={true} /> {/* Render the line chart for comparing price data */}
          </div>
          <Info title={coin1Data.name} desc={coin1Data.desc} /> {/* Render coin1 info */}
          <Info title={coin2Data.name} desc={coin2Data.desc} /> {/* Render coin2 info */}
        </>
      )}
    </div>
  );
}

export default Compare; // Export the Compare component to be used elsewhere
