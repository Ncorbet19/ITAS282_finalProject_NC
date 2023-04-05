import React, { useState, useEffect } from "react";
import "../css/MoviesDetails.css"
import "./ClubDetail.js"

function MovieDetails(props) {
  const { event, onDelete } = props;
  const [movieData, setMovieData] = useState(null);
  const movieTitle = event.title.substring(0, event.title.indexOf("(")).trim();

  useEffect(() => {
    // Fetch movie data from OMDb API
    const fetchMovieData = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${movieTitle}&apikey=74915c59`
      );
      const data = await response.json();
      setMovieData(data);
    };
    fetchMovieData();
  }, [movieTitle]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };

  const getTrailerLink = () => {
    if (movieData && movieData.Type === "movie") {
      const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        movieTitle
      )}+trailer`;
      return youtubeSearch;
    }
    return null;
  };

  const movie = {
    movie: event.title.split(" (")[0],
    date: event.start.toISOString().split("T")[0],
    time: event.title.match(/\((.*)\)/)[1],
    movieId: event.id,
  };
  

  return (
    <div className="card">
      <div className="movie-details">
        <br></br>
        {movieData && (
          <div className="movie-poster">
            <img
              src={movieData.Poster}
              alt={movieTitle}
              style={{ width: "150px" }}
            />
          </div>
        )}
        <div className="movie-info">
          <h3>{movieTitle}</h3>
          <p>Date: {formatDate(new Date(event.start))}</p>
          <p>Time: {formatTime(new Date(event.start))}</p>
          {getTrailerLink() && (
            <p>
              <a
                href={getTrailerLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
            </p>
          )}
        </div>
        <button
          className="red-link"
          onClick={() =>
            props.onRemoveMovie(event.title.split(" (")[0], props.clubName)
          }
        >
          Remove movie
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
