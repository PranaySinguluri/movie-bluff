import React, { useState } from "react";
import useFetch from "../Hooks/useFetch"; // Correct relative path
import '/Users/pranaysinguluri/movie-bluff/src/assets/Trending.css';  // Import the new CSS file
import "/Users/pranaysinguluri/movie-bluff/src/Pages/Plot.jsx";
const API_URL = "https://api.themoviedb.org/3/trending/movie/day";

function TrendingMovies() {
  const { data: movies, loading, error } = useFetch(API_URL);
  const [hoveredMovieId, setHoveredMovieId] = useState(null); // State to track hovered movie

  if (loading) return <p className="trending-loading">Loading...</p>;
  if (error) return <p className="trending-error">Error: {error}</p>;
  if (!movies) return <p>No movies available.</p>;

  return (
    <div className="trending-container">
      <h1 className="trending-title">Trending Movies</h1>
      <div className="trending-movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="trending-movie-card"
            onMouseEnter={() => setHoveredMovieId(movie.id)} // Set hover state
            onMouseLeave={() => setHoveredMovieId(null)} // Reset hover state
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="trending-movie-image"
            />
            {hoveredMovieId === movie.id && (
              <div className="movie-title-overlay">
                <p className="movie-title">{movie.title}</p>
              </div>
            )}
            <p className="trending-movie-year">
              {movie.release_date?.split("-")[0] || "Unknown"}
            </p>
            <p className="trending-rating">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
            </p>
            <p className="trending-popularity">
              🔥 Popularity: {movie.popularity ? movie.popularity.toFixed(0) : "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingMovies;
