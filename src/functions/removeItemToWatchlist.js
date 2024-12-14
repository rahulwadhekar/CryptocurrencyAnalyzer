import { toast } from "react-toastify";

// Function to remove a coin from the watchlist
export const removeItemToWatchlist = (e, id, setIsCoinAdded) => {
  e.preventDefault(); // Prevent the default action (e.g., navigating to a different page)
  
  // Display a confirmation dialog to the user before removing the coin
  if (window.confirm("Are you sure you want to remove this coin?")) {
    // Retrieve the current watchlist from localStorage and parse it into a JavaScript array
    let watchlist = JSON.parse(localStorage.getItem("watchlist"));
    
    // Create a new list excluding the coin with the given `id`
    const newList = watchlist.filter((coin) => coin != id);
    
    // Update the state to indicate the coin is no longer in the watchlist
    setIsCoinAdded(false);
    
    // Save the updated watchlist back to localStorage
    localStorage.setItem("watchlist", JSON.stringify(newList));
    
    // Show a success message using react-toastify to indicate that the coin has been removed
    toast.success(
      `${id.substring(0, 1).toUpperCase() + id.substring(1)} - has been removed!`
    );
    
    // Reload the page to reflect the change in the UI
    window.location.reload();
  } else {
    // If the user cancels the removal, show an error message
    toast.error(
      `${id.substring(0, 1).toUpperCase() + id.substring(1)} - could not be removed!`
    );
    
    // Revert the state to show the coin as still added to the watchlist
    setIsCoinAdded(true);
  }
};
