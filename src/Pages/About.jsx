import React from "react";
import { VscTwitter } from "react-icons/vsc";
import Footer from "../Components /Footer";

const About = () => {
  return (
    <div style={{ textAlign: "center", paddingBottom: "80px" }}>
      <p>This is a movie search app where you can find movie details and plots.</p>
      <p>Version: 1.0.0</p>
        <p 
          style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "5px" }} 
          onClick={() => window.open("https://x.com/pranaysinguluri")}
        >
          <VscTwitter /> Follow us on Twitter
        </p>
        <Footer />
    </div>
  );
};

export default About;
