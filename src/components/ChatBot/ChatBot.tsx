import React, { useState } from 'react';
import './ChatBot.scss';
import logo from '../../assets/immo-logo.jpeg';

function ChatbotComponent () {
  const [messages, setMessages] = useState<{user: string, bot: string}[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Pour gérer l'ouverture/fermeture du ChatBot

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
        'Authorization': `Bearer YOUR_API_KEY` // Insère ta clé d'API ici
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
      {/* Logo qui ouvre le ChatBot */}
      <img
        src={logo}
        alt="Logo ChatBot"
        className="chatbot-logo"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h2>ChatBot</h2>
            <button onClick={() => setIsOpen(false)}>X</button> {/* Bouton de fermeture */}
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
            placeholder="Posez une question..."
          />
          <button onClick={handleSendMessage}>Envoyer</button>
        </div>
      )}
    </div>
  );
}

export default ChatbotComponent;
