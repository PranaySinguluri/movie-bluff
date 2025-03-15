import React from "react";
import { useLocation } from "react-router-dom";
import Home from "./Home";

const Welcome = () => {
  const location = useLocation(); // Get the location object
  const userName = location.state?.username || "Guest"; // Default to "Guest" if no name is passed

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Movie Bluff, {userName}!</h1>
      <Home />
    </div>
  );
};

export default Welcome;
