import { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== " ") {
      onSearch(query);
    }
    if (query.trim() === "") {
      alert("Please enter a valid movie name");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="search movies here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
        style={{ 
          padding: "8px",
          borderRadius: "5px",
          marginBottom: "20px",
          fontSize: "16px",
          width: "500px",
          fontStyle: "roboto",
        }}
      />
      <button onClick={handleSearch} style={{ 
          padding: "8px",
          borderRadius: "5px",
          marginBottom: "20px",
          fontSize: "16px",
          width: "80px",
          fontStyle: "Italic",
        }}>
        Search
      </button>
    </div>
  );
}

export default Search;
