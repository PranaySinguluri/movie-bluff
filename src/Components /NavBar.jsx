import React from "react";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";

const NavBar = ({ setKey }) => {
  const handleHomeReset = () => {
    setKey((prevKey) => prevKey + 1); // Force re-mount of Home component
  };

  return (
    <nav style={{ backgroundColor: "black", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Centering "Movie Bluff" */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <Link
          to="/Home"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Movie Bluff
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/Home"
          onClick={handleHomeReset}
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            marginRight: "4px",
          }}
        >
          <VscHome size={20} /> Home
        </Link>

        <span style={{ color: "white", marginRight: "40px" }}></span>
        <Link
          to="/about"
            style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
