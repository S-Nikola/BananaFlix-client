import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Form, Row, Col, } from "react-bootstrap";


export const ProfileView = () => {

    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);

    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
  return (
<p>This is a user profile</p>
  )
};

 



    