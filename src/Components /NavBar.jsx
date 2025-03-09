import React from "react";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";

const NavBar = ({ setKey }) => {
  const handleHomeReset = () => {
    setKey((prevKey) => prevKey + 1); // Force re-mount of Home component
  };

  return (
    <nav
      style={{
        backgroundColor: "black",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo / Title */}
      <div style={{ textAlign: "center" }}>
        <Link
          to="/home"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "20px",
            paddingLeft: "30px",
            fontWeight: "bold",
          }}
        >
          Movie Bluff
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link
          to="/home"
          onClick={handleHomeReset}
          style={{
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <VscHome size={20} /> Home
        </Link>

        <Link
          to="/about"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          About
        </Link>

        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
        <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>Signup</Link>
      </div>
    </nav>
  );
};

export default NavBar;
