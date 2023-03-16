import React, { useContext, useState, createContext } from "react";

// create context

const globalContext = createContext();

// create context hook
export const useGlobalContext = () => useContext(globalContext);

// create provider
export const GlobalProvider = ({ children }) => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovie, setFavoriteMovie] = useState([]);

  const fetchMovies = () => {
      if (!token) {
        console.log("No token");
        return;
      }
  
      fetch("https://movie-api-8cvs.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => ({
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImageURL,
            genre: movie.Genre,
            director: movie.Director,
          }));
          setMovies(moviesFromApi);
          //localStorage.setItem("movies", JSON.stringify(moviesFromApi))
        });
    };

  return (
      <globalContext.Provider value={
          {
              user,
              setUser,
              token,
              setToken,
              movies,
              setMovies,
              fetchMovies,
              favoriteMovie,
              setFavoriteMovie
          }
      }>
      {children}
      </globalContext.Provider>
  );
  };