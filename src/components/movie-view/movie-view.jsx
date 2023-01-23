import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, username, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
console.log(username)

// AddFavMovie
const addFavoriteMovie = async() => {
  const favoriteMovie = await fetch(`https://movie-api-8cvs.onrender.com/users/${username}/movies/${movieId}`,
    {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", 
      }
     })

    const response = await favoriteMovie.json()
     console.log(response)
     if (response.ok) {
      localStorage.removeItem("user")
      localStorage.setItem("user", JSON.stringify (response))
    } 
  }

  const removeFavorite = async() => {
    const removeFavorite = await fetch (`https://movie-api-8cvs.onrender.com/users/${username}/movies/${movieId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })     
    const response = await removeFavorite.json()
    console.log(response)
    if (response.ok) {
     localStorage.removeItem("user")
     localStorage.setItem("user", JSON.stringify (response))
   } 
  };

    // const movieAdded = () => {
    //   if (favoriteMovie.find((m) => m.id === movieId)) {
    //     return Boolean
    //   } else {
    //     return Boolean
    //   }
    // };
  

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
          // disabled={movieAdded}
        >
          + Add to Favorites
        </Button>
        <br/>
        <br/>
        <Button 
          variant="danger"
          onClick={removeFavorite}
        >
          Remove from Favorites
        </Button> 
      </Col>
    </Row>
    );
  };
