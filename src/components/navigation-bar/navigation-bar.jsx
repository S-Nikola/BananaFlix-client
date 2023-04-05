import { Navbar, Container, Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./navigation-bar.scss"

export const NavigationBar = ({ user, onLoggedOut, handleSearchInput }) => {
  return (
    <Navbar id="navbar" bg="primary" mb="2" expand="lg">
      <Container>
        <Navbar.Brand className="text-white" as={Link} to="/">
          BananaFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="hamburger"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link className="text-white" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link className="text-white" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link className="text-white" as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link className="text-white" onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
           {/* If a user is logged in then display search bar */}
           {user && (
            <Form inline className="d-flex">
              {/*Input field for searching */}
              <Form.Control
                id="search-bar"
                type="text"
                placeholder="Search by title"
                className="mr-sm-2 orange-border"
                onChange={handleSearchInput}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
