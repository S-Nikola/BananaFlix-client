import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Container, Form, Row, Col, } from "react-bootstrap";


export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    // const storedFavorites = JSON.parse(localStorage.getItem("user")).FavoriteMovies
    const storedUser = localStorage.getItem("user");
    const {Username, Birthday, Email, FavoriteMovies} = user;
    const [token] = useState(storedToken ? storedToken : null);
    const [allMovies] = useState(storedMovies ? storedMovies: movies);
    const [userFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: FavoriteMovies);
    // const [user, setUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [filteredMovies, setFilteredMovies] = useState([]);


// Filter favorite movies for later display
    useEffect (() => {
      const newList = allMovies.filter((movie)=> {
          const hasMovieId = userFavoriteMovies.some((m)=> movie.id === m);
          if (hasMovieId) {
              return movie
          }
      })
      setFilteredMovies (newList)
  },[])

  // console.log("movies", movies)

    // console.log("movies", movies)

  const updateUser = (user) => {
        fetch(`https://movie-api-8cvs.onrender.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          });
    };
    
  const handleSubmit = (event) => {
    event.preventDefault();  

    const data = {
      Username: username,
      Password: password,
      Email: email,
    };

    fetch(`https://movie-api-8cvs.onrender.com/users/${username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"},
    })
    .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      if (response.ok) {
        alert("Changes saved");
        updateUser(user);
      } else {
        alert("Something went wrong");
      }
    });
  };

  // const handleDeregister = () => {

  //   fetch(`https://movie-api-8cvs.onrender.com/users/${username}` {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json"
  //     }
  //   }).then((response) => {
  //     if (response.ok) {
  //       alert("Account successfully deleted");
  //     } else {
  //       alert("Something went wrong");
  //     }
  //   });
  // };
    
  return (
    <Container>
        <Row>
          <Col>
          <div>
            <p>Username: {Username}</p>
            <p>Birthday: {Birthday}</p>
            <p>Email: {Email}</p>
            <p>Favorite movies:</p>
            {/* Display favorite movies */}
            {FavoriteMovies.length === 0 ?
              <span>No movies selected</span> : filteredMovies.map ((movie) => (
              <Col className="mb-4" key={movie.id} md={8}>
                <MovieCard movie={movie} />
              </Col>
              ))
            }
          </div>
          </Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <h2>Update info</h2>
              <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                type="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control 
                type="text" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                />
              </Form.Group>
              <Button type="submit" className="button-primary">Save Changes</Button>
            </Form>
            {/* <Button onClick={() => handleDeregister(user._id)} className="button-delete" type="submit" variant="danger" >Delete Account</Button> */}
          </Col>
        </Row>
    </Container>
  )
};



    