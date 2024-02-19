import React from "react";
import { Container, Card, ListGroup } from 'react-bootstrap';
import './Resources.css'; 

function Resources() {
    return (
        <Container className="my-4">
            <h1 className="text-center mb-4">Cheer Connections Resources</h1>
            
            {/* Ontario Caregivers Association */}
            <Card className="mb-3">
                <Card.Header as="h2">Ontario Caregivers Association</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Ontario Caregivers Association advocates for the rights and support of caregivers in Ontario, providing resources and fostering a supportive community.
                    </Card.Text>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            Website: <a href="https://ontariocaregivers.ca/" target="_blank" rel="noopener noreferrer">Ontario Caregivers Association</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Contact: <a href="https://ontariocaregivers.ca/contact/" target="_blank" rel="noopener noreferrer">Contact Information</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            {/* Community Living Ontario */}
            <Card className="mb-3">
                <Card.Header as="h2">Community Living Ontario</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Community Living Ontario works towards the full inclusion and empowerment of people with intellectual disabilities and their families across the province.
                    </Card.Text>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            Website: <a href="https://communitylivingontario.ca/" target="_blank" rel="noopener noreferrer">Community Living Ontario</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Contact: <a href="https://communitylivingontario.ca/contact/" target="_blank" rel="noopener noreferrer">Contact Information</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            {/* Inclusion Canada */}
            <Card className="mb-3">
                <Card.Header as="h2">Inclusion Canada</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Inclusion Canada is dedicated to advocating for the rights and inclusion of Canadians with intellectual disabilities and their families on a national level.
                    </Card.Text>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            Website: <a href="https://inclusioncanada.ca/" target="_blank" rel="noopener noreferrer">Inclusion Canada</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Contact: <a href="https://inclusioncanada.ca/contact/" target="_blank" rel="noopener noreferrer">Contact Information</a>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            {/* Footer */}
            <footer className="text-center mt-4 mb-4">
                <p>&copy; 2024 Cheer Connections</p>
            </footer>
        </Container>
    );
}

export default Resources;
