import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const API_KEY = "30f7503d";
const BASE_URL = "https://www.omdbapi.com/";

const Plot = () => {
  const [plot, setPlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("id");

  useEffect(() => {
    if (!movieId) return;

    const fetchPlot = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        if (result.Response === "True") {
          setPlot(result.Plot);
        } else {
          throw new Error(result.Error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlot();
  }, [movieId]);

  return (
    <div style={{ textAlign: "center",
      gridArea: "content",
      padding: "20px",
      backgroundColor: "lightgray",
      borderRadius: "50px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      margin: "20px",

     }}>
      <h1>Movie Plot</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && plot === "N/A" && <p>No plot at the moment.</p>}
      {!loading && !error && plot && <p>{plot}</p>}
      <nav style={{ textAlign: "center", padding: "20px" }}>
        <Link to="/">Home</Link> 
      </nav>
    </div>
  );
};

export default Plot;
