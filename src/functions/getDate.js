// Function to format a timestamp (in milliseconds) into a readable date format (DD/MM)
export const gettingDate = (number) => {
  // Create a new Date object using the provided timestamp (number) as milliseconds
  const date = new Date(number);
  
  // Return the date in the format of day/month (DD/MM)
  // `date.getDate()` gets the day of the month (1-31)
  // `date.getMonth() + 1` gets the month (0-11), so we add 1 to make it human-readable (1-12)
  return date.getDate() + "/" + (date.getMonth() + 1);
};
