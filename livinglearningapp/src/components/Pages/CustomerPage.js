import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import About from './About/AboutPage';
import Resources from './Resources/ResourcesPage';
// Import other pages/components as needed

function CustomerPage() {
    const [activeTab, setActiveTab] = useState('home');
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State for managing logout modal visibility

    // Placeholder logout function
    const handleLogout = async () => {
        try {
            console.log('Attempting to log out...'); // Log attempt to logout
    
            // Call the logout endpoint
            const response = await fetch('http://localhost:3001/logout', {
                method: 'POST',
                credentials: 'include', // Needed to include cookies (such as session cookies)
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            // Attempt to read the response body regardless of the response status
            const responseBody = await response.text(); 
            console.log('Logout response body:', responseBody); // Log the raw response body for debugging
    
            if (response.ok) {
                console.log('Logout successful');
    
                // Clear any client-side storage here if used
                // localStorage.removeItem('userToken'); // Example, adjust according to your app's needs
    
                // Redirect to landing page or login page
                localStorage.removeItem('userToken');
                window.location.href = '/'; 
            } else {
                // Handle unsuccessful logout attempt
                console.error('Logout failed with status:', response.status);
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            // If an error occurs, log the error and any additional info if available
            console.error('Logout error:', error);
            if (error.response) {
                console.error('Error response status:', error.response.status);
                console.error('Error response body:', error.response.statusText);
            }
            alert('An error occurred. Please try again.');
        }
    };
    
    
    // Function to render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'about':
                return <About />;
            case 'resources':
                return <Resources />;
            // Add cases for other tabs as necessary
            default:
                return <div>Welcome to the homepage! Select a tab to view more.</div>;
        }
    };

    return (
        <div className="App">
<<<<<<< HEAD
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">Living and Learning</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => setActiveTab('about')}>ABOUT US</Nav.Link>
                            <Nav.Link onClick={() => setActiveTab('resources')}>RESOURCES</Nav.Link>
                            {/* Implement onClick for other tabs similarly */}
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => setShowLogoutModal(true)}>LOGOUT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
=======
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
              <Navbar.Brand href="#home" >
                
                Living and Learning
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as = {Link} to = "/about-us">ABOUT US</Nav.Link>
                  <Nav.Link as = {Link} to = "/chatbot">CHATBOT</Nav.Link>
                  <Nav.Link href="#chat">CHAT</Nav.Link>
>>>>>>> Chatbot

            <Container className="mt-3">
                {renderContent()}
            </Container>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleLogout();
                        setShowLogoutModal(false);
                    }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CustomerPage;
