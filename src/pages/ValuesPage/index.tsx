import React from 'react';
import './index.scss';

const Values = () => {
  return (
    <div className="page-container">
      <div className="hero-container">
        <h1 className="story-title">Nos Valeurs</h1>
      </div>
      <div className="story-section">
        <p className="story-paragraph">
          <span className="highlight-text">Transparence, accompagnement personnalisé et passion pour l'immobilier.</span> Chez "L'immobilière de Julia", nous croyons que chaque projet immobilier mérite une attention unique.
        </p>
        <p className="story-paragraph">
          Nos agents ne sont pas là pour vendre, mais pour vous conseiller, vous guider et s'assurer que chaque étape de votre parcours immobilier soit une expérience mémorable et positive.
        </p>
        <img className="story-image fade-in" src="/src/assets/1.JPG" alt="Nos Valeurs" />
      </div>
    </div>
  );
};

export default Values;
