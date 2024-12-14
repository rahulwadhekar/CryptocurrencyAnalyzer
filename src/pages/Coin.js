import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import hook for accessing URL parameters
import Info from "../components/CoinPage/Info"; // Component displaying coin info
import LineChart from "../components/CoinPage/LineChart"; // Component displaying line chart
import SelectDays from "../components/CoinPage/SelectDays"; // Component to select days for data range
import ToggleComponents from "../components/CoinPage/ToggleComponent"; // Component for price type toggle (e.g., "prices" or "market_cap")
import Button from "../components/Common/Button"; // Reusable button component
import Header from "../components/Common/Header"; // Header component for the page
import Loader from "../components/Common/Loader"; // Loader component for loading states
import List from "../components/Dashboard/List"; // Component displaying coin list
import { getCoinData } from "../functions/getCoinData"; // Function to fetch coin data
import { getPrices } from "../functions/getPrices"; // Function to fetch historical price data
import { settingChartData } from "../functions/settingChartData"; // Function to set chart data
import { settingCoinObject } from "../functions/settingCoinObject"; // Function to format coin data

function Coin() {
  const { id } = useParams(); // Extract the coin ID from the URL parameters
  const [error, setError] = useState(false); // State to handle errors
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] }); // State to hold chart data
  const [coin, setCoin] = useState({}); // State to hold coin data
  const [days, setDays] = useState(30); // State to hold selected days for the data range (default: 30)
  const [priceType, setPriceType] = useState("prices"); // State to track the type of price data (e.g., prices or market_cap)

  // useEffect hook to trigger data fetching when the component mounts or when 'id' changes
  useEffect(() => {
    if (id) {
      getData(); // Fetch data when the coin ID is available
    }
  }, [id]); // Depend on 'id' so it triggers whenever 'id' changes

  // Function to fetch and set coin data and price data
  const getData = async () => {
    setLoading(true); // Set loading state to true while fetching data
    let coinData = await getCoinData(id, setError); // Fetch coin data by ID
    console.log("Coin DATA>>>>", coinData); // Log fetched coin data for debugging
    settingCoinObject(coinData, setCoin); // Format and set coin data
    if (coinData) {
      // If coin data is available, fetch price data
      const prices = await getPrices(id, days, priceType, setError); 
      if (prices) {
        settingChartData(setChartData, prices); // Format and set price chart data
        setLoading(false); // Set loading state to false once data is fetched
      }
    }
  };

  // Handle changes in the days selection and fetch new price data accordingly
  const handleDaysChange = async (event) => {
    setLoading(true); // Set loading state to true
    setDays(event.target.value); // Update days state with the selected value
    const prices = await getPrices(id, event.target.value, priceType, setError); // Fetch price data for new days
    if (prices) {
      settingChartData(setChartData, prices); // Update chart data
      setLoading(false); // Set loading state to false once data is fetched
    }
  };

  // Handle changes in the price type (e.g., prices, market_cap) and fetch new price data accordingly
  const handlePriceTypeChange = async (event) => {
    setLoading(true); // Set loading state to true
    setPriceType(event.target.value); // Update priceType state with the selected value
    const prices = await getPrices(id, days, event.target.value, setError); // Fetch price data for new price type
    if (prices) {
      settingChartData(setChartData, prices); // Update chart data
      setLoading(false); // Set loading state to false once data is fetched
    }
  };

  return (
    <>
      <Header /> {/* Render the page header */}
      {!error && !loading && coin.id ? ( // Render content only if no error, not loading, and valid coin data exists
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} /> {/* Render the coin list with delay */}
          </div>
          <div className="grey-wrapper">
            <SelectDays handleDaysChange={handleDaysChange} days={days} /> {/* Component to select days */}
            <ToggleComponents
              priceType={priceType} 
              handlePriceTypeChange={handlePriceTypeChange} 
            /> {/* Component to toggle price type */}
            <LineChart chartData={chartData} /> {/* Render the line chart with the fetched chart data */}
          </div>
          <Info title={coin.name} desc={coin.desc} /> {/* Render the coin info with title and description */}
        </>
      ) : error ? ( // If there's an error, show error message
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, Couldn't find the coin you're looking for 😞
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" /> {/* Button to navigate back to the dashboard */}
            </a>
          </div>
        </div>
      ) : (
        <Loader /> // Show loader while data is being fetched
      )}
    </>
  );
}

export default Coin; // Export the Coin component to be used elsewhere
