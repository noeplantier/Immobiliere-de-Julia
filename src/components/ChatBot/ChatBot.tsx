import React, { useState } from 'react';
import './ChatBot.scss';

const ChatbotComponent: React.FC = () => {
  const [messages, setMessages] = useState<{user: string, bot: string}[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { user: input, bot: '' };
      setMessages([...messages, userMessage]);

      // Simulate bot response (replace with API call to OpenAI or other chatbot)
      const botResponse = await fetchChatbotResponse(input); 
      setMessages([...messages, userMessage, { user: '', bot: botResponse }]);

      setInput('');
    }
  };

  const fetchChatbotResponse = async (message: string) => {
    // Remplace cette fonction par une vraie API d'IA comme OpenAI
    return `Réponse automatique à: ${message}`;
  };

  return (
    <div className="chatbot">
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
  );
};

export default ChatbotComponent;
