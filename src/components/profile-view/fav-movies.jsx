import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useGlobalContext } from "../../context/GlobalContext";

export const FavMovies = () => {
  const {
    user,
    setUser,
    movies,
    setMovies
  } = useGlobalContext()

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    // const storedUser = localStorage.getItem("user");

    const [token] = useState(storedToken ? storedToken : null);
    // const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [allMovies] = useState(storedMovies ? storedMovies: movies);

    // Show updated user on the profile
const getUser = (token) => {
    fetch(`https://movie-api-8cvs.onrender.com/profiles/${user.Username}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    }).then(response => response.json())
    // .then((response) => {
    //   setFavoriteMovies(response.FavoriteMovies)
    // })
  }


//Filter favorite movies for later display
const favMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie.id));

useEffect (() => {
    const newList = allMovies.filter((movie)=> {
        const hasMovieId = user.FavoriteMovies.some((m)=> movie.id === m);
        if (hasMovieId) {
            return movie
        }
    })
    // setFavoriteMovies (newList)
    getUser(token);
  }, [])


  return (
    <>
    <h4>Favorite movies:</h4>
    {/* Display favorite movies */}
    {favMovies.length === 0 ?
     <span>No movies selected</span> : favMovies.map ((movie) => (
     <Col className="mb-4" key={movie.id} xs={12} md={6} lg={3}>
       <MovieCard movie={movie} />
     </Col>
     ))
   }
 </>
  )
}