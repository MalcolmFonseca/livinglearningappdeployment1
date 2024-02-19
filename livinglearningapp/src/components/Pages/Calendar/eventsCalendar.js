import React, { useEffect } from "react";
import { Navbar, Nav, Container,NavDropdown,Row,Col,Image,Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'

const EventsCalendarComponent = () => {
    const [eventDetails, setEventDetails] = useState({
        title: '',
        date: '',
        time: ''
    });

    const [eventData, setEventData] = useState([]);

    useEffect(()=>{
        const fetchEvents = async () => {
            try {
                const startDate = '2024-02-01';
                const endDate = '2024-02-20';
                const response = await fetch(`http://localhost:3001/api/events/find?startDate=${startDate}&endDate=${endDate}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEventData(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching events:', error);
                // Handle error (e.g., display error message to user)
            }
        };
        fetchEvents()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const createEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventDetails),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create event');
            }
    
            const data = await response.json();
            console.log('Event created successfully:', data.event);
    
            // Reset form fields after successful event creation
            setEventDetails({
                title: '',
                description: '',
                date: '',
                time: ''
            });
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error (e.g., display error message to user)
        }
    };

    return (
        <div className="Parent">
            <div className="Navbar">
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Brand href="/customer-home">
                            Living and Learning
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
            <Container className="calendar-container">
                <Row className="align-items-center">
                    <Col md={7} className="text-section">
                        <h2>Events Calendar</h2>
                    </Col>
                </Row>
            </Container>
            <div className="calendar">
                <ReactCalendar/>
            </div>
            <Container>
                <Row className="justify-content-md-center mt-4">
                    <Col md={6}>
                        <Form onSubmit={createEvent}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event title"
                                    name="title"
                                    value={eventDetails.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={eventDetails.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="time"
                                    value={eventDetails.time}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create Event
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EventsCalendarComponent;