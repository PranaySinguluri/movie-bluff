import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch"; // ✅ Import the custom hook
import "../assets/Trailer.css"; // ✅ Import styles

 const url = "https://api.themoviedb.org/3/movie/upcoming";

const Trailers = () => {
  const { data: movies, loading, error } = useFetch(url);
  const [, setMovieVideos] = useState({}); // Store trailers
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrailers = async () => {
      if (!movies) return;
      const promises = movies.map(async (movie) => {
        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results.length > 0) {
            const trailer = data.results.find((video) => video.type === "Trailer") || data.results[0];
            setMovieVideos((prev) => ({
              ...prev,
              [movie.id]: trailer,
            }));
          }
        } catch (err) {
          console.error(`Error fetching videos for movie ${movie.id}:`, err);
        }
      });

      await Promise.all(promises); // Wait for all fetch calls to complete
    };

    fetchTrailers();
  }, [movies]);

  if (loading) return <p className="trailer-loading">Loading...</p>;
  if (error) return <p className="trailer-error">Error: {error}</p>;
  if (!movies || movies.length === 0) return <p>No upcoming movies available.</p>;

  return (
    <div className="trailer-container">
      <h1 className="trailer-title">Trailers Movies</h1>
      <div className="trailer-movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="trailer-movie-card"
            onClick={() => navigate(`/plot?id=${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="trailer-movie-image"
            />
            <p className="trailer-movie-title">{movie.title}</p>
            <p className="trailer-movie-year">{movie.release_date?.split("-")[0] || "Unknown"}</p>
            <p className="trailer-rating">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10</p>
            <p className="trailer-popularity">🔥 Popularity: {movie.popularity ? movie.popularity.toFixed(0) : "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailers;
