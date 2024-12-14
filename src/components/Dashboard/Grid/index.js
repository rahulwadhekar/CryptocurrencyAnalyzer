import React, { useState } from "react";
import "./styles.css";  // Import custom styles for the Grid component
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";  // Icon for negative price change
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";  // Icon for positive price change
import { motion } from "framer-motion";  // Import for adding animations
import StarOutlineIcon from "@mui/icons-material/StarOutline";  // Empty star icon for watchlist
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";  // Function to save coin to the watchlist
import StarIcon from "@mui/icons-material/Star";  // Filled star icon for watchlist
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";  // Function to remove coin from the watchlist

function Grid({ coin, delay }) {
  // Get the current watchlist from localStorage
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  // Track whether the coin is added to the watchlist
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    // Link to the detailed coin page, using the coin's ID in the URL
    <a href={`/coin/${coin.id}`}>
      <motion.div
        // Add conditional styles based on the coin's price change percentage
        className={`grid ${coin.price_change_percentage_24h < 0 && "grid-red"}`}
        initial={{ opacity: 0, y: 50 }}  // Initial animation properties
        whileInView={{ opacity: 1, y: 0 }}  // Animation properties when in view
        transition={{ duration: 0.5, delay: delay }}  // Set the transition duration and delay
      >
        <div className="img-flex">
          {/* Display the coin image */}
          <img src={coin.image} className="coin-image" />
          <div className="icon-flex">
            <div className="info-flex">
              {/* Display coin symbol and name */}
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
            <div
              // Icon for adding/removing from watchlist, with conditional styling based on price change
              className={`watchlist-icon ${
                coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
              }`}
              onClick={(e) => {
                // Toggle between adding/removing the coin from the watchlist
                if (isCoinAdded) {
                  // If coin is already in the watchlist, remove it
                  removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                } else {
                  // If coin is not in the watchlist, add it
                  setIsCoinAdded(true);  // Update state to reflect the change
                  saveItemToWatchlist(e, coin.id);  // Add coin to the watchlist
                }
              }}
            >
              {/* Display filled or empty star based on whether the coin is in the watchlist */}
              {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
            </div>
          </div>
        </div>
        
        {/* Conditional rendering based on price change percentage */}
        {coin.price_change_percentage_24h >= 0 ? (
          // If price is positive or zero
          <div className="chip-flex">
            <div className="price-chip">
              {/* Display price change percentage with 2 decimal places */}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="chip-icon">
              <TrendingUpRoundedIcon />  {/* Icon for positive change */}
            </div>
          </div>
        ) : (
          // If price is negative
          <div className="chip-flex">
            <div className="price-chip red">
              {/* Display price change percentage with 2 decimal places, in red */}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="chip-icon red">
              <TrendingDownRoundedIcon />  {/* Icon for negative change */}
            </div>
          </div>
        )}
        
        {/* Conditional rendering of price, with color based on price change */}
        {coin.price_change_percentage_24h >= 0 ? (
          <p className="current-price">
            ${coin.current_price.toLocaleString()}  {/* Format the current price */}
          </p>
        ) : (
          <p className="current-price-red">
            ${coin.current_price.toLocaleString()}  {/* Format the current price, in red */}
          </p>
        )}

        {/* Display total volume and market cap */}
        <p className="coin-name">
          Total Volume : {coin.total_volume.toLocaleString()}
        </p>
        <p className="coin-name">
          Market Capital : ${coin.market_cap.toLocaleString()}
        </p>
      </motion.div>
    </a>
  );
}

export default Grid;
