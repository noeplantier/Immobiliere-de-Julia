import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/immo-logo.jpeg';
import './index.scss';

function ErrorPage() {
  return (
    <div className="error-404-container">
      <img src={logo} alt="O'Party Logo" className="error-404-logo" />
      <h1 className="error-404-title">404</h1>
      <h2 className="error-404-text">Page not found</h2>
      <Link to="/" className="error-404-subtitle">
        Go back to the party ! 🎉
      </Link>
    </div>
  );
}

export default ErrorPage;
