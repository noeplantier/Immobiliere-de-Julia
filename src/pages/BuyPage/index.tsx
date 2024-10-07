import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';
import './index.scss';

function BuyPage() {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactData = {
      surname,
      name,
      email,
      phone,
      city,
      price,
      type,
      message
    };
    console.log('Form Data Submitted:', contactData);

    try {
      const response = await fetch('URL_API/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert('Message envoyé avec succès !');
        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setCity('');
        setPrice('');
        setType('');
        setMessage('');
      
      } else {
        alert('Erreur lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur technique.');
    }
  };

  return (
    <div className="contact-container">
      <div className="background_bg">
        <div className="form">
          <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4, pt: 4 }}>
              <Typography variant="h3" fontFamily={'Times New Roman'} gutterBottom>
                Acheter un bien 
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Prénom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              /> 
              <TextField
                fullWidth
                margin="normal"
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Téléphone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
                   <TextField
                fullWidth
                margin="normal"
                label="Ville"
                type="city"
                value={city}
                onChange={(e) => setPhone(e.target.value)}
              />
                   <TextField
                fullWidth
                margin="normal"
                label="Prix"
                type="price"
                value={price}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Type de bien"
                multiline
                rows={4}
                value={type}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button
                size="medium"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 4, mb: 2 }}
              >
                Envoyer
              </Button>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;
