import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("id");

  const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTE4ZjcwZDU1ZGIxMzRmMDk0OTE3ZGE5ZWZjYjczNSIsIm5iZiI6MTczNzgyOTg0MS4zODQsInN1YiI6IjY3OTUyZGQxZDRiYTE3MjVmMTJhZTFmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK8RSiK_PHNzJsBd4CTpDD7weTGXKnGa8RxQjtEJckw"; // Replace with your actual Bearer Token

  useEffect(() => {
    if (!movieId) {
      setError("Movie ID is missing or invalid.");
      setLoading(false);
      return; // Don't proceed with the API call if movieId is undefined
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        console.log("API Response:", data); // Log API response for debugging

        if (data?.results && data.results.length > 0) {
          setReviews(data.results);
        } else {
          console.log("No reviews found.");
        }
      } catch (err) {
        setError("Failed to load reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="movie-reviews">
      {reviews.length === 0 ? (
        <p>No reviews available for this movie.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review">
           <h4 style={{fontSize:20, fontStyle:"block"}}>Reviewed : {review.author_details?.name || review.author}</h4>
            <p>{review.content}</p>
            {/* <a href={review.url} target="_blank" rel="noreferrer">
              Read more
            </a> */}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default MovieReviews;
