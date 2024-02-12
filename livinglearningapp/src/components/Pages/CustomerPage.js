import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import About from "./About/AboutPage";

function CustomerPage() {
  const handleLogout = () => {
    console.log("Logout action");
    // Implement your logout logic here
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Living and Learning</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/about-us">
                ABOUT US
              </Nav.Link>
              <Nav.Link href="#games">GAMES</Nav.Link>
              <Nav.Link as={Link} to="/chatroom">
                CHAT
              </Nav.Link>

              <Nav.Link as={Link} to="/resources">
                RESOURCES
              </Nav.Link>

              <Nav.Link href="#events">EVENTS</Nav.Link>
              {/* ... other links ... */}
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Your page content goes here */}
    </div>
  );
}

export default CustomerPage;
