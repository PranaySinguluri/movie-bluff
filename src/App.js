import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "/Users/pranaysinguluri/movie-bluff/src/Components /Search.jsx";
import Plot from "/Users/pranaysinguluri/movie-bluff/src/Pages/Plot.jsx";
import Home from "/Users/pranaysinguluri/movie-bluff/src/Pages/Home.jsx";
import About from "/Users/pranaysinguluri/movie-bluff/src/Pages/About.jsx";


const API_KEY = "30f7503d";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        if (result.Response === "True") {
          setData(result.Search);
        } else {
          throw new Error(result.Error);
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

  const handleSearch = (query) => {
    setUrl(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  };

  const { data: movies, loading, error } = useFetch(url);

  return (
    <Router>
      {/* Navigation Links */}
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route
          path="/"
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
                Movie Bluff
              </h1>

              <Search onSearch={handleSearch} />

              {loading && <p>Loading...</p>}
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

              <p
                style={{
                  padding: "10px",
                  textAlign: "center",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                Number of results: {movies ? movies.length : 0}
              </p>

              {movies && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {movies.map((movie) => (
                    <div
                      key={movie.imdbID}
                      style={{
                        border: "1px solid",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      <h2
                        style={{
                          border: "1px solid #ddd",
                          padding: "10px",
                          textAlign: "center",
                        }}
                      >
                        {movie.Title}
                      </h2>
                      <p
                        style={{
                          border: "1px solid #ddd",
                          padding: "10px",
                          textAlign: "center",
                        }}
                      >
                        {movie.Year}
                      </p>
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        style={{ width: "100px", height: "150px" }}
                      />
                       <br />
                      <Link to={`/plot?id=${movie.imdbID}`}>View Plot</Link> 
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
        />
        <Route path="/plot" element={<Plot />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
