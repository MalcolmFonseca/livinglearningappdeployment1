import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button,Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
 
  const [homeStreet, setHomeStreet] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [homeState, setHomeState] = useState('');
  const [homeCountry, setHomeCountry] = useState('');
  const [homePostalCode, setHomePostalCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');




  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const userData = {
      username,
      email,
      phone,
      birthDate,
      password,
      homeStreet,
      homeCity,
      homeState,
      homeCountry,
      homePostalCode
    };
  
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const data = await response.json();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Handle success (e.g., show success message, redirect to login page, etc.)
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to register. Please try again.');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Handle errors (e.g., show error message)
      }
    } catch (error) {
      setErrorMessage(error.message || 'Network error. Please try again.'); 
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }
  };
  
   return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Living and Learning</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* ... your nav links ... */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2>Sign Up</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} 
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Form.Group>

          {/* Home Address Fields */}
          <Form.Group className="mb-3" controlId="formBasicStreet">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street"
              value={homeStreet}
              onChange={(e) => setHomeStreet(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              value={homeState}
              onChange={(e) => setHomeState(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={homeCountry}
              onChange={(e) => setHomeCountry(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPostalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={homePostalCode}
              onChange={(e) => setHomePostalCode(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserLogin;