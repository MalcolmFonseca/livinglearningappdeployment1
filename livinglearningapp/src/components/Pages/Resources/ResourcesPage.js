import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './Resources.css'
function Resources() {
    return (
      
      <div>
        <div className="Navbar">
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
              <Navbar.Brand href="/customer-home" >
                {/* You can place a logo here using an img tag if you have one */}
                Living and Learning
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/about-us">ABOUT US</Nav.Link>
                  <Nav.Link href="#games">GAMES</Nav.Link>
                  <Nav.Link href="#chat">CHAT</Nav.Link>
                  <Nav.Link href="#resources">RESOUCES</Nav.Link>
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
        <div>
        </div>
        <div>
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="stylesheet" href="styles.css" />
            <title>Cheer Connections Resources</title>
          </head>
          <body>
            <header>
              <h1>Cheer Connections Resources</h1>
            </header>
            <main>
              <section className="organization">
                <h2>Ontario Caregivers Association</h2>
                <p>
                  Ontario Caregivers Association advocates for the rights and support of caregivers in Ontario, providing resources and fostering a supportive community.
                </p>
                <p>
                  Website:{' '}
                  <a href="https://ontariocaregivers.ca/">
                    Ontario Caregivers Association
                  </a>
                </p>
                <p>
                  Contact:{' '}
                  <a href="https://ontariocaregivers.ca/contact/">
                    Contact Information
                  </a>
                </p>
                
              </section>
              <section className="organization">
                <h2>Community Living Ontario</h2>
                <p>
                  Community Living Ontario works towards the full inclusion and empowerment of people with intellectual disabilities and their families across the province.
                </p>
                <p>
                  Website:{' '}
                  <a href="https://communitylivingontario.ca/">
                    Community Living Ontario
                  </a>
                </p>
                <p>
                  Contact:{' '}
                  <a href="https://communitylivingontario.ca/contact/">
                    Contact Information
                  </a>
                </p>
               
              </section>
              <section className="organization">
                <h2>Inclusion Canada</h2>
                <p>
                    Inclusion Canada is dedicated to advocating for the rights and inclusion of Canadians with intellectual disabilities and their families on a national level.
                </p>
                <p>
                  Website:{' '}
                  <a href="https://inclusioncanada.ca/">
                    Inclusion Canada
                  </a>
                </p>
                <p>
                  Contact:{' '}
                  <a href="https://inclusioncanada.ca/contact/">
                    Contact Information
                  </a>
                </p>
                
              </section>
            </main>
            <footer>
              <p>&copy; 2024 Cheer Connections</p>
            </footer>
          </body>
        </html>
      </div>
      </div>
    );
  }
  

export default Resources