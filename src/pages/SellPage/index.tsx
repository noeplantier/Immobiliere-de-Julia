import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import GlobalContext from '../../context/GlobalContext';
import './index.scss';

function SellPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [address, setAddress] = useState('');
  const { user } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission des données à l'API
    console.log({
      title,
      description,
      price,
      propertyType,
      area,
      rooms,
      address,
      userId: user.id,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h3" gutterBottom>
          Mettre en vente un bien
        </Typography>
        <TextField
          fullWidth
          label="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Prix"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type de bien</InputLabel>
          <Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <MenuItem value="Appartement">Appartement</MenuItem>
            <MenuItem value="Maison">Maison</MenuItem>
            <MenuItem value="Terrain">Terrain</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Surface (m²)"
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Nombre de pièces"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Adresse"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Soumettre
        </Button>
      </Box>
    </Container>
  );
}

export default SellPage;
