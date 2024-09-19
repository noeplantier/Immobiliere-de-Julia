import React, { useState, useEffect, useContext } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Box,
  Autocomplete,
} from '@mui/material';
import GlobalContext from '../../context/GlobalContext';
import ImgPicker from '../../components/ImagePicker';
import './index.scss';
import { useNavigate } from 'react-router';

function CreateEvent() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [floor, setFloor] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState('');
  const [accessibilityPMR, setAccessibilityPMR] = useState(false);
  const [city, setCity] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [eventLocation, setEventLocation] = useState<[number, number]>([0, 0]);
  const { user } = useContext(GlobalContext);
  const userId = user.id;
  const navigate = useNavigate();

  function getlocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
  };

  const errorCallback = (error) => {
    console.log(error);
  };
  getlocation();
  const handleCityChange = async () => {
    setCitySuggestions([]);
    console.log('fetching result');

    if (city.length > 2) {
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${city}&fields=nom&limit=5&fields=codesPostaux`,
        { method: 'GET' }
      );
      console.log(response);
      const data = await response.json();
      data.map((city) => {
        //  on boucle sur chaques item du map pour vérifier la présence de plusieurs codes postaux
        console.log(city);
        //  je vérifie si item a plusieurs codes postaux
        if (city.codesPostaux.length > 1) {
          //  je renvoie un item pour chaque code postal
          return city.codesPostaux.map((codePostal) => {
            return setCitySuggestions((citySuggestions) => [
              ...citySuggestions,
              `${codePostal} ${city.nom}`,
            ]);
          });
        }

        //  si un seul code postal je renvois item
        return setCitySuggestions((citySuggestions) => [
          ...citySuggestions,
          `${city.codesPostaux[0]} ${city.nom}`,
        ]);
      });
    } else {
      setCitySuggestions([]);
    }
  };
  const handleStatusChange = (e) => {
    if (e.target.value === 1) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };
  // Fonction pour obtenir les coordonnées d'une ville à partir d'un code postal
  async function getCoordinates(postalCode, countryCode) {
    // URL de l'API Zippopotam.us
    const apiUrl = `https://api.zippopotam.us/${countryCode}/${postalCode}`;

    try {
      // Effectuer une requête GET à l'API
      const response = await fetch(apiUrl);

      // Vérifier si la réponse est correcte
      if (!response.ok) {
        throw new Error(`Erreur: ${response.status} ${response.statusText}`);
      }

      // Convertir la réponse en JSON
      const data = await response.json();

      // Extraire la latitude et la longitude des données
      const place = data.places[0];
      const { latitude, longitude } = place;
      //TOFIX
      setEventLocation([Number(longitude), Number(latitude)]);
      // Retourner les coordonnées
      return { latitude, longitude };
    } catch (error) {
      // Gérer les erreurs éventuelles
      console.error('Erreur lors de la récupération des coordonnées:', error);
      return null;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postalCode = citySuggestions[0].split(' ')[0];
    console.log(postalCode); // Exemple de code postal
    const countryCode = 'FR'; // Code du pays

    const coordinates = await getCoordinates(postalCode, countryCode);
    if (coordinates?.latitude && coordinates?.longitude !== 0) {
      console.log(
        `Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`
      );
      console.log(`récupération longitude latitude`, eventLocation);
    } else {
      console.log('Impossible de récupérer les coordonnées.');
    }
    const coordsArray = [coordinates.latitude, coordinates.longitude];

    const headers = {
      Authorization: `${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      METHODS: 'POST',
    };

    const requestBody = {
      title,
      description,
      start_date: startDate,
      start_hour: `${startTime}:00`,
      finish_date: endDate,
      address,
      //TODO : utiliser les coordonnées à jour dans le state
      location: coordsArray.map((coord) => parseFloat(coord)),
      price: Number(price),
      privacy_type: confidentiality,
      picture: image,
      max_attendee: Number(maxParticipants),
      status,
      pmr_access: accessibilityPMR,
      zip_code_city: city,
      user_id: userId,
    };
    console.log('Data Submitted:', requestBody);
    console.log(`header: ${headers}`);

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}event`, {
          method: 'POST', // or 'PUT' if you're sending data to the server
          headers,
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        console.log(`my data:`, data);
        if (response.ok) {
          alert('Événement enregistré avec succès');
          navigate('/');
        }
      } catch (error) {
        console.error('Erreur lors du fetch:', error);
      }
    };

    fetchData();
  };
  return (
    <div className="container">
      <div className="background_bg">
        <div className="form">
          <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4, pt: 4 }}>
              <Typography variant="h4" fontFamily={'Times New Roman'} gutterBottom>
                Vendez vos biens immobiliers
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
               <TextField
                fullWidth
                margin="normal"
                label="Prix (€)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
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
                margin="normal"
                label="Surface (m²)"
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Nombre de pièces"
                type="number"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Étage(s)"
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Date de mise en vente"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
          
              <TextField
                fullWidth
                margin="normal"
                label="Adresse"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Autocomplete
                fullWidth
                options={citySuggestions}
                value={city}
                onChange={(event, newValue) => {
                  setCity(newValue || '');
                  handleCityChange();
                }}
                inputValue={city}
                onInputChange={(event, newInputValue) => {
                  setCity(newInputValue);
                  handleCityChange();
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ville" margin="normal" />
                )}
              />
            
              <FormControl fullWidth margin="normal">
                <InputLabel>Statut</InputLabel>
                <Select value={1} required>
                  <MenuItem onSelect={(e) => handleStatusChange(e)} value={1}>
                    À Vendre
                  </MenuItem>
                  <MenuItem onSelect={(e) => handleStatusChange(e)} value={0}>
                    Vendu
                  </MenuItem>
                </Select>
              </FormControl>
              <ImgPicker url={image} setUrl={setImage} />
       
            
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 7, mb:4}}
              >
                Créer une annonce 
              </Button>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}
export default CreateEvent;
