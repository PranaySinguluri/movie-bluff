import React, { useState, useEffect, Fragment } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Search from "../Components/SearchBar.jsx";
// import Plot from "../Pages/Plot.jsx";
// import About from "../Pages/About.jsx";
import NavBar from "../Components/NavBar.jsx";
import LoadingGif from "../assets/loadingGif.gif";
//import ErrorPage from "../Pages/ErrorPage.jsx";
import { VscStarHalf } from "react-icons/vsc";
import Footer from "../Components/Footer.jsx";
// import Login from "./Login";
// import SignUp from "../Pages/SignUp.jsx";
import Trending from "../Components/Trending.jsx";
import useFetch from "../Hooks/useFetch.jsx";
// import TrendingMovies from "../Components /Trending.jsx";
// import Welcome from "./Welcome.jsx";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function Home() {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: movies, loading, error } = useFetch(url);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setUserName(currentUser?.username || "Guest");
    }
  }, [navigate]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setUrl(`${TMDB_BASE_URL}/search/movie?query=${query}`);
  };

  const handleLogout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login"); // Redirect to login page
  };


  return (
    <>
      <NavBar />
      <h2 style={{
        display:"flex"
      }} onClick={handleLogout}>Welcome to Movie Bluff, {userName}!</h2>
      <Routes>
        <Route
          path="/"
          element={
            <div className="wrapper-search">
              <Search onSearch={handleSearch} />

              {loading && (
                <div className="loading-container">
                  <img src={LoadingGif} alt="Loading..." width="200" />
                </div>
              )}
              {error && <p className="error-message">{error}</p>}

              {searchTerm && movies && movies.length > 0 && (
                <p className="results-info">
                  {`Results for "${searchTerm}": ${movies.length}`}
                </p>
              )}

              {!searchTerm || (movies && movies.length === 0) ? <Trending /> : null} 

              {movies && movies.length > 0 && (
                <div className="movie-grid">
                  {movies.map((movie) => (
                    <div className="movie-card" key={movie.id} >
                      <h2>{movie.title}</h2>
                      <p>{movie.release_date?.split("-")[0]}</p>
                      <p>Language: {movie.original_language.toUpperCase()}</p>
                      <p>
                        <VscStarHalf /> {movie.vote_average.toFixed(1)}
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
                      <p> No Poster Available</p>
                    )}

                    </div>
                  ))}
                </div>
              )}
              <Footer />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default Home;
