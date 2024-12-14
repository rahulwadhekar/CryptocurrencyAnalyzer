import { toast } from "react-toastify";

// Function to add a coin to the watchlist
export const saveItemToWatchlist = (e, id) => {
  e.preventDefault(); // Prevent the default behavior (e.g., navigating to a different page)

  // Retrieve the current watchlist from localStorage and parse it into a JavaScript array
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));

  // Check if there is already a watchlist in localStorage
  if (watchlist) {
    // If the coin ID is not already in the watchlist, add it
    if (!watchlist.includes(id)) {
      watchlist.push(id); // Add the coin ID to the watchlist array
      
      // Show a success message using react-toastify
      toast.success(
        `${id.substring(0, 1).toUpperCase() + id.substring(1)} - added to the watchlist`
      );
    } else {
      // If the coin ID is already in the watchlist, show an error message
      toast.error(
        `${id.substring(0, 1).toUpperCase() + id.substring(1)} - is already added to the watchlist!`
      );
    }
  } else {
    // If there is no existing watchlist in localStorage, create a new one with the current coin ID
    watchlist = [id];
    
    // Show a success message using react-toastify
    toast.success(
      `${id.substring(0, 1).toUpperCase() + id.substring(1)} - added to the watchlist`
    );
  }

  // Save the updated watchlist back to localStorage as a JSON string
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
};
