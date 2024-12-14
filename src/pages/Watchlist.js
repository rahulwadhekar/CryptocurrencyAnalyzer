import React, { useEffect, useState } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];  // Default to an empty array if watchlist is null

  useEffect(() => {
    if (watchlist.length > 0) {
      getData();
    } else {
      setLoading(false);
    }
  }, [watchlist]);

  const getData = async () => {
    try {
      const allCoins = await get100Coins();
      if (allCoins) {
        // Filter coins based on watchlist items
        const filteredCoins = allCoins.filter((coin) => watchlist.includes(coin.id));
        setCoins(filteredCoins);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      {watchlist.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
