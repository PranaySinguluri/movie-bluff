import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "/Users/pranaysinguluri/movie-bluff/src/Components /Search.jsx";
import Plot from "/Users/pranaysinguluri/movie-bluff/src/Pages/Plot.jsx";
import About from "/Users/pranaysinguluri/movie-bluff/src/Pages/About.jsx";
import NavBar from "/Users/pranaysinguluri/movie-bluff/src/Components /NavBar.jsx";
import LoadingGif from "/Users/pranaysinguluri/movie-bluff/src/assets/loadingGif.gif"; 
import ErrorPage from "/Users/pranaysinguluri/movie-bluff/src/Pages/ErrorPage.jsx";
import { VscStarHalf } from "react-icons/vsc";
import Footer from "/Users/pranaysinguluri/movie-bluff/src/Components /Footer.jsx";

const API_KEY = "30f7503d";
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        if (response.data.Response === "True") {
          const movies = response.data.Search;
          const moviesWithDetails = await Promise.all(
            movies.map(async (movie) => {
              const detailsResponse = await axios.get(
                `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
              );
              return {
                ...movie,
                imdbRating: detailsResponse.data.imdbRating || "N/A",
                language: detailsResponse.data.Language || "N/A", // Fetching the language
              };
            })
          );

          setData(moviesWithDetails);
        } else {
          throw new Error(response.data.Error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

function App() {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term
  const { data: movies, loading, error } = useFetch(url);

  const handleSearch = (query) => {
    setSearchTerm(query); // Update the search term
    setUrl(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/Home"
          element={
            <div className="wrapper-search">
              <h1
                style={{
                  fontFamily: "Roboto, sans-serif",
                  textAlign: "center",
                  color: "Black",
                  fontSize: "50px",
                  margin: "60px 0",
                }}
              >
              </h1>
              <Search onSearch={handleSearch} />

              {loading && (
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                  <img src={LoadingGif} alt="Loading..." width="200" />
                </div>
              )}

              {error && (
                <p
                  style={{
                    color: "red",
                    border: "1px solid #ddd",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}

              {/* Display number of results for the current search term */}
              {searchTerm && movies && movies.length > 0 && (
                <p
                  style={{
                    padding: "10px",
                    textAlign: "center",
                    fontFamily: "Roboto, sans-serif",
                    color: "black",
                  }}
                >
                  {`Number of results for "${searchTerm}": ${movies.length}`}
                </p>
              )}

              {movies && (
                <div
                  style={{
                    backgroundColor: "smoke white",
                    marginInlineEnd: "20px",
                    marginLeft: "20px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "50px",
                  }}
                >
                  {movies.map((movie) => (
                    <div
                      key={movie.imdbID}
                      style={{
                        border: "2px solid #ddd",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          margin: "10px 0",
                          textAlign: "center",
                          lineHeight: "",
                        }}
                      >
                        {movie.Title}
                      </h2>
                      <p
                        style={{
                          fontSize: "14px",
                          margin: "10px 0",
                          textAlign: "center",
                          lineHeight: "1.2",
                        }}
                      >
                        {movie.Year}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          margin: "10px 0",
                          textAlign: "center",
                          lineHeight: "1.2",
                        }}
                      >
                       {movie.language}
                      </p>
                      <p
                        style={{
                          padding: "10px",
                          textAlign: "center",
                        }}
                      >
                        <VscStarHalf /> {movie.imdbRating}
                      </p>
                      <Link to={`/plot?id=${movie.imdbID}`}>
                        <img
                          src={movie.Poster}
                          alt={movie.Title}
                          style={{ width: "100px", height: "150px" }}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <Footer />
              <br />
            </div>
          }
        />
        <Route path="/plot" element={<Plot />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
