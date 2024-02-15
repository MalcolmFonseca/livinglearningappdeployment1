import React from "react";
import { Row, Col, Image, Container } from 'react-bootstrap';
import logo from './logo.png'; 
import './About.css'; 

function About() {
    return (
        <Container className="about-section my-5">
            <Row className="align-items-center">
                <Col md={7} className="text-section">
                    <h2>About Us</h2>
                    <p>
                        Ongoing Living and learning is an OLLI, a registered not-for-profit caregiver-driven company dedicated to fostering a community of
                        inclusion and forming a circle of friendship that enriches the lives of our loved ones with intellectual disabilities, while also
                        providing support for the entire family. Our commitment revolves around four key areas of focus: Cheer Group, Cheer Works, Cheer
                        Connections, and Cheer Living.
                    </p>
                </Col>
                <Col md={5} className="image-section text-center">
                    <Image src={logo} alt="Company Logo" fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default About;
