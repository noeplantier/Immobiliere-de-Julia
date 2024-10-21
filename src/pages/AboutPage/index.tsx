import React from 'react';
import './index.scss';

const About = () => {
  return (
    <div className="page-container">
      <div className="hero-container">
        <h1 className="story-title">L'Histoire de Julia</h1>
      </div>
      <div className="story-section">
        <p className="story-paragraph">
          <span className="highlight-text">"L'immobilière de Julia"</span> : une passion qui traverse les générations.
        </p>
        <p className="story-paragraph">
          Fondée il y a plus de 30 ans par Julia elle-même, notre agence a été bâtie sur des valeurs solides d'intégrité, de confiance et d'expertise. 
          Chaque projet immobilier que nous menons est un hommage au rêve de Julia : celui d'accompagner chaque client dans leur quête du bien idéal, 
          que ce soit pour vivre, investir ou simplement se ressourcer.
        </p>
        <img className="story-image" src="src/assets/instinct-voyageurs-road-trip-en-bretagne-720x480.jpg" alt="Histoire de Julia" />
      </div>
    </div>
  );
};

export default About;
