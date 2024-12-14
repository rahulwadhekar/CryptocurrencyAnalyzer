import React, { useState } from "react";
import "./styles.css";  // Import custom styles for the List component
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";  // Icon for negative price change
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";  // Icon for positive price change
import { convertNumber } from "../../../functions/convertNumber";  // Function to format large numbers
import { motion } from "framer-motion";  // Import for adding animations
import { Tooltip } from "@mui/material";  // Import for displaying tooltips
import StarOutlineIcon from "@mui/icons-material/StarOutline";  // Empty star icon for watchlist
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";  // Function to save coin to the watchlist
import StarIcon from "@mui/icons-material/Star";  // Filled star icon for watchlist
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";  // Function to remove coin from the watchlist

function List({ coin, delay }) {
  // Get the current watchlist from localStorage
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  // Track whether the coin is added to the watchlist
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    // Link to the detailed coin page, using the coin's ID in the URL
    <a href={`/coin/${coin.id}`}>
      <motion.tr
        // Apply animation for the row (fade in and slide from left)
        className="list-row"
        initial={{ opacity: 0, x: -50 }}  // Initial animation properties
        whileInView={{ opacity: 1, x: 0 }}  // Animation properties when in view
        transition={{ duration: 0.5, delay: delay }}  // Set the transition duration and delay
      >
        {/* Tooltip for displaying the coin image */}
        <Tooltip title="Coin Image">
          <td className="td-img">
            <img src={coin.image} className="coin-image coin-image-td" />
          </td>
        </Tooltip>

        {/* Tooltip for displaying the coin symbol and name */}
        <Tooltip title="Coin Info" placement="bottom-start">
          <td className="td-info">
            <div className="info-flex">
              <p className="coin-symbol td-p">{coin.symbol}</p> {/* Display the coin symbol */}
              <p className="coin-name td-p">{coin.name}</p> {/* Display the coin name */}
            </div>
          </td>
        </Tooltip>

        {/* Tooltip for displaying price change percentage in 24 hours */}
        <Tooltip title="Coin Price Percentage In 24hrs" placement="bottom-start">
          {coin.price_change_percentage_24h >= 0 ? (
            // If price change is positive or zero, display it with a green chip
            <td>
              <div className="chip-flex">
                <div className="price-chip">
                  {coin.price_change_percentage_24h.toFixed(2)}%  {/* Display price change percentage */}
                </div>
                <div className="chip-icon td-chip-icon">
                  <TrendingUpRoundedIcon />  {/* Green icon for positive price change */}
                </div>
              </div>
            </td>
          ) : (
            // If price change is negative, display it with a red chip
            <td>
              <div className="chip-flex">
                <div className="price-chip red">
                  {coin.price_change_percentage_24h.toFixed(2)}%  {/* Display price change percentage */}
                </div>
                <div className="chip-icon td-chip-icon red">
                  <TrendingDownRoundedIcon />  {/* Red icon for negative price change */}
                </div>
              </div>
            </td>
          )}
        </Tooltip>

        {/* Tooltip for displaying the coin price in USD */}
        <Tooltip title="Coin Price In USD" placement="bottom-end">
          {coin.price_change_percentage_24h >= 0 ? (
            // If price change is positive, display price in normal color
            <td className="current-price  td-current-price">
              ${coin.current_price.toLocaleString()}  {/* Format the current price with commas */}
            </td>
          ) : (
            // If price change is negative, display price in red color
            <td className="current-price-red td-current-price">
              ${coin.current_price.toLocaleString()}  {/* Format the current price with commas */}
            </td>
          )}
        </Tooltip>

        {/* Tooltip for displaying total volume */}
        <Tooltip title="Coin Total Volume" placement="bottom-end">
          <td className="coin-name td-totalVolume">
            {coin.total_volume.toLocaleString()}  {/* Format the total volume with commas */}
          </td>
        </Tooltip>

        {/* Tooltip for displaying market capital */}
        <Tooltip title="Coin Market Capital" placement="bottom-end">
          <td className="coin-name td-marketCap">
            ${coin.market_cap.toLocaleString()}  {/* Format the market cap with commas */}
          </td>
        </Tooltip>

        {/* Display the market cap in a shorter format (converted) */}
        <td className="coin-name mobile">${convertNumber(coin.market_cap)}</td>

        {/* Watchlist icon (Star) to add or remove coin */}
        <td
          className={`watchlist-icon ${
            coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
          }`}
          onClick={(e) => {
            // Toggle between adding/removing coin from watchlist
            if (isCoinAdded) {
              // If the coin is already in the watchlist, remove it
              removeItemToWatchlist(e, coin.id, setIsCoinAdded);
            } else {
              // If the coin is not in the watchlist, add it
              setIsCoinAdded(true);  // Update the state
              saveItemToWatchlist(e, coin.id);  // Add the coin to the watchlist
            }
          }}
        >
          {/* Display filled or empty star based on whether the coin is in the watchlist */}
          {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
        </td>
      </motion.tr>
    </a>
  );
}

export default List;
