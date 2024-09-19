import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function Louer() {
  const [formData, setFormData] = useState({
    city: '',
    rent: '',
    propertyType: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Louer form data:', formData);
    // Logic to submit rental request
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h3">Louer un bien immobilier</Typography>
        <TextField fullWidth label="Ville" name="city" value={formData.city} onChange={handleChange} />
        <TextField fullWidth label="Loyer max (€)" name="rent" value={formData.rent} onChange={handleChange} />
        <TextField fullWidth label="Type de bien" name="propertyType" value={formData.propertyType} onChange={handleChange} />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>Rechercher</Button>
      </Box>
    </Container>
  );
}

export default Louer;
