import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    const loginData = {
      username,
      password,
    };
  
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies with the request
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const { message, userType } = await response.json();
        
        
        localStorage.setItem('userType', userType); // Store the user's type for later use
  
        // Redirect or perform actions based on userType
        // For SPAs, use your routing library's navigation method instead of window.location.href for a smoother experience
        switch(userType) {
          case 'admin':
            // Redirect to admin dashboard
            window.location.href = '/admin-home';
            break;
          case 'guardian':
            // Redirect to guardian dashboard
            window.location.href = '/guardian-home';
            break;
          case 'user':
            // Redirect to customer dashboard
            window.location.href = '/customer-home';
            break;
          case 'employee':
            // Redirect to employee-specific page
            window.location.href = '/employee-home';
            break;
          default:
            // Handle unknown user type or show an error message
            console.log(message); // Or handle other UI feedback
            break;
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to login. Please try again.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <h2>Login</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UserLogin;
