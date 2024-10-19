import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.scss';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function ChatbotComponent() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { user: input, bot: '' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botResponse = await fetchChatbotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        { user: '', bot: botResponse },
      ]);

      setInput('');
    }
  };

  const fetchChatbotResponse = async (message: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `L'Immobilière de Julia : ${message}`,
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      return data.choices[0].text.trim();
    } catch (error) {
      console.error('Erreur lors de la connexion au chatbot :', error);
      return 'Désolé, je ne suis pas disponible actuellement. Veuillez réessayer plus tard.';
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <img
        src="src/assets/immo-logo.jpeg"
        alt="Logo ChatBot"
        className="chatbot-logo"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h2>Paul, votre assistant intelligent</h2>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className="chatbot-message">
                {message.user && <div className="user-message">{message.user}</div>}
                {message.bot && <div className="bot-message">{message.bot}</div>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question à Paul."
            />
            <IconButton onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotComponent;
