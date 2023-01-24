import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import "./movie-view.scss";
import { useState } from "react";

export const MovieView = ({ movies, username, favoriteMovies }) => {
  const { movieId } = useParams();
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const movie = movies.find((m) => m.id === movieId);
  
  const [userFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: favoriteMovies);

console.log(username)

useState()
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
      movieAdded();

    const response = await favoriteMovie.json()
     console.log(response)
     if (response.ok) {
      localStorage.removeItem("user")
      localStorage.setItem("user", JSON.stringify (response))
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
    if (response.ok) {
     localStorage.removeItem("user")
     localStorage.setItem("user", JSON.stringify (response))
   } 
  };

    const movieAdded = () => {
      const movieExists = userFavoriteMovies.some((m) => m === movieId)
      console.log("movieExists", movieExists)
      console.log("userFavMov", userFavoriteMovies)
      console.log("movieId", movieId)
      return movieExists
      // if (movieExists) {
      //   console.log("majka ti")
      //   return true
      // } else {
      //   return false
      // }
    };
  

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
          disabled={movieAdded()}
        >
          + Add to Favorites
        </Button>
        <br/>
        <br/>
        <Button 
          variant="danger"
          onClick={removeFavoriteMovie}
        >
          Remove from Favorites
        </Button> 
      </Col>
    </Row>
    );
  };
