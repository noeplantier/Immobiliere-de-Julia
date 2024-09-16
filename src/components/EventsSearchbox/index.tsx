import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import brittany_sky_img from '../../assets/brittany-sky.jpeg';
import './index';
import './index.scss';
import accountServices from '../../_services/account.service';
import { Navigate, useNavigate } from 'react-router';
import logo from '../../assets/immo-logo.jpg';

type EventsSearchboxProps = {
  setListEvents: (listEvent: Event[]) => void;
  userLocation: { lat: number; lon: number };
};

function EventsSearchbox({
  setListEvents,
  userLocation,
}: EventsSearchboxProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchfield, setSearchField] = React.useState('');
  const [availablesField] = React.useState({
    title: 'Titre',
    tag: 'Catégorie',
    city: 'Ville',
    location: 'Adresse',
  });
  const [searchInput, setSearchInput] = React.useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput.trim()) {
      alert('Please enter a valid search term');
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}events?searchfield=${searchfield}&searchtext=${encodeURI(searchInput)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setListEvents(data);
      setSearchInput('');
      setSearchField('');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSearchField(event.target.value);
  };

  const handleReset = () => {
    setSearchInput('');
    setSearchField('');
    const resetData = async () => {
      try {
        const { lat, lon } = userLocation || {};
        if (!lat || !lon) {
          throw new Error('Invalid user location');
        }
        const response = await fetch(
          `${API_URL}events?latitude=${userLocation.lon}&longitude=${userLocation.lat}`,
          {
            headers: {
              // Pour empêcher le MIME type sniffing.
              'X-Content-Type-Options': 'nosniff',
              // Pour protéger contre les attaques de clickjacking.
              'X-Frame-Options': 'DENY',
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setListEvents(data);
      } catch (error) {
        throw new Error('Erreur lors du fetch');
      }
    };

    resetData();
  };

  const toCreateEvent = () => {
    navigate('/event');
  };

  return (
    <div className="form-img-container">
      <div className="searchbox_bg">
        <form className="event_searchbox" action="" onSubmit={handleSubmit}>
          <h2 className="event_searchbox_title">Trouves ton évènement :</h2>
          <div className="event_searchbox_logo">
            <img src={logo} alt="O'Party Logo" />
          </div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Rubriques de recherche :
            </InputLabel>
            <Select
              defaultValue="Titre"
              className="event_searchbox_select"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={searchfield}
              onChange={handleChange}
              label="Quel type d'évènement recherchez-vous ?"
              placeholder="Tapez votre recherche"
            >
              <MenuItem value={availablesField.title}>Titre</MenuItem>
              <MenuItem value={availablesField.tag}>Catégorie</MenuItem>
              <MenuItem value={availablesField.city}>Ville</MenuItem>
              <MenuItem value={availablesField.location}>Adresse</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="standard-basic"
            label="Que recherchez-vous ?"
            variant="standard"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Rechercher
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Réinitialiser
          </Button>
        </form>
      </div>
      <div className="img-container">
        <div className="hero_image">
          <img src={brittany_sky_img} alt="hero_image" className="hero_img" />
        </div>
      </div>
    </div>
  );
}

export default EventsSearchbox;
