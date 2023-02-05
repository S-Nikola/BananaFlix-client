import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {

    return (
      <Card className= "h-100 hidden-card" id="card">
      <Card.Img variant="top" src={movie.image} id="movie-poster"/>
      <Card.Body id="card-body">
        <Card.Title className="title">{movie.title}</Card.Title>
        <Link  to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button className="open-button" >Open</Button>
        </Link>
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