import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Coin from "./pages/Coin";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";

function App() {
  // Create a custom Material UI theme with a primary color
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9", // Primary color used in the theme
      },
    },
  });

  // Refs to manage custom cursor elements
  const cursor = useRef(null); // Cursor element
  const cursorPointer = useRef(null); // Pointer cursor element

  useEffect(() => {
    // Mousemove event handler: Tracks mouse position and updates the cursor position
    const handleMouseMove = (e) => {
      if (cursor.current) {
        cursor.current.style.left = `${e.clientX}px`;
        cursor.current.style.top = `${e.clientY}px`;
      }
      if (cursorPointer.current) {
        cursorPointer.current.style.left = `${e.clientX}px`;
        cursorPointer.current.style.top = `${e.clientY}px`;
      }
    };

    // Mousedown event handler: Changes cursor size when mouse is pressed
    const handleMouseDown = () => {
      if (cursor.current) {
        cursor.current.style.height = "0.5rem"; // Smaller cursor on mouse down
        cursor.current.style.width = "0.5rem";
      }
      if (cursorPointer.current) {
        cursorPointer.current.style.height = "3rem"; // Larger pointer on mouse down
        cursorPointer.current.style.width = "3rem";
      }
    };

    // Mouseup event handler: Resets cursor size when mouse is released
    const handleMouseUp = () => {
      if (cursor.current) {
        cursor.current.style.height = "0.3rem"; // Default size
        cursor.current.style.width = "0.3rem";
      }
      if (cursorPointer.current) {
        cursorPointer.current.style.height = "2rem"; // Default pointer size
        cursorPointer.current.style.width = "2rem";
      }
    };

    // Adding event listeners for mousemove, mousedown, and mouseup
    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mousedown", handleMouseDown);
    document.body.addEventListener("mouseup", handleMouseUp);

    // Cleanup event listeners when component unmounts
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseup", handleMouseUp);
    };
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return (
    <div className="App">
      {/* Custom cursor and pointer */}
      <div className="cursor" id="cursor" ref={cursor} />
      <div className="cursor-pointer" id="cursor-pointer" ref={cursorPointer} />
      
      {/* Toast notifications container */}
      <ToastContainer />

      {/* Wrap the entire app with Material UI ThemeProvider */}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {/* Define routes for different pages of the app */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/coin/:id" element={<Coin />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
