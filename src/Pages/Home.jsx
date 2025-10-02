import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Components/SearchBar.jsx";
import NavBar from "../Components/NavBar.jsx";
import LoadingGif from "../assets/loadingGif.gif";
import { VscStarHalf } from "react-icons/vsc";
import { FaArrowUp } from "react-icons/fa";
import Footer from "../Components/Footer.jsx";
import Trending from "../Components/Trending.jsx";
import useFetch from "../Hooks/useFetch.jsx";
import UpComingMovies from "../Components/UpComing.jsx";
import Trailers from "../Components/Trailers.jsx";
import "../assets/Home.css"; // Import dark theme CSS

const URL = "https://api.themoviedb.org/3";

function Home({
  apiKey,
  user = { username: "Guest" },
  onLogout = () => {},
  defaultSearchQuery = "",
}) {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState(defaultSearchQuery);
  const { data: movies, loading, error } = useFetch(url);
  const [userName, setUserName] = useState(user.username);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  const name = userName.toUpperCase();

  function customTrimTitle(title) {
    const parts = title.split('-');
    const firstPart = parts[0]?.trim();
    const secondPart = parts[1] ? "- " + parts[1].trim() : '';
    return { firstPart, secondPart };
  }

  // Authentication check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setUserName(currentUser?.username || user.username);
    }
  }, [navigate, user.username]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle window close
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setUrl(`${URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    onLogout(navigate);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <h1
        className="welcome-heading"
        onClick={handleLogout}
        title="Click to logout"
      >
        Welcome, {name}!
      </h1>
      <div className="wrapper-search">
        <Search onSearch={handleSearch} initialQuery={defaultSearchQuery} />
        {loading && (
          <div className="loading-container">
            <img src={LoadingGif} alt="Loading..." width="200" />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}

        {searchTerm && movies?.length > 0 && (
          <p className="search-results">
            {`Results for "${searchTerm}": ${movies.length}`}
          </p>
        )}
        {searchTerm && movies?.length === 0 && !loading && (
          <p className="no-results">
            No results found for "{searchTerm}"
          </p>
        )}

        {!searchTerm && (
          <>
            <Trailers />
            <Trending />
            <UpComingMovies />
          </>
        )}

        {movies?.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => {
              const { firstPart, secondPart } = customTrimTitle(movie.title);

              return (
                <div className="movie-card" key={movie.id}>
                  <h2>
                    {firstPart}
                    <br />
                    <span className="subtitle">{secondPart}</span>
                  </h2>
                  <p className="release-year">{movie.release_date?.split("-")[0]}</p>
                  <p className="language">Language: {movie.original_language.toUpperCase()}</p>
                  <p className="rating">
                    <VscStarHalf className="star-icon" /> {movie.vote_average.toFixed(1)}
                  </p>
                  {movie.poster_path ? (
                    <Link to={`/plot?id=${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                      />
                    </Link>
                  ) : (
                    <img
                      src="https://via.placeholder.com/500x750?text=No+Image+Available"
                      alt={movie.title}
                      className="movie-poster"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {movies?.length === 1 && searchTerm && (
          <div className="single-movie-info">
            <h2>{movies[0].title}</h2>
            <p>Language: {movies[0].original_language.toUpperCase()}</p>
            <p>Release Date: {movies[0].release_date}</p>
            <p>Rating: {movies[0].vote_average.toFixed(1)}</p>
            <p>Vote Count: {movies[0].vote_count}</p>
            {movies[0].poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movies[0].poster_path}`}
                alt={movies[0].title}
                className="movie-poster"
              />
            )}
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-button"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      <Footer />
    </div>
  );
}

export default Home;