import React from "react";
import Button from "../../Common/Button";  // Importing custom Button component
import "./styles.css";  // Importing CSS for styling
import { motion } from "framer-motion";  // Importing motion from framer-motion for animations

function MainComponent() {
  return (
    <div className="main-flex">
      {/* Main container for the landing page */}
      <div className="info-landing">
        {/* Animated heading 'Track Crypto' */}
        <motion.h1
          className="heading1"
          initial={{ opacity: 0, x: 50 }}  // Initial animation state: hidden and moved 50px to the right
          animate={{ opacity: 1, x: 0 }}  // Final state: fully visible and in the original position
          transition={{ delay: 0.5, duration: 1 }}  // Animation delay of 0.5 seconds and duration of 1 second
        >
          Track Crypto
        </motion.h1>

        {/* Animated heading 'Real Time' */}
        <motion.h1
          className="heading2"
          initial={{ opacity: 0, x: 50 }}  // Initially hidden and moved right
          animate={{ opacity: 1, x: 0 }}  // Final visible position
          transition={{ delay: 0.75, duration: 1 }}  // Animation delay of 0.75 seconds and 1 second duration
        >
          Real Time.
        </motion.h1>

        {/* Animated description text */}
        <motion.p
          className="info-text"
          initial={{ opacity: 0, x: 50 }}  // Initially hidden with movement from the right
          animate={{ opacity: 1, x: 0 }}  // Final state: visible at original position
          transition={{ delay: 1, duration: 1 }}  // Animation delay of 1 second and 1 second duration
        >
          Track crypto through a public api in real time. Visit the dashboard to
          do so!{" "}
        </motion.p>

        {/* Animated button container */}
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, y: 50 }}  // Initially hidden and moved 50px down
          animate={{ opacity: 1, y: 0 }}  // Final state: fully visible and in the original position
          transition={{ delay: 1.25, duration: 0.75 }}  // Animation delay of 1.25 seconds and 0.75 second duration
        >
          {/* Link to the dashboard page */}
          <a href="/dashboard">
            <Button text={"Dashboard"} />  {/* Render the Button component with 'Dashboard' text */}
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default MainComponent;
