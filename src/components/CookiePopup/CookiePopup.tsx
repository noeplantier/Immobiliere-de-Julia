import React, { useState } from 'react';
import './CookiePopup.scss';

function CookiePopup() {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    console.log('Cookies acceptés');
    setIsVisible(false);
  };

  const handleReject = () => {
    console.log('Cookies refusés');
    setIsVisible(false);
  };

  const handleSettings = () => {
    console.log('Paramétrer les cookies');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-popup">
      <div className="cookie-popup-content">
        <button className="close-button" onClick={handleClose}>
          &times; {}
        </button>
        <img
          src="src/assets/funny-internet-cookies-revolution-website-cookie-sticker.jpg"
          alt="Cookie header"
        />
        <h2>
          Nous utilisons des cookies pour améliorer votre expérience sur notre
          site. Veuillez choisir une option ci-dessous :
        </h2>
        <div className="cookie-popup-buttons">
          <button onClick={handleAccept}>Accepter les cookies</button>
          <button onClick={handleSettings}>Paramétrer les cookies</button>
          <button onClick={handleReject}>Refuser les cookies</button>
        </div>
      </div>
    </div>
  );
}

export default CookiePopup;
