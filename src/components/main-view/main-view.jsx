import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { useGlobalContext } from "../../context/GlobalContext";
import { fetchMovies } from "../../requests/movie.request";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss"

export const MainView = () => {
  const {
    user,
    setUser,
    token,
    setToken,
    movies,
    setMovies,
  } = useGlobalContext();
  
  const [searchInput, setSearchInput] = useState("");
  const { movieId } = useParams();

  useEffect(() => {
    if (!token) {
      console.log("No token");
      return;
    }
  
    const fetchData = async () => {
      const fetchedMovies = await fetchMovies(token);
      if (fetchedMovies != null) {
        setMovies(fetchedMovies);
      }
    };
  
    fetchData();
  }, [token, setMovies, setUser]);
  
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
      <Row className="justify-content-md-center main-view">
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
                    <MovieView/>
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
                    <ProfileView/>
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
                      <Col id="movie-card"
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
                        <MovieCard movie={movie} 
                        />
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