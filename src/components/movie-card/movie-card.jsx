import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useParams } from "react-router";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  const { movieId } = useParams();

  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [addFavDisabled, setAddFavDisabled] = useState(false);
  const [removeFavDisabled, setRemoveFavDisabled] = useState(true)
 

  const {
    user,
    setUser,
    movies,
    setMovies
  } = useGlobalContext()

  // Set inital state of buttons based on whether a movie is favorited
  const movieAdded = () => {
    const movieFavorited = user.FavoriteMovies.some((m) => m === movie.id)
    if (movieFavorited) {
      setAddFavDisabled(true)
    }
  };

  const movieRemoved = () => {
    const movieFavorited = user.FavoriteMovies.some((m) => m === movie.id)
    if (movieFavorited) {
      setRemoveFavDisabled(false)
    }
  }

  // Function for adding a Favorite Movie
  const addFavoriteMovie = async() => {
    const favoriteMovie = await fetch(`https://movie-api-8cvs.onrender.com/users/${user.Username}/movies/${movie.id}`,
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
    const favoriteMovie = await fetch (`https://movie-api-8cvs.onrender.com/users/${user.Username}/movies/${movie.id}`,
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
      <Card className= "h-100 hidden-card" id="card">
      <Card.Img variant="top" src={movie.image} id="movie-poster"/>
      <Card.Body id="card-body">
        <Card.Title className="title">{movie.title}</Card.Title>
        <div id="card-buttons">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="open-button" bg="secondary">See Details</Button>
          </Link>
          <Button 
            className="fav-button"
            variant="info"
            onClick={addFavoriteMovie}
            disabled={addFavDisabled}
          >
            +
          </Button>
          <Button 
            className="fav-button"
            variant="danger"
            onClick={removeFavoriteMovie}
            disabled={removeFavDisabled}
          >
            -
          </Button>
        </div>
      </Card.Body>
    </Card>

    );
  };
  
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      // director: PropTypes.string
    }).isRequired
  };