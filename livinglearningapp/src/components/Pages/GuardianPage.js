import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';



function GuardianPage() {


    const handleLogout = () => {
        console.log('Logout action');
        // Implement your logout logic here
      };
    
      return (
        <div className="App">
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
              <Navbar.Brand href="#home">
                {/* You can place a logo here using an img tag if you have one */}
                Living and Learning
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#calendar">Calendar</Nav.Link>
                  <Nav.Link href="#bookings">Bookings</Nav.Link>
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

export default GuardianPage;