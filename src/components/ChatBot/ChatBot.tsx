import React, { useState } from 'react';
import './ChatBot.scss';
import logo from '../../assets/immo-logo.jpeg'; 
import { Image } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';


function ChatbotComponent () {
  const [messages, setMessages] = useState<{user: string, bot: string}[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); 

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { user: input, bot: '' };
      setMessages([...messages, userMessage]);

      const botResponse = await fetchChatbotResponse(input);
      setMessages([...messages, userMessage, { user: '', bot: botResponse }]);

      setInput('');
    }
  };

  const fetchChatbotResponse = async (message: string) => {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // Utilisation de la clé API depuis .env
      },
      body: JSON.stringify({
        model: 'text-davinci-003', // Modèle de l'IA
        prompt: message,
        max_tokens: 150
      })
    });
  
    const data = await response.json();
    return data.choices[0].text.trim(); // Retourne la réponse de l'IA
  };
  

  return (
    <div>
      <img src='src/assets/immo-logo.jpeg'
        alt="Logo ChatBot"
        className="chatbot-logo"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <Image className="immo-logo" src={"/public/immo-logo.jpeg"}></Image>
            <h2>Paul, votre assistant intelligent</h2>
            <IconButton onClick={() => setIsOpen(false)}>x</IconButton> 
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className="chatbot-message">
                {message.user && <div className="user-message">{message.user}</div>}
                {message.bot && <div className="bot-message">{message.bot}</div>}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question à Paul."
          />
          <button onClick={handleSendMessage}>Envoyer</button>
        </div>
      )}
    </div>
  );
}

export default ChatbotComponent;
