import { useLocation, useNavigate } from "react-router-dom";
import { Profiler, useEffect, useState } from "react";
import LoadingGif from "../assets/loadingGif.gif";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import "../assets/Plot.css";
import Reviews from "../Components/Reviews";
import useFetch from "../Hooks/useFetch";

const BASE_URL = "https://api.themoviedb.org/3/movie/";

const Plot = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("id");

  // Correct usage of useFetch as a hook
  const { data: movieData, loading, error } = useFetch(
    movieId ? `${BASE_URL}${movieId}` : null
  );

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setUserName(currentUser?.userName || "Guest");
    }
  }, [navigate]);

  return (
    <>
    <Profiler id="NavBar" onRender={(id, phase, actualDuration) => {
      console.log({ id, phase, actualDuration });
    }}>
      <NavBar />
      <div className="plot">
        <h1>Movie Plot</h1>
        {loading && (
          <div style={{ textAlign: "center", marginTop: "200px" }}>
            <img src={LoadingGif} alt="Loading..." width="100" />
            <p>Fetching Plot... {userName}</p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && movieData && (
          <>
            <div className="movie-container">
              <div className="movie-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                  alt={movieData.title}
                />
              </div>
              <div className="movie-details">
                <h1 className="movie-title">{movieData.title}</h1>
                <p className="movie-overview">{movieData.tagline}</p>
                <p className="movie-overview">
                  <strong>Release Date:</strong> {movieData.release_date}
                </p>
                <p className="movie-overview">
                  <strong>Genre:</strong> {movieData.genres?.map((genre) => genre.name).join(", ")}
                </p>  
                <br/>
                <p className="movie-overview">{movieData.overview}</p>
              
              </div>
            </div>
            <br />
              <div>
              <Reviews />
            </div>
          </>
        )}
        <Footer />
      </div>
      </Profiler>
    </>
  );
};

export default Plot;