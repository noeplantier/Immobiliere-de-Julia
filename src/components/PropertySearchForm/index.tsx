import React, { useState } from 'react';
import './index.scss';

const PropertySearchForm: React.FC = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Vous pouvez implémenter la logique de recherche ici
    console.log(`Recherche de biens à ${location}, Type: ${propertyType}, Budget: ${budget}`);
  };

  function handleSearch(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  return (
    
<div className="search-form">
<div className="search-options">
  <button className="search-option">Acheter</button>
  <button className="search-option">Louer</button>
  <button className="search-option">Estimer</button>
</div>

<h2 className="search-title">Ma recherche</h2>
<div className="dropdowns">
  <select className="dropdown">
    <option>Localisation</option>
    {/* Ajouter options API */}
  </select>
  <select className="dropdown">
    <option>Type de bien</option>
    <label htmlFor="propertyType">Type de bien</label>
        <select
          id="propertyType"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Sélectionnez un type</option>
          <option value="appartement">Appartement</option>
          <option value="maison">Maison</option>
          <option value="terrain">Terrain</option>
          <option value="local-commercial">Local commercial</option>
        </select>
    {/* Ajouter options API */}
  </select>
  <select className="dropdown">
    <option>Budget</option>
    {/* Ajouter options API */}
  </select>
  <select className="dropdown">
    <option>Nombre de pièces</option>
    {/* Ajouter options API */}
  </select>
</div>
<button className="search-button" onClick={handleSearch}>Rechercher</button>
</div>

  );
};

export default PropertySearchForm;



      
