import React from "react";
import { Navbar, Nav, Container,NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './About.css'

function About(){
  let navigate = useNavigate()
    return(
    <div className="Parent">
        <div className="Navbar">
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
              <Navbar.Brand href="/customer-home" >
                
                Living and Learning
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#games">GAMES</Nav.Link>
                  <Nav.Link href="#chat">CHAT</Nav.Link>
                  <Nav.Link href="#resources">RESOURCES</Nav.Link>
                  <Nav.Link href="#events">EVENTS</Nav.Link>
                  {/* ... other links ... */}
                </Nav>
                <Nav>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    
          {/* Your page content goes here */}
        </div>
        <div className="about">
            <div className="text">
                <h>About Us</h>
                <p>
                    Ongoing Living and learning is a OLLI, a registered not-for-profit caregiver-driven company dedicated to fostering a community of
                    inclusion and forming a circle of friendship that enriches the lives of our loved ones with intellectual disabilities, while also 
                    providing support for the entire family.
                    Our commitment revolves around four key areas of focus: Cheer Group, Cheer Works, Cheer Connections, and Cheer Living.
                </p>
            </div>
            <div className="logo"><img src={logo}/></div>
        </div>
    </div>
    )
}
export default About