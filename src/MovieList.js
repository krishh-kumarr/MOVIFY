import React from "react";

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <div>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID} onClick={() => onMovieClick(movie.imdbID)}>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Title} ({movie.Year})</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
