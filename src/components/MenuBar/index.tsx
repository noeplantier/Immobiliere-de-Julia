import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function MenuBar() {
  return (
    <nav className="menu-bar">
      <Link to="/" className="menu-link">
        Accueil
      </Link>
      <Link to="/contacts" className="menu-link">
        Contacts
      </Link>
      <Link to="/events" className="menu-link">
        Évènements
      </Link>
      <Link to="/team" className="menu-link">
        La team O'Party
      </Link>
      <Link to="/partners" className="menu-link">
        Nos Partenaires
      </Link>
      <Link to="/faq" className="menu-link">
        FAQ
      </Link>
    </nav>
  );
}

export default MenuBar;
