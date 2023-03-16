import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleFavoriteMovie } from "../../requests/handle-favorite";
import { useGlobalContext } from "../../context/GlobalContext";
import { useParams } from "react-router";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  const { movieId } = useParams();
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const {
    favoriteMovie,
    setFavoriteMovie,
  } = useGlobalContext()

    return (
      <Card className= "h-100 hidden-card" id="card">
      <Card.Img variant="top" src={movie.image} id="movie-poster"/>
      <Card.Body id="card-body">
        <Card.Title className="title">{movie.title}</Card.Title>
        <div className="card-buttons">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button className="open-button" >Open</Button>
          </Link>
          <Button 
            className="fav-button"
            
            onClick={handleFavoriteMovie}
            // disabled={movieExists}
          >
            +
          </Button>
          {/* <Button className="mt-2"
            variant="danger"
            // onClick={removeFavoriteMovie}
            // disabled={disableRemove}
          >
            Remove from Favorites
          </Button> */}
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