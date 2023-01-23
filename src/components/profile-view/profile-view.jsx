// import { useState, useEffect } from "react";
// import { MovieCard } from "../movie-card/movie-card";
// import { Button, Form, Row, Col, } from "react-bootstrap";


// export const ProfileView = ({user, moviesList}) => {
//     console.log(user)
//     const {Username, Brithday, Email, FavoriteMovies} = user;
//     const [filteredMovies, setFilteredMovies] = useState([]);
//     // console.log(moviesList)

//     useEffect (() => {
//         const newList = moviesList.filter((movie)=> {
//             const hasMovieId = FavoriteMovies.some((m)=> movie.id === m);
//             if (hasMovieId) {
//                 return movie
//             }
//         })
//         setFilteredMovies (newList)
//     },[])

  // return (
  //   <div>
  //       <p>{Username}</p>
  //       {FavoriteMovies.length === 0 ?
  //       <span>No movies selected</span> : filteredMovies.map ((movie) => (
  //           <Col className="mb-4" key={movie.id} md={3}><MovieCard movie={movie} /></Col>
  //           ))
  //       }
  //   </div>
  // )

// };
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Container, Form, Row, Col, } from "react-bootstrap";


export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);

    const {Username, Birthday, Email, FavoriteMovies} = user;
    const storedUser = localStorage.getItem("user");
    // const [user, setUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [filteredMovies, setFilteredMovies] = useState([]);


// Filter favorite movies for later display
    useEffect (() => {
      const newList = movies.filter((movie)=> {
          const hasMovieId = FavoriteMovies.some((m)=> movie.id === m);
          if (hasMovieId) {
              return movie
          }
      })
      setFilteredMovies (newList)
  },[])

  console.log(user)


    
  return (
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
            <Form>
            {/* <Form onSubmit={handleSubmit}> */}
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
  )
};



    