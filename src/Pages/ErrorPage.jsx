import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "/Users/pranaysinguluri/movie-bluff/src/Components /Footer.jsx";

function ErrorPage() {
  useEffect(() => {
    document.title = "404 - Page Not Found";
    window.history.replaceState({}, "404 - Not Found", window.location.href);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 Error</h1>
      <p>Page not found</p>
      <p> Go back to 
        <Link to="/Home" style={{ textDecoration: "none", color: "blue" }}>
          <span/> Home </Link>  
          </p>
      <Footer />
    </div>
  );
}

export default ErrorPage;

