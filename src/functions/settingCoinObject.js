// Function to set the coin data object
export const settingCoinObject = (data, setCoin) => {
  // Set the state of 'coin' with various properties extracted from the API response data
  setCoin({
    id: data.id,  // Unique identifier for the coin
    name: data.name,  // Name of the coin
    symbol: data.symbol,  // Symbol (e.g., BTC, ETH) for the coin
    image: data.image.large,  // URL for the large image of the coin
    desc: data.description.en,  // Description of the coin (in English)
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,  // 24h price change percentage
    total_volume: data.market_data.total_volume.usd,  // Total volume in USD over the last 24 hours
    current_price: data.market_data.current_price.usd,  // Current price of the coin in USD
    market_cap: data.market_data.market_cap.usd,  // Market capitalization of the coin in USD
  });
};
