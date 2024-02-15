import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import About from './About/AboutPage';
import Resources from './Resources/ResourcesPage';

function CustomerPage() {
    const [activeTab, setActiveTab] = useState('home');

    const handleLogout = () => {
        console.log('Logout action');
        // Implement your logout logic here
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'about':
                return <About />;
            case 'resources':
                return <Resources />;
            // case 'home':
            // return <Home />; // Assuming you have a Home component
            default:
                return <div>Welcome to the homepage! Select a tab to view more.</div>;
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
                            <Nav.Link onClick={() => setActiveTab('about')}>ABOUT US</Nav.Link>
                            <Nav.Link onClick={() => setActiveTab('resources')}>RESOURCES</Nav.Link>
                            <Nav.Link href="#games">Games</Nav.Link>{/*change the next 3 once implemented to the style of the above two*/}
                            <Nav.Link href="#chat">Chat</Nav.Link>
                            <Nav.Link href="#events">Events</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Dynamic content area */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
}

export default CustomerPage;
