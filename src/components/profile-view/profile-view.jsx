import { useState, useEffect } from "react";
import { UpdateForm } from "./update-form";
import { FavMovies } from "./fav-movies";
import { Container, Row, Col, Card } from "react-bootstrap";

export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");


    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

// Show updated user on the profile
const getUser = (token) => {
  fetch(`https://movie-api-8cvs.onrender.com/profiles/${user.Username}`,{
    method: "GET",
    headers: { Authorization: `Bearer ${token}`},
  }).then(response => response.json())
  .then((response) => {
    setUsername(response.Username);
    setEmail(response.Email);
    setPassword(response.Password);
    setBirthday(response.Birthday);
    setFavoriteMovies(response.FavoriteMovies)
  })
}

useEffect(()=> {
  getUser(token);
},[])

  return (
    <Container>
      <Row className= "mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h4>User Details</h4>
                <p>Username: {username}</p>
                <p>Birthday: {birthday}</p>
                <p>Email: {email}</p>
              </div> 
            </Card.Body>
          </Card>
        </Col>
        <Col >
        <Card>
          <Card.Body>
            <UpdateForm user={user}/>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row>
        <FavMovies user={user} movies={movies}/>
        </Row>
    </Container>
  )
};



    