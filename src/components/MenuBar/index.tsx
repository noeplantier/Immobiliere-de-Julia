import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function MenuBar() {
  return (
    <nav className="menu-bar">
      <Link to="/" className="menu-link">
        Accueil
      </Link>
      <Link to="/sales" className="menu-link">
        Nos biens immobiliers
      </Link>
      <Link to="/buy" className="menu-link">
        Acheter
      </Link>
      <Link to="/rent" className="menu-link">
        Louer
      </Link>
         <Link to="/contacts" className="menu-link">
         Contacts
         </Link>
    </nav>
  );
}

export default MenuBar;
