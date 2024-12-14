import { MenuItem, Select } from "@mui/material";  // Import MUI Select and MenuItem components for dropdown
import React, { useState } from "react";  // Import React and useState for state management
import SelectDays from "../../CoinPage/SelectDays";  // Import the SelectDays component for choosing days
import "./styles.css";  // Import custom styles

function SelectCoins({
  allCoins,  // List of all available coins
  crypto1,  // Currently selected crypto 1
  crypto2,  // Currently selected crypto 2
  onCoinChange,  // Function to handle coin change
  days,  // The number of days selected
  handleDaysChange,  // Function to handle days change
}) {
  // Custom styling for the Select components
  const style = {
    height: "2.5rem",  // Set height of the Select dropdown
    color: "var(--white)",  // Set text color to white
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",  // Set border color to white for the input field
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",  // Set icon color to white
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",  // Set border color to blue on hover
      },
    },
  };

  return (
    <div className="select-coins-div">
      {/* Coin selection for Crypto 1 */}
      <div className="select-flex">
        <p>Crypto 1</p>
        <Select
          value={crypto1}  // Value of the first selected crypto
          onChange={(e) => onCoinChange(e, false)}  // Handle selection change for crypto1
          sx={style}  // Apply custom styles
        >
          {/* Map through all available coins and filter out the one already selected for Crypto 2 */}
          {allCoins
            .filter((coin) => coin.id != crypto2)  // Exclude the second coin from the list
            .map((coin, i) => (
              <MenuItem value={coin.id} key={i}>  {/* Render each coin as a MenuItem */}
                {coin.name}  {/* Display the name of the coin */}
              </MenuItem>
            ))}
        </Select>
      </div>

      {/* Coin selection for Crypto 2 */}
      <div className="select-flex">
        <p>Crypto 2</p>
        <Select
          value={crypto2}  // Value of the second selected crypto
          onChange={(e) => onCoinChange(e, true)}  // Handle selection change for crypto2
          sx={style}  // Apply custom styles
        >
          {/* Map through all available coins and filter out the one already selected for Crypto 1 */}
          {allCoins
            .filter((coin) => coin.id != crypto1)  // Exclude the first coin from the list
            .map((coin, i) => (
              <MenuItem value={coin.id} key={i}>  {/* Render each coin as a MenuItem */}
                {coin.name}  {/* Display the name of the coin */}
              </MenuItem>
            ))}
        </Select>
      </div>

      {/* Render the SelectDays component to choose the number of days */}
      <SelectDays
        days={days}  // Pass the currently selected days
        handleDaysChange={handleDaysChange}  // Handle the change of days
        noPTag={true}  // Optional prop to control paragraph tag rendering
      />
    </div>
  );
}

export default SelectCoins;
