import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import './index.scss'; 

function Acheter() {
  const [searchData, setSearchData] = useState({
    city: '',
    budget: '',
    propertyType: ''
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Acheter form data:', searchData);
    // Logic to search for properties
  };

  return (
    <Container className="acheter-container">
      <Box component="form" onSubmit={handleSubmit} className="acheter-form">
        <Typography variant="h2" className="acheter-title">Acheter un bien immobilier</Typography>
        
        <TextField 
          fullWidth 
          label="Prénom" 
          name="surname" 
          onChange={handleChange} 
          className="acheter-input" 
        />
        <TextField 
          fullWidth 
          label="Nom" 
          name="name" 
          onChange={handleChange} 
          className="acheter-input" 
        />
             <TextField 
          fullWidth 
          label="E-mail" 
          name="mail" 
          onChange={handleChange} 
          className="acheter-input" 
        />
                <TextField 
          fullWidth 
          label="Téléphone" 
          name="phone" 
          onChange={handleChange} 
          className="acheter-input" 
        />
        <TextField 
          fullWidth 
          label="Ville" 
          name="city" 
          value={searchData.city} 
          onChange={handleChange} 
          className="acheter-input" 
        />
        <TextField 
          fullWidth 
          label="Budget (€)" 
          name="budget" 
          value={searchData.budget} 
          onChange={handleChange} 
          className="acheter-input" 
        />
        <TextField 
          fullWidth 
          label="Type de bien" 
          name="propertyType" 
          value={searchData.propertyType} 
          onChange={handleChange} 
          className="acheter-input" 
        />
        <Button 
          type="submit" 
          variant="contained" 
          className="acheter-button"
        >
          Rechercher
        </Button>
      </Box>
    </Container>
  );
}

export default Acheter;
