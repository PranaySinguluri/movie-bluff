import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff", // White background
        borderRadius: "50px",
        border: focused ? "2px solid #fff" : "2px solid transparent", // White focus border
        padding: "12px 20px",
        transition: "0.3s ease",
        width: "80%", // 80% of screen width
        maxWidth: "800px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)", // Strong black shadow
        margin: "20px auto", // Centering the search bar
      }}
    >
      <CiSearch style={{ color: "#000", fontSize: "24px", marginRight: "12px" }} />
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#000", // Black text
          fontSize: "18px",
          flex: "1",
        }}
      />
    </div>
  );
};

export default SearchBar;
