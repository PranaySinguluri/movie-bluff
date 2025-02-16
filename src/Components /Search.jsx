import React, { useState } from "react";

const searchStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px"
};

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
    }
    if (query.trim() === "") {
      alert("Please enter a valid movie name");
    }
  };

  return (
    <div style={searchStyle}>
      <input
        type="text"
        placeholder= "search movies here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
        style={{
          padding: "8px",
          borderRadius: "60px",
          marginBottom: "20px",
          fontSize: "16px",
          width: "500px",
          fontFamily: "Roboto, sans-serif",
        }}
      />
      <button 
        onClick={handleSearch} 
        style={{
          padding: "8px",
          borderRadius: "60px",
          marginBottom: "20px",
          fontSize: "16px",
          width: "80px",
          fontStyle: "italic",
          cursor: "pointer", // Added for better UX
        }}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
