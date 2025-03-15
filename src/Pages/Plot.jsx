import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingGif from "/Users/pranaysinguluri/movie-bluff/src/assets/loadingGif.gif";
import Footer from "../Components /Footer";

const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTE4ZjcwZDU1ZGIxMzRmMDk0OTE3ZGE5ZWZjYjczNSIsIm5iZiI6MTczNzgyOTg0MS4zODQsInN1YiI6IjY3OTUyZGQxZDRiYTE3MjVmMTJhZTFmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK8RSiK_PHNzJsBd4CTpDD7weTGXKnGa8RxQjtEJckw"; // Replace with your actual token
const BASE_URL = "https://api.themoviedb.org/3/movie/";

const Plot = () => {
  const [plot, setPlot] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("id");

  useEffect(() => {
    if (!movieId) return;

    const fetchPlot = async () => {
      try {
        const response = await fetch(`${BASE_URL}${movieId}`, {  // ✅ Append movieId
          method: "GET",
          headers: {
            "Authorization": `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        setPlot(result.overview || "Plot not available.");
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
      {!loading && !error && <p>{plot}</p>}
      <Footer />
      <br />
    </div>
  );
};

export default Plot;
