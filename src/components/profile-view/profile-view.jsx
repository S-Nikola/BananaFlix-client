import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";

export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");
    const {Username, Birthday, Email, FavoriteMovies} = user;
    const [token] = useState(storedToken ? storedToken : null);
    const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: FavoriteMovies);
    // const [updatedUser, setUpdatedUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");

    const [allMovies] = useState(storedMovies ? storedMovies: movies);
    const [filteredMovies, setFilteredMovies] = useState([]);

// Show updated user on the profile
const getUser = (token) => {
  fetch(`https://movie-api-8cvs.onrender.com/users/${Username}`,{
    method: "GET",
    headers: { Authorization: `Bearer ${token}`},
  }).then(response => response.json())
  .then((response) => {
    console.log(response)
    setUsername(response.Username);
    setEmail(response.Email);
    setPassword(response.Password);
    setBirthday(response.Birthday);
    setUserFavoriteMovies(response.FavoriteMovies)
  })
}

useEffect(()=> {
  getUser(token);
},[])

// Filter favorite movies for later display
    useEffect (() => {
      const newList = allMovies.filter((movie)=> {
          const hasMovieId = user.FavoriteMovies.some((m)=> movie.id === m);
          if (hasMovieId) {
              return movie
          }
      })
      setFilteredMovies (newList)
  },[])
    
  const handleSubmit = async(event) => {
    event.preventDefault();  

//     const data = {
//       Username: username,
//       Password: password,
//       Email: email,
//       Birthday: birthday
//     };
// console.log(data)
//     const updateUser = await fetch(`https://movie-api-8cvs.onrender.com/users/${user.Username}`, {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"},
//     })

//     const response = await updateUser.json()
//     console.log(response)
//     // .then((response) => response.json())
//     //   .then((data) => {
//     //     console.log(data)
//     //     // setUpdatedUser(data.user);
//     //     // localStorage.setItem("user", JSON.stringify(data.user));
//     //   if (data.ok) {
//     //     console.log(response)
//     //     alert("Changes saved");
//     //     // updateUser(user);
//     //   } else {
//     //     alert("Something went wrong");
//     //   }
//     // });
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
      <Row className= "mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h4>User Details</h4>
                <p>Username: {Username}</p>
                <p>Birthday: {Birthday}</p>
                <p>Email: {Email}</p>
              </div> 
            </Card.Body>
          </Card>
        </Col>
        <Col >
          <Card>
            <Card.Body>
              <h4>Update Profile Information</h4>
            <Form onSubmit={(e) => handleSubmit(e)}>
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
              <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control 
                type="date" 
                value={birthday} 
                onChange={e => setBirthday(e.target.value)} 
                />
              </Form.Group>
              <Button type="submit" className="button-primary mt-3">Save Changes</Button>
            </Form>
            {/* <Button onClick={() => handleDeregister(user._id)} className="button-delete" type="submit" variant="danger" >Delete Account</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h4>Favorite movies:</h4>
          <>
             {/* Display favorite movies */}
             {FavoriteMovies.length === 0 ?
              <span>No movies selected</span> : filteredMovies.map ((movie) => (
              <Col className="mb-4" key={movie.id} xs={12} md={6} lg={3}>
                <MovieCard movie={movie} />
              </Col>
              ))
            }
          </>
        </Row>
    </Container>
  )
};



    