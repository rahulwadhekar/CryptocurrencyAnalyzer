import { MenuItem, Select } from "@mui/material";  // Import MUI Select and MenuItem components for dropdown
import React, { useState } from "react";  // Import React and useState for state management
import "./styles.css";  // Import custom styles

// SelectDays component that allows users to choose the number of days for data display
function SelectDays({ days, handleDaysChange, noPTag }) {
  return (
    <div className="select-days" style={{ marginBottom: noPTag && "0" }}>
      {/* Conditionally render <p> if noPTag is false */}
      {!noPTag && <p>Price change in </p>}
      
      {/* The Select dropdown for choosing the number of days */}
      <Select
        value={days}  // Value of the selected days
        onChange={(e) => handleDaysChange(e)}  // Handle the change in days selection
        sx={{
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
        }}
      >
        {/* MenuItem options for different day selections */}
        <MenuItem value={7}>7 Days</MenuItem>  {/* 7 Days */}
        <MenuItem value={30}>30 Days</MenuItem>  {/* 30 Days */}
        <MenuItem value={60}>60 Days</MenuItem>  {/* 60 Days */}
        <MenuItem value={90}>90 Days</MenuItem>  {/* 90 Days */}
        <MenuItem value={120}>120 Days</MenuItem>  {/* 120 Days */}
        <MenuItem value={365}>1 Year</MenuItem>  {/* 1 Year */}
      </Select>
    </div>
  );
}

export default SelectDays;
