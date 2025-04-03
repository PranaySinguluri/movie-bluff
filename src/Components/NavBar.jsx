import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import "/Users/pranaysinguluri/movie-bluff/src/assets/NavBar.css"; // Import the separate CSS file
import { Nav } from "react-bootstrap";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  return (
    <Nav className="navbar">
      <div className="logo">
        <Link to="/home" className="link-bold">
          Movie Bluff
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/home" className="nav-link">
          <VscHome size={20} /> Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        {/* {!isAuthenticated ? (
              <button className="nav-buttons" type="button" onClick={handleLogin}>
                Login
              </button>
            ) : (
              <button className="nav-buttons" type="button" onClick={handleLogout}>
                Logout
              </button>
            )} */}
        {isAuthenticated && (
          <Link to="/Profile" className="nav-link">
            Profile
          </Link>
        )}
      </div>
    </Nav>
  );
};

export default NavBar;
