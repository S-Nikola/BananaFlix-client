import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLoginUserRequest } from "../../requests/user.request";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Convert the handleSubmit function to an async function
  const handleSubmit = async (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };

    try {
      // Call the loginUser function and wait for it to resolve
      const loginResponse = await useLoginUserRequest(data);

      // Log the response to the console
      console.log("Login response: ", loginResponse);

      if (loginResponse.user) {
        // If a user object is returned, set the user and token in local storage and call onLoggedIn
        localStorage.setItem("user", JSON.stringify(loginResponse.user));
        localStorage.setItem("token", loginResponse.token);
        onLoggedIn(loginResponse.user, loginResponse.token);
      } else {
        // If no user object is returned, show an alert
        alert("No such user");
      }
    } catch (error) {
      // If an error occurs, show an alert
      alert("Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="LoginformUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
        />
      </Form.Group>

      <Form.Group controlId="LoginformPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="mt-3" variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  );
};
