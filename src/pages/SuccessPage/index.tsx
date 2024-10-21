import React from 'react';
import './index.scss';

const Success = () => {
  return (
    <div className="page-container">
      <div className="hero-container">
        <h1 className="story-title">Nos Réussites</h1>
      </div>
      <div className="story-section">
        <p className="story-paragraph">
          <span className="highlight-text">Des projets qui témoignent de notre engagement.</span>
        </p>
        <p className="story-paragraph">
          De la vente d'un charmant cottage au bord de mer à la gestion de grands complexes immobiliers, nous sommes fiers de nos réussites.
        </p>
        <p className="story-paragraph">
          Chaque transaction est le fruit d'une collaboration étroite entre nos experts et nos clients. Découvrez les histoires derrière nos plus belles réussites, car chaque projet est bien plus qu'une simple vente.
        </p>
        <img className="story-image" src="/images/nos-reussites.jpg" alt="Nos Réussites" />
      </div>
    </div>
  );
};

export default Success;
