import React, { useState } from "react";
import axios from "axios";
import MovieList from './MovieList';
import MovieDetails from "./MovieDetails";
import AppHeader from "./AppHeader";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Film, Star } from "lucide-react";

const API_KEY = "ead6f7cf";

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const slideIn = keyframes`
  0% { transform: translateY(-20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 40px auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  animation: ${fadeIn} 1s ease-out;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  color: #ffd700;
  margin-bottom: 40px;
  font-size: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Algerian', cursive;
  animation: ${slideIn} 1s ease-out, ${pulse} 2s infinite ease-in-out;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
  animation: ${slideIn} 1s ease-out 0.3s both;
  position: relative;
  z-index: 1;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 18px;
  border: 2px solid #ffd700;
  border-radius: 30px 0 0 30px;
  font-size: 1.2rem;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    border-color: #ff8c00;
    outline: none;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SearchButton = styled.button`
  padding: 18px 30px;
  font-size: 1.2rem;
  color: #000;
  background-color: #ffd700;
  border: none;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ff8c00;
    transform: translateX(5px);
  }
`;

const LoadingMessage = styled.p`
  color: #ffd700;
  font-size: 1.5rem;
  animation: ${fadeIn} 0.5s ease-in, ${pulse} 1.5s infinite ease-in-out;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 1.5rem;
  animation: ${fadeIn} 0.5s ease-in, ${slideIn} 0.5s ease-out;
`;

const CinematicElement = styled.div`
  position: absolute;
  opacity: 0.2;
  animation: ${float} 6s infinite ease-in-out;
  color: #ffd700;
`;

const LeftCinematicElement = styled(CinematicElement)`
  left: 5%;
  top: 30%;
`;

const RightCinematicElement = styled(CinematicElement)`
  right: 5%;
  top: 60%;
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
      <GlobalStyle />
      <AppHeader />
      <Container>
        <LeftCinematicElement>
          <Film size={100} />
        </LeftCinematicElement>
        <RightCinematicElement>
          <Star size={100} />
        </RightCinematicElement>
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
