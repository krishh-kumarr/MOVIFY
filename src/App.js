import React, { useState } from "react";
import axios from "axios";
import MovieList from './MovieList';
import MovieDetails from "./MovieDetails";
import AppHeader from "./AppHeader"; // Import the header component
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
  background-image: url('/bgimage.jpg'); /* Set background image */
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white; /* Change text color to white for better contrast */
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Algerian', cursive;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 2px solid #61dafb;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  margin-right: 10px;
  
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  padding: 15px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const LoadingMessage = styled.p`
  color: #ff7f50;
  font-size: 1.5rem;
  animation: ${fadeIn} 0.5s ease-in;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 1.5rem;
  animation: ${fadeIn} 0.5s ease-in;
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
    <>
      <AppHeader /> {/* Add the header component */}
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
    </>
  );
};

export default App;
