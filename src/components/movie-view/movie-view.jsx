import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import "./movie-view.scss";
import { useState } from "react";
import { useEffect } from "react";

export const MovieView = ({ movies, username, favoriteMovies }) => {
  const { movieId } = useParams();
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const movie = movies.find((m) => m.id === movieId);

  const [movieExists, setMovieExists] = useState(false);
  const [disableRemove, setDisableRemove] = useState(true)
  const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: favoriteMovies);

  // const movieRemoved = movieExists.false

console.log(username)

// AddFavMovie
const addFavoriteMovie = async() => {
  const favoriteMovie = await fetch(`https://movie-api-8cvs.onrender.com/users/${username}/movies/${movieId}`,
    {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${storedToken}`,
      "Content-Type": "application/json", 
      }
     })

      console.log(storedToken)

    const response = await favoriteMovie.json()
    setUserFavoriteMovies(response.FavoriteMovies)
     if (response) {
        alert("Movie added to favorites");
        localStorage.setItem("user", JSON.stringify (response))
        window.location.reload(); 
      } else {
        alert("Something went wrong");
      }    
  }

  const removeFavoriteMovie = async() => {
    const favoriteMovie = await fetch (`https://movie-api-8cvs.onrender.com/users/${username}/movies/${movieId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    })     
    const response = await favoriteMovie.json()
    console.log(response)
    if (response) {
      alert("Movie removed from favorites");
      localStorage.setItem("user", JSON.stringify (response))
      window.location.reload(); 
    } else {
      alert("Something went wrong");
    }
  };

    const movieAdded = () => {
      const hasMovie = userFavoriteMovies.some((m) => m === movieId)
      console.log("userFavMov", userFavoriteMovies)
      console.log("movieId", movieId)
      if (hasMovie) {
        setMovieExists(true)
      }
    };

    const movieRemoved = () => {
      const hasMovie = userFavoriteMovies.some((m) => m === movieId)
      if (hasMovie) {
        setDisableRemove(false)
      }
    };

console.log("movieExists", movieExists)

  useEffect (()=> {
    movieAdded()
    movieRemoved()
  },[])

    return (
      <Row className="movie-view">
      <Col md={6} className="movie-poster"  >
        <img className="movie-img" crossOrigin="anonymous" src={movie.image} />
      </Col>
      <Col md={6}>
        <div className="movie-title">
          <span className="value"><h2>{movie.title}</h2></span>
        </div>
        <div className="movie-description">
          <span className="label"><h5>Description: </h5></span>
          <span className="value">{movie.description}<br></br><br></br></span>
        </div>
        <Link to={`/`}>
          <Button className="back-button button-primary">Back</Button>
        </Link>
        <br />
        <br />
        <Button 
          className="button-add-favorite"
          onClick={addFavoriteMovie}
          disabled={movieExists}
        >
          + Add to Favorites
        </Button>
        <br/>
        <br/>
        <Button 
          variant="danger"
          onClick={removeFavoriteMovie}
          disabled={disableRemove}
        >
          Remove from Favorites
        </Button> 
      </Col>
    </Row>
    );
  };
