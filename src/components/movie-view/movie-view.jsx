import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import "./movie-view.scss";

export const MovieView = () => {
  const {
    user,
    setUser,
    movies,
    setMovies
  } = useGlobalContext()

  const { movieId } = useParams();

  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const movie = movies.find((m) => m.id === movieId);

  const [addFavDisabled, setAddFavDisabled] = useState(false);
  const [removeFavDisabled, setRemoveFavDisabled] = useState(true);

  // Set inital state of buttons based on whether a movie is favorited
  const movieAdded = () => {
    const movieFavorited = user.FavoriteMovies.some((m) => m === movieId)
    if (movieFavorited) {
      setAddFavDisabled(true)
    }
  };

  const movieRemoved = () => {
    const movieFavorited = user.FavoriteMovies.some((m) => m === movieId)
    if (movieFavorited) {
      setRemoveFavDisabled(false)
    }
  }

  // Function for adding a Favorite Movie
  const addFavoriteMovie = async() => {
    const favoriteMovie = await fetch(`https://movie-api-8cvs.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json", 
        }
      })

      const response = await favoriteMovie.json()
      if (response) {
        setUser(response)
          setAddFavDisabled(true)
          setRemoveFavDisabled(false)
      }
    }

  // Function for removing a favorite movie
  const removeFavoriteMovie = async() => {
    const favoriteMovie = await fetch (`https://movie-api-8cvs.onrender.com/users/${user.Username}/movies/${movieId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    })     
    const response = await favoriteMovie.json()
    if (response) {
      setUser(response)
      setRemoveFavDisabled(true)
      setAddFavDisabled(false)
    };
  }

  useEffect (()=> {
    movieAdded()
    movieRemoved()
  },[])

    return (
      <Row className="movie-view">
      <Col md={6} className="movie-poster"  >
        <img 
        className="movie-img" 
        // crossOrigin="anonymous"
        src={movie.image} />
      </Col>
      <Col md={6}>
        <div className="movie-title">
          <span className="value"><h2>{movie.title}</h2></span>
        </div>
        <div className="movie-description">
          <span className="label"><h5>Description: </h5></span>
          <span className="value">{movie.description}<br></br><br></br></span>
        </div>
        <div className="movie-description">
          <span className="label"><h5>Genre: {movie.genre.Name}</h5></span>
          <span className="value">{movie.genre.Description}<br></br><br></br></span>
        </div>
        <div className="movie-description">
          <span className="label"><h5>Director: {movie.director.Name}</h5></span>
          <span className="value">Bio: {movie.director.Bio}<br></br>Birth: {movie.director.Birth}<br></br></span>
        </div>
        <Link to={`/`}>
          <Button className="back-button button-primary mt-2">Back</Button>
        </Link>
        <br />
        <Button 
          className="add-button mt-2"
          onClick={addFavoriteMovie}
          disabled={addFavDisabled}
        >
          + Add to Favorites
        </Button>
        <br/>
        <Button className="mt-2"
          variant="danger"
          onClick={removeFavoriteMovie}
          disabled={removeFavDisabled}
        >
          Remove from Favorites
        </Button> 
      </Col>
    </Row>
    );
  };
