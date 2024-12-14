import React from "react";
import "./styles.css";

function Button({ text, onClick, outlined }) {
  // Ensure that the onClick function is passed as a prop
  const handleClick = () => {
    if (onClick) {
      onClick(); // Execute the onClick function if it's provided
    }
  };

  return (
    <div
      className={outlined ? "btn-outlined" : "btn"}
      onClick={handleClick} // Use the handleClick function to prevent errors
      role="button" // To make it more accessible, since it's a div acting as a button
      tabIndex="0" // Allows it to be focused on keyboard navigation
    >
      {text}
    </div>
  );
}

export default Button;
