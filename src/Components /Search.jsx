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
<<<<<<< Updated upstream
    <div style={searchStyle}>
=======
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff", 
        borderRadius: "50px",
        border: focused ? "2px solid #fff" : "2px solid transparent", // White focus border
        padding: "12px 20px",
        transition: "0.3s ease",
        width: "50%", 
        maxWidth: "800px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)", // Strong black shadow
        margin: "20px auto", // Centering the search bar
      }}
    >
      <CiSearch style={{ color: "#000", fontSize: "24px", marginRight: "12px" }} />
>>>>>>> Stashed changes
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
