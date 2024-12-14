import React, { useState, useEffect } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import "./styles.css";

function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true); // Toggles between Login and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // To store validation errors
  const [errorMessage, setErrorMessage] = useState(""); // To display error message for invalid actions
  const [user, setUser] = useState(null); // To store the logged-in user

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    resetForm(); // Reset form when popup closes
  };

  const switchToSignUp = () => {
    setIsRegistered(false);
  };

  const switchToLogin = () => {
    setIsRegistered(true);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setErrorMessage(""); // Reset error message when closing popup
  };

  // Validation function
  const validate = () => {
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (!isRegistered && confirmPassword !== password) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked");
    if (validate()) {
      if (isRegistered) {
        // Login logic
        const storedUser = JSON.parse(localStorage.getItem(email));
        if (storedUser && storedUser.password === password) {
          localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
          setUser(storedUser); // Update the user state
          toast.success("Login successful!");
        } else {
          setErrorMessage("Invalid email or password.");
        }
      } else {
        // Sign Up logic
        const userData = { email, password };
        localStorage.setItem(email, JSON.stringify(userData)); // Store user data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(userData)); // Store logged-in user
        setUser(userData); // Set the logged-in user
        toast.success("Sign Up successful!");
        switchToLogin(); // Switch back to Login after successful Sign Up
      }
      togglePopup(); // Close the popup on successful submission
    } else {
      setErrorMessage("Something went wrong, please check your input.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null); // Reset the logged-in user
  };

  return (
    <div className="header">
      <h1>
        <span style={{ color: "var(--blue)" }}>Crypto Pulse Dashboard</span>
      </h1>
      <div className="links">
        <a href="/">
          <p className="link">Home</p>
        </a>
        <a href="/compare">
          <p className="link">Compare</p>
        </a>
        <a href="/watchlist">
          <p className="link">Watchlist</p>
        </a>
        <a href="/dashboard">
          <p className="link">Dashboard</p>
        </a>
        {user ? (
          <div className="user-info">
            <p>{user.email}</p> {/* Show user email or name */}
            <Button text="Logout" onClick={handleLogout} /> {/* Logout button */}
          </div>
        ) : (
          <Button text="Login / Sign Up" onClick={togglePopup} />
        )}
      </div>

      {/* Login/Sign Up Popup Modal */}
      {showPopup && (
        <div className="login-popup">
          <div className="login-popup-content">
            {/* Close button at the top left */}
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
            <h2>{isRegistered ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              {!isRegistered && (
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </div>
              )}
              <div className="form-actions">
                <Button text={isRegistered ? "Login" : "Register"} type="submit" />
                {isRegistered ? (
                  <Button text="Sign Up" onClick={switchToSignUp} />
                ) : (
                  <Button text="Back to Login" onClick={switchToLogin} />
                )}
              </div>
              {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
