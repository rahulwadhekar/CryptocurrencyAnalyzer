import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./styles.css";  // Import custom styles for this component
import Grid from "../Grid";  // Importing the Grid component to display coin information in a grid format
import List from "../List";  // Importing the List component to display coin information in a list format
import { convertNumber } from "../../../functions/convertNumber";  // Import a utility function to convert numbers (not used in this component directly)
import Button from "../../Common/Button";  // Importing a Button component for the "Clear Search" action

export default function TabsComponent({ coins, setSearch }) {
  // State to manage the selected tab, default is "grid"
  const [value, setValue] = React.useState("grid");

  // Handle tab change event
  const handleChange = (event, newValue) => {
    setValue(newValue);  // Set the selected tab based on the user click
  };

  // Styles for the Tab labels
  const style = {
    color: "var(--white)",  // White text color for tab labels
    "& .Mui-selected": {
      color: "var(--blue) !important",  // Blue color for the selected tab
    },
    fontFamily: "Inter,sans-serif",  // Font family
    fontWeight: 600,  // Bold font weight
    textTransform: "capitalize",  // Capitalize tab label text
  };

  return (
    <TabContext value={value}>  {/* Wrapping Tab components with TabContext to manage selected value */}
      <div style={{ borderBottom: 1, borderColor: "divider" }}>
        {/* TabList contains the tab navigation buttons */}
        <TabList onChange={handleChange} variant="fullWidth">
          {/* "Grid" tab to show coins in a grid format */}
          <Tab label="Grid" value="grid" sx={style} />
          {/* "List" tab to show coins in a list format */}
          <Tab label="List" value="list" sx={style} />
        </TabList>
      </div>
      {/* TabPanel for "grid" tab */}
      <TabPanel value="grid">
        <div className="grid-flex">
          {/* Conditionally rendering coins if they exist */}
          {coins.length > 0 ? (
            coins.map((coin, i) => (
              // Mapping through coins to render the Grid component for each coin
              <Grid coin={coin} key={i} delay={(i % 4) * 0.2} />
            ))
          ) : (
            // If no coins found, display a message with a "Clear Search" button
            <div>
              <h1 style={{ textAlign: "center" }}>
                Sorry, Couldn't find the coin you're looking for 😞
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem",
                }}
              >
                {/* Button to clear the search query */}
                <Button text="Clear Search" onClick={() => setSearch("")} />
              </div>
            </div>
          )}
        </div>
      </TabPanel>
      {/* TabPanel for "list" tab */}
      <TabPanel value="list">
        <table className="list-flex">
          {/* Conditionally rendering coins if they exist */}
          {coins.length > 0 ? (
            coins.map((coin, i) => (
              // Mapping through coins to render the List component for each coin
              <List coin={coin} key={i} delay={(i % 8) * 0.2} />
            ))
          ) : (
            // If no coins found, display a message with a "Clear Search" button
            <div>
              <h1 style={{ textAlign: "center" }}>
                Sorry, Couldn't find the coin you're looking for 😞
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem",
                }}
              >
                {/* Button to clear the search query */}
                <Button text="Clear Search" onClick={() => setSearch("")} />
              </div>
            </div>
          )}
        </table>
      </TabPanel>
    </TabContext>
  );
}
