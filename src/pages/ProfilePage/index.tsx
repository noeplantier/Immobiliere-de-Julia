import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { Box, Avatar, Typography, Button, Card, CardContent, TextField, FormControl, FormLabel } from '@mui/material';
import GlobalContext from '../../context/GlobalContext';
import { Event } from '../../@types';
import EventList from '../../components/EventList';
import accountServices from '../../_services/account.service';
import ConfirmDialog from '../../components/ConfirmDialog';
import ImgPicker from '../../components/ImagePicker';

function ProfilePage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user, setUser } = useContext(GlobalContext);
  const [listEvents, setListEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
    }
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        };
        const response = await fetch(`${API_URL}/user/me`, {
          method: 'GET',
          headers,
        });
        const data = await response.json();
        setUser(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        setListEvents(data.events || []);
      } catch (error) {
        console.error('Erreur lors du fetch:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    sessionStorage.setItem('user', JSON.stringify({ ...user, [name]: value }));
  };

  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      };
      await fetch(`${API_URL}/user/me`, {
        method: 'DELETE',
        headers,
      });
      setUser({});
      accountServices.logout();
      navigate('/');
      setOpen(false);
    } catch (error) {
      console.error('Erreur lors du fetch:', error);
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfilePictureChange = (url: string) => {
    setUser({ ...user, profile_picture: url });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      email: user.email,
      about: user.about,
      profile_picture: user.profile_picture,
    });

    try {
      const response = await fetch(`${API_URL}/user/me`, {
        method: 'PATCH',
        headers,
        body,
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        console.log('Profile updated successfully:', data);
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <Card className="profile-card">
        <Box className="profile-header">
          <Avatar
            src={user.profile_picture}
            alt="Profile Picture"
            className="profile-avatar"
            sx={{ width: 200, height: 200 }}
          />
          <Box className="profile-info">
            <Typography variant="h3">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">
              {user.address}, {user.city}
            </Typography>
          </Box>
          {!isEditing && (
            <Button variant="outlined" onClick={handleEditClick}>
              Modifier le profil
            </Button>
          )}
          {isEditing && (
            <Button variant="contained" onClick={handleSaveClick}>
              Sauvegarder
            </Button>
          )}
        </Box>

        {isEditing && (
          <CardContent>
            <TextField
              margin="normal"
              label="Prénom"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Nom"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Adresse"
              name="address"
              value={user.address}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Ville"
              name="city"
              value={user.city}
              onChange={handleChange}
              fullWidth
            />
            <ImgPicker onImageChange={handleProfilePictureChange} />
          </CardContent>
        )}
      </Card>

      <Box className="event-list-container">
        <EventList events={listEvents} />
      </Box>

      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Supprimer le compte
      </Button>
      <ConfirmDialog open={open} onClose={handleClose} onConfirm={handleDelete} />
    </div>
  );
}

export default ProfilePage;
