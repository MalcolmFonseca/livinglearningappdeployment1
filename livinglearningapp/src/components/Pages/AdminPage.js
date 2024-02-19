import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function AdminPage() {


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
                  <Nav.Link href="#manage">MANAGE EMPLOYEES</Nav.Link>
                  <Nav.Link as = {Link} to = "/calendar/*">ADD EVENTS</Nav.Link>
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

export default AdminPage;