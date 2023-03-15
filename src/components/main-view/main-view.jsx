import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { useGlobalContext } from "../../context/GlobalContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss"

export const MainView = () => {
  const {
    user,
    setUser,
    token,
    setToken
  } = useGlobalContext();
  
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
 
  useEffect(() => {
    if (!token) {
    console.log("No token")
    return;
    }

    fetch("https://movie-api-8cvs.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map(movie => {
          const obj = { id: movie._id, title: movie.Title, description: movie.Description, image: movie.ImageURL, genre: movie.Genre, director: movie.Director}
          return obj;
        });
        setMovies(moviesFromApi);
        //localStorage.setItem("movies", JSON.stringify(moviesFromApi))
      });
      console.log("bilo sho")
  }, [token]);

// Handle changes in the search input field
   const handleSearchInput = (e) => {
     setSearchInput(e.target.value);
   };


  return (
    <>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          setSearchInput("");
          localStorage.clear();
        }}
        handleSearchInput={(e) => setSearchInput(e.target.value)}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <Col md={5}>
                <LoginView onLoggedIn={(user) => setUser(user)} />
              </Col>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                      movies={movies} 
                      username={user.Username} 
                      favoriteMovies={user.FavoriteMovies}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col 
                      className={`${
                        movie.title
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()) 
                          ? ""
                          : "hidden-card"
                        } mb-4`}
                        key={movie.id} 
                        md={3}
                      >
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </>
  );
};