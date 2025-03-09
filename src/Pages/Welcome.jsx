import React from "react";
import { useLocation } from "react-router-dom";

const Welcome = () => {
  const location = useLocation(); // Get the location object
  const userName = location.state?.username || "Guest"; // Default to "Guest" if no name is passed

  return (
    <div>
      Welcome to Movie Bluff, {userName}!
    </div>

  );
};

export default Welcome;
