import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function FaireGerer() {
  const [formData, setFormData] = useState({
    property: '',
    address: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Faire gérer form data:', formData);
    // Logic to submit property management request
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h3">Faire gérer un bien immobilier</Typography>
        <TextField fullWidth label="Type de bien" name="property" value={formData.property} onChange={handleChange} />
        <TextField fullWidth label="Adresse" name="address" value={formData.address} onChange={handleChange} />
        <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={4} />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>Envoyer</Button>
      </Box>
    </Container>
  );
}

export default FaireGerer;
