import React from "react";
import styled from "styled-components";

const DetailsContainer = styled.div`
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center align items vertically */
  background-color: #ffffff; /* White background for details */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 20px;
  margin: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animation on hover */

  &:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
  }
`;

const MoviePoster = styled.img`
  max-width: 200px; /* Limit width of poster */
  border-radius: 10px; /* Rounded corners for poster */
  margin-right: 20px; /* Space to the right of the image */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Shadow for the image */
`;

const DetailsContent = styled.div`
  display: flex; /* Use flexbox for the details section */
  flex-direction: column; /* Align details vertically */
`;

const MovieTitle = styled.h2`
  color: #343a40; /* Dark gray for title */
  margin-bottom: 10px; /* Space below title */
  font-size: 2rem; /* Large font size for title */
`;

const MovieDetail = styled.p`
  font-size: 1.2rem; /* Font size for details */
  margin: 5px 0; /* Spacing between details */
  color: #495057; /* Darker gray for details */
`;

const BackButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  color: #ffffff;
  background-color: #007bff; /* Bootstrap primary color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; /* Animation for button */

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: scale(1.05); /* Slight zoom effect on hover */
  }
`;

const MovieDetails = ({ movie }) => {
  return (
    <DetailsContainer>
      <MoviePoster src={movie.Poster} alt={movie.Title} />
      <DetailsContent>
        <MovieTitle>{movie.Title}</MovieTitle>
        <MovieDetail><strong>Plot:</strong> {movie.Plot}</MovieDetail>
        <MovieDetail><strong>Rating:</strong> {movie.imdbRating}</MovieDetail>
        <MovieDetail><strong>Year:</strong> {movie.Year}</MovieDetail>
        <BackButton onClick={() => window.location.reload()}>Back to Search</BackButton>
      </DetailsContent>
    </DetailsContainer>
  );
};

export default MovieDetails;
