import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components /Footer";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 Error</h1>
      <p>Page not found</p>
      <p> Go back to 
        <Link to="/Home" style={{ textDecoration: "none", color: "blue" }}>
          <span/> Home </Link>  
          </p>
        < Footer />
    </div>
  );
}
 export default ErrorPage;