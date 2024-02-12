import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Chatroom() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/customer-home">Living and Learning</Navbar.Brand>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <form onSubmit={sendMessage}>
        <input></input>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default Chatroom;
