import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Utilisation de react-router-dom pour la navigation
import './index.scss';
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  FormControl,
  FormLabel,
} from '@mui/material';
import GlobalContext from '../../context/GlobalContext';
import { Event } from '../../@types';
import EventList from '../../components/EventList';
import accountServices from '../../_services/account.service';
import ConfirmDialog from '../../components/ConfirmDialog';
import ImgPicker from '../../components/ImagePicker';

function ProfilePage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState(GlobalContext);
  const [listEvents, setListEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
    }
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        };
        const response = await fetch(`${API_URL}user/me`, {
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

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    sessionStorage.setItem('user', JSON.stringify({}));
  };

  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: `${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      };
      const response = await fetch(`${API_URL}user/me`, {
        method: 'DELETE',
        headers,
      });
      const data = await response.json();
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
      Authorization: `${sessionStorage.getItem('token')}`,
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
      const response = await fetch(`${API_URL}user/me`, {
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
            <Button
              variant="contained"
              className="button-primary"
              onClick={handleEditClick}
            >
              Modifier mon profil
            </Button>
          )}
          <Button
            variant="outlined"
            className="button-secondary"
            onClick={handleClickOpen}
          >
            Supprimer mon compte
          </Button>
          <ConfirmDialog
            open={open}
            handleClose={handleClose}
            handleConfirm={handleDelete}
          />
        </Box>

        <CardContent className="profile-about">
          <Typography variant="h4" gutterBottom>
            À Propos
          </Typography>
          <Typography variant="h5">{user.about}</Typography>
        </CardContent>
      </Card>

      {isEditing && (
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Modifier le profil
            </Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              className="edit-form"
            >
              <FormControl sx={{ width: '100%' }}>
                <FormLabel
                  sx={{
                    textAlign: 'left',
                    marginLeft: '0.8rem',
                    zIndex: 2,
                    position: 'absolute',
                    backgroundColor: '#ffffff',
                    padding: '0 0.5rem',
                    top: '-0.6rem',
                    fontSize: '0.8rem',
                  }}
                >
                  À Propos
                </FormLabel>
                <TextField
                  id="filled-multiline-flexible"
                  label="Multiline"
                  multiline
                  maxRows={4}
                  value={user.about}
                  variant="outlined"
                  onChange={handleChange}
                  name="about"
                />
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Adresse Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Adresse"
                name="address"
                value={user.address}
                onChange={handleChange}
              />

              <ImgPicker
                url={user.profile_picture}
                setUrl={handleProfilePictureChange}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSaveClick}
              >
                Enregistrer les modifications
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
      <EventList events={listEvents} />
    </div>
  );
}

export default ProfilePage;
