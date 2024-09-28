import React from 'react';
import styled from 'styled-components';

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive columns */
  gap: 20px; /* Spacing between movie items */
  width: 100%;
`;

const MovieCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Smooth hover effect */
  cursor: pointer;

  &:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* Deeper shadow on hover */
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover; /* Ensure images are not distorted */
`;

const MovieTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  text-align: center;
  padding: 10px;
  background-color: #f0f8ff; /* Light blue background */
  border-top: 1px solid #ddd; /* Separator line */
`;

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <MovieGrid>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.imdbID} onClick={() => onMovieClick(movie.imdbID)}>
            <MovieImage src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'} alt={movie.Title} />
            <MovieTitle>{movie.Title}</MovieTitle>
          </MovieCard>
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </MovieGrid>
  );
};

export default MovieList;
