import React from 'react';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
  let navigate = useNavigate();

  const handleLogin = (userRole) => {
    if (userRole === 'admin') {
      navigate('/admin-home');
    } else if (userRole === 'guardian'){
      navigate('/guardian-home');
    }
    else if(userRole === 'employee'){
      navigate('/employee-home');
    }
    else{
      navigate('/customer-home');
    }
  };

  const handleSignup = () => {
    navigate('/signUp');
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Add any additional links you might want here */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5 text-center">
        <h1>Welcome to MyApp</h1>
        <Row className="mt-4">
          <Col>
            <Button variant="primary" onClick={() => handleLogin('user')}>User Login</Button>
          </Col>
          <Col>
            <Button variant="secondary" onClick={() => handleLogin('admin')}>Admin Login</Button>
          </Col>
          <Col>
            <Button variant="success" onClick={() => handleLogin('guardian')}>Guardian Login</Button>
          </Col>
          <Col>
            <Button variant="warning" onClick={() => handleLogin('employee')}>Employee Login</Button>
          </Col>
          <Col>
            <Button variant="info" onClick={() => handleSignup()}>Sign-Up</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
