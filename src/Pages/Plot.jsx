import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingGif from "/Users/pranaysinguluri/movie-bluff/src/assets/loadingGif.gif";
import Footer from "/Users/pranaysinguluri/movie-bluff/src/Components /Footer.jsx";
import axios from "axios";

<<<<<<< Updated upstream
const API_KEY = "30f7503d";
const BASE_URL = "https://www.omdbapi.com/"; 
=======
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTE4ZjcwZDU1ZGIxMzRmMDk0OTE3ZGE5ZWZjYjczNSIsIm5iZiI6MTczNzgyOTg0MS4zODQsInN1YiI6IjY3OTUyZGQxZDRiYTE3MjVmMTJhZTFmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK8RSiK_PHNzJsBd4CTpDD7weTGXKnGa8RxQjtEJckw'; // Better to store it in env variables
const BASE_URL = "https://api.themoviedb.org/3/movie/";
>>>>>>> Stashed changes

const Plot = () => {
  const [plot, setPlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("id");
  const searchQuery = searchParams.get("query");

  const handlePlot = (movieId) => {
    const url = `${BASE_URL}${movieId}`;
    fetchPlot(url);
  };

  const fetchPlot = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) throw new Error("Network response was not ok");

      setPlot(response.data.overview);  // Assuming the plot is in 'overview' field
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!movieId) return;

    const fetchPlot = async () => {
      setLoading(true);
      try {
<<<<<<< Updated upstream
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        if (result.Response === "True") {
          setPlot(result.Plot);
        } else {
          throw new Error(result.Error);
        }
=======
        const response = await axios.get(`${BASE_URL}${movieId}`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) throw new Error("Network response was not ok");

        setPlot(response.data.overview);
>>>>>>> Stashed changes
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlot();
  }, [movieId]);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setIsSearching(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${BEARER_TOKEN}&query=${searchQuery}`
        );

        if (response.status !== 200) throw new Error("Network response was not ok");

        setSearchResults(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

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
      {!loading && !error && !plot && <p>No plot available at the moment.</p>}
      {!loading && !error && plot && <p>{plot}</p>}

      {/* Conditionally render Trending or Searched Movies */}
      
      {isSearching && !loading && !error && searchResults.length === 0 && (
        <p>No results found for "{searchQuery}".</p>
      )}

      {isSearching && !loading && !error && searchResults.length > 0 && (
        <div>
          <h2>Searched Movies</h2>
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id} onClick={() => handlePlot(movie.id)}>
                {movie.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
      <br />
    </div>
  );
};

export default Plot;
