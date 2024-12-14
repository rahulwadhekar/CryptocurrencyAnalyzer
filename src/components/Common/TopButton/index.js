import React from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

function TopButton() {
  // Get the button element by its ID
  let mybutton = document.getElementById("top-btn");

  // Event listener for scroll event, calls scrollFunction to show or hide the button
  window.onscroll = function () {
    scrollFunction();
  };

  // Function to check scroll position and display the button accordingly
  function scrollFunction() {
    // If the user has scrolled more than 500px, show the button
    if (
      document.body.scrollTop > 500 || // For Safari
      document.documentElement.scrollTop > 500 // For other browsers
    ) {
      mybutton.style.display = "flex"; // Display button
    } else {
      mybutton.style.display = "none"; // Hide button
    }
  }

  return (
    <div
      className="top-btn"
      id="top-btn"
      onClick={() => {
        // When the button is clicked, scroll back to the top of the page
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For other browsers
      }}
    >
      {/* Button icon to represent "scroll to top" action */}
      <ExpandLessRoundedIcon />
    </div>
  );
}

export default TopButton;
