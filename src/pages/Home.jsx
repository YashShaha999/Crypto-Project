import { useEffect, useState } from "react";
import { fetchCryptos } from "../Api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";
import Select from "react-select";

export const Home = () => {
  const [cryptoList, setCryptyList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [searchQuery, setSearchQuery] = useState("");

  const options = [
    { value: "market_cap_rank", label: "Rank" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price (Low to High)" },
    { value: "price_desc", label: "Price (High to Low)" },
    { value: "change", label: "24h Change" },
    { value: "market_cap", label: "Market Cap" },
  ];

  //useEffect(() => {
  //   const interval = setInterval(fetchCryptoData, 30000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [sortBy, cryptoList, searchQuery]);

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptos();
      setCryptyList(data);
      // console.log(data)
    } catch (err) {
      console.log("Error fetching crypto", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSort = () => {
    let filtered = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });
    setFilteredList(filtered);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Crypto Tracker</h1>
            <p>Real-time cryptocurrency prices and market data</p>
          </div>
          <div className="search-section">
            <input
              type="text"
              placeholder="Search cryptos..."
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
        </div>
      </header>
      <div className="controls">
        <div className="filter-group">
          {" "}
          <label>Sort by:</label> {/* npm install react-select*/}
          <Select
            value={options.find((opt) => opt.value === sortBy)}
            onChange={(selected) => setSortBy(selected.value)}
            options={options}
            isSearchable={false}
            styles={{
              control: (base, state) => ({
                ...base,
                padding: "0.75rem 1.25rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                background: state.isFocused
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(224, 15, 15, 0.05)",
                fontSize: "0.95rem",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                boxShadow: state.isFocused
                  ? "0 0 0 3px rgba(173, 216, 230, 0.2)"
                  : "none",
                minHeight: "44px",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
                fontSize: "0.95rem",
              }),
              menu: (base) => ({
                ...base,
                background: "#010203",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }),
              option: (base, state) => ({
                ...base,
                background: state.isFocused
                  ? "rgba(173, 216, 230, 0.15)"
                  : "transparent",
                color: "white",
                cursor: "pointer",
                fontSize: "0.95rem",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#e0e0e0",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
          />
        </div>

        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">
          <div className="spinner" /> {/*#3 */}
          <p>Loading crypto data...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {filteredList.map((crypto, key) => (
            <CryptoCard crypto={crypto} key={key} />
          ))}
        </div>
      )}
      <footer className="footer">
        <p>Data provided by CoinGecko API • Updated every 30 seconds</p>
      </footer>
    </div>
  );
};
