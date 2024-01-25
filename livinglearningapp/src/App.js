import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';

function App() {
  // Handler for logout
  const handleLogout = () => {
    console.log('Logout action');
    // Implement your logout logic here
  };

  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            {/* You can place a logo here using an img tag if you have one */}
            MyApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link1">Link 1</Nav.Link>
              <Nav.Link href="#link2">Link 2</Nav.Link>
              {/* ... other links ... */}
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Your page content goes here */}
    </div>
  );
}

export default App;
