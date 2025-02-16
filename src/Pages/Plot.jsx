import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingGif from "/Users/pranaysinguluri/movie-bluff/src/assets/loadingGif.gif";
import Footer from "../Components /Footer";

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
    <div className="plot">
      <h1>Movie Plot</h1>
      {loading && (
                <div style={{ textAlign: "center", marginTop: "200px" }}>
                  <img src={LoadingGif} alt="Loading..." width="100" />
                  <p>Fetching Plot...</p>
                </div>
              )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && plot === "N/A" && <p>No plot at the moment.</p>}
      {!loading && !error && plot && <p>{plot}</p>}
      <Footer />
      <br />
    </div>
  );
};

export default Plot;
