import React, { useState } from 'react';
import './Chatbot.css'; 
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: "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",
dangerouslyAllowBrowser: true,});

function Chatbot() {
  const [messages, setMessages] = useState([]);


  //require("dotenv").config();


  const handleUserMessage = async (e) => {
    e.preventDefault();
    const userInput = e.target.message.value;

    setMessages([...messages, { text: userInput, sender: 'user' }]);
    
   
    try {
      // Call GPT API to generate response
      //main();
      //return;
      const response = await genResponse(userInput);
      setMessages([...messages, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error generating response:', error);
    }
    e.target.reset();
  };

  async function main() {
    console.log("Doing");
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: "Who won the world series in 2020?" },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content);
  }
  
  const genResponse = async (userInput) => {

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
        temperature: 0,
        max_tokens: 10,
      });
      return response.choices.map(choice => choice.message.content).join('\n');
    } catch (err) {
      if (err.response && err.response.status === 429) {
    
        await new Promise(resolve => setTimeout(resolve, 10000));
        return genResponse(userInput); 
      } else {
        console.error('Error generating response:', err);
        throw err;
      }
    }
  
  };
  


  return (
    <div className="chatbot-container">
      <div className="chat-history">
      {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'user' ? <span className="user-message">{message.text}</span> : <span className="bot-message">{message.text}</span>}
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
