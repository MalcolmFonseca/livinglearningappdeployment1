import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Chatroom.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Chatroom() {
  const [userMessage, setUserMessage] = useState([]);
  const [currentOwner, setCurrentOwner] = useState(["user1"]);
  /*message object should have:
        - id
        - user who sent
        - contents of message
        - timestamp
    */

  //temp fields for testing purposes
  const [messages, setMessages] = useState([
    {
      id: "0",
      owner: "user1",
      contents: "Hi!",
      timestamp: "10:00pm 13/02/2024",
    },
    {
      id: "1",
      owner: "user2",
      contents: "Hello!",
      timestamp: "10:02pm 13/02/2024",
    },
    {
      id: "2",
      owner: "user1",
      contents: "howre you?",
      timestamp: "10:02pm 13/02/2024",
    },
  ]);

  //map messages to display
  const msgList = messages.map((msg) => {
    if (msg.owner == currentOwner) {
      return (
        <li className="userMessage">
          <li className="messageInfo">{msg.owner}</li>
          <li className="userMessageContent">{msg.contents}</li>
        </li>
      );
    }
    return (
      <li className="message">
        <li className="messageInfo">{msg.owner}</li>
        <li className="messageContent">{msg.contents}</li>
      </li>
    );
  });

  const sendMessage = async (e) => {
    //dont refresh page on submission
    e.preventDefault();
    //build the message object, id to be decided at database
    let tempDate = new Date();
    const tempMessageObject = {
      owner: "user1",
      contents: userMessage,
      //formats to canadian time
      timestamp: tempDate.toLocaleString("en-CA"),
    };

    console.log(tempMessageObject);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/customer-home">Living and Learning</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/about-us">
                ABOUT US
              </Nav.Link>
              <Nav.Link href="#games">GAMES</Nav.Link>
              <Nav.Link as={Link} to="/chatroom">
                CHAT
              </Nav.Link>

              <Nav.Link as={Link} to="/resources">
                RESOURCES
              </Nav.Link>

              <Nav.Link href="#events">EVENTS</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ul className="msgList">{msgList}</ul>
      <form onSubmit={sendMessage} className="inputwrapper">
        <input
          className="messageInput"
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
        ></input>
        <button type="submit" className="sendBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
      </form>
    </>
  );
}

export default Chatroom;
