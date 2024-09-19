import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h3">Acheter un bien immobilier</Typography>
        <TextField fullWidth label="Ville" name="city" value={searchData.city} onChange={handleChange} />
        <TextField fullWidth label="Budget (€)" name="budget" value={searchData.budget} onChange={handleChange} />
        <TextField fullWidth label="Type de bien" name="propertyType" value={searchData.propertyType} onChange={handleChange} />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>Rechercher</Button>
      </Box>
    </Container>
  );
}

export default Acheter;
