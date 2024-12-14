import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";  // Import left alignment icon
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";  // Import center alignment icon
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";  // Import right alignment icon
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";  // Import justify alignment icon
import ToggleButton from "@mui/material/ToggleButton";  // Import MUI ToggleButton component
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";  // Import MUI ToggleButtonGroup component
import { useState } from "react";  // Import useState for state management

// ToggleComponents component allows the user to select between different price data views
export default function ToggleComponents({ priceType, handlePriceTypeChange }) {
  return (
    <div
      style={{
        display: "flex",  // Use flexbox to arrange the items
        justifyContent: "center",  // Center the items horizontally
        alignItems: "center",  // Center the items vertically
        marginBottom: "1.5rem",  // Set bottom margin for spacing
      }}
    >
      {/* ToggleButtonGroup allows switching between different data types (Prices, Market Cap, Total Volume) */}
      <ToggleButtonGroup
        value={priceType}  // The current selected value (Price, Market Cap, or Total Volume)
        exclusive  // Ensure only one toggle button can be selected at a time
        onChange={(e) => {
          handlePriceTypeChange(e);  // Call the handlePriceTypeChange function passed as a prop when the value changes
        }}
        sx={{
          "&.Mui-selected": {
            color: "var(--blue) !important",  // Style for the selected button (color set to blue)
          },
          borderColor: "var(--blue)",  // Set border color to blue
          border: "unset !important",  // Remove the default border style
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid var(--blue)!important",  // Add border to each button in the group
            borderColor: "unset",  // Remove the default border color
            color: "var(--blue) !important",  // Set text color to blue
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue) !important",  // Set the text color to blue for each toggle button
          },
        }}
      >
        {/* ToggleButton for "Prices" */}
        <ToggleButton value="prices">Prices</ToggleButton>
        {/* ToggleButton for "Market Cap" */}
        <ToggleButton value="market_caps">Market Cap</ToggleButton>
        {/* ToggleButton for "Total Volume" */}
        <ToggleButton value="total_volumes">Total Volume</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
