
import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);

  const handleUserMessage = async (e) => {
    e.preventDefault();
    const userInput = e.target.message.value;

    setMessages([...messages, { text: userInput, sender: 'user' }]);

    try {
      // Call the backend API
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const { response: botResponse } = await response.json();

      setMessages([...messages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error handling user message:', error);
    }
    e.target.reset();
  };

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'user' ? (
              <span className="user-message">{message.text}</span>
            ) : (
              <span className="bot-message">{message.text}</span>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleUserMessage} className="message-form">
        <input type="text" name="message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;