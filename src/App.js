import React, { useState } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import styled, { keyframes } from "styled-components";

const API_KEY = "ead6f7cf"; 


const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff; /* Light blue background */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* Deeper shadow for depth */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align items */
`;

const Title = styled.h1`
  color: #2c3e50; /* Darker gray for title */
  margin-bottom: 30px; /* More spacing below title */
  font-size: 2.8rem; /* Slightly larger font size for title */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Shadow effect for title */
  font-family: 'Algerian', cursive; /* Set font to Algerian */
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%; /* Full width */
  max-width: 700px; /* Limit max width */
  margin-bottom: 30px; /* More space below the search bar */
`;

const SearchInput = styled.input`
  flex: 1; /* Take up remaining space */
  padding: 15px; /* Increased padding for comfort */
  border: 2px solid #61dafb; /* Light blue border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1.2rem; /* Larger font size for input */
  transition: border-color 0.3s, box-shadow 0.3s; /* Transition for focus */
  margin-right: 10px; /* Spacing between input and button */
  
  &:focus {
    border-color: #007bff; /* Darker blue on focus */
    outline: none; /* Remove outline */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Box shadow on focus */
  }
`;

const SearchButton = styled.button`
  padding: 15px 20px; /* Increased padding */
  font-size: 1.2rem; /* Larger font size */
  color: #fff;
  background-color: #007bff; /* Bootstrap primary color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover */

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
    transform: scale(1.05); /* Slightly enlarge on hover */
  }
`;

const LoadingMessage = styled.p`
  color: #ff7f50; /* Coral color for loading message */
  font-size: 1.5rem; /* Larger font size */
  animation: ${fadeIn} 0.5s ease-in; /* Fade-in animation */
`;

const ErrorMessage = styled.p`
  color: #dc3545; /* Red color for error message */
  font-size: 1.5rem; /* Larger font size */
  animation: ${fadeIn} 0.5s ease-in; /* Fade-in animation */
`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (searchTerm.trim() === "") return;
    setLoading(true);
    setError(""); 

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );
      if (response.data.Response === "False") {
        setError(response.data.Error);
        setMovies([]); 
      } else {
        setMovies(response.data.Search || []);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const viewMovieDetails = async (movieId) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
    );
    setSelectedMovie(response.data);
  };

  return (
    <Container>
      <Title>Movify</Title>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={searchMovies}>Search</SearchButton>
      </SearchBar>

      {loading && <LoadingMessage>Loading movies...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <MovieList movies={movies} onMovieClick={viewMovieDetails} />
      )}
    </Container>
  );
};

export default App;
