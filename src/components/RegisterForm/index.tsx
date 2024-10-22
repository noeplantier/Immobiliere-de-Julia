import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatePickerCpn from '../DatePicker/DatePicker';
import './index.scss';

const defaultTheme = createTheme();

type RegisterFormProps = {
  onClose: () => void;
  setIsConnexionModalOpen: (value: boolean) => void;
  setIsRegisterModalOpen: (value: boolean) => void;
};

function RegisterForm({
  onClose,
  setIsConnexionModalOpen,
  setIsRegisterModalOpen,
}: RegisterFormProps) {
  const [url, setUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs('01/01/2000', 'DD/MM/YYYY')
  );
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const RegisterFormdata = new FormData(e.currentTarget);
    const formData = {
      first_name: RegisterFormdata.get('firstName') as string,
      last_name: RegisterFormdata.get('lastName') as string,
      birth_date: selectedDate?.format('YYYY-MM-DD') as string,
      address: RegisterFormdata.get('address') as string,
      email: RegisterFormdata.get('email') as string,
      password: RegisterFormdata.get('password') as string,
      password_confirmation: RegisterFormdata.get(
        'password_confirmation'
      ) as string,
      profile_picture: url,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log('Inscription réussie:', result);
        navigate('/'); // Redirection vers la page d'accueil ou profil après inscription réussie
      } else {
        console.error("Erreur lors de l'inscription:", result);
        setErrors([result.message || "Erreur lors de l'inscription"]);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setErrors(['Une erreur est survenue lors de la soumission du formulaire.']);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" sx={{ width: '100%' }}>
        <CssBaseline />
        <Box
          sx={{
            position: 'relative',
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar sx={{ m: 1, bgcolor: 'skyblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
            className="registerForm"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <DatePickerCpn
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Adresse"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirmer Mot de passe"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {errors.length > 0 && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {errors.map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Inscription
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}L'Immobilière de Julia {new Date().getFullYear()}. Tous droits
      réservés.
    </Typography>
  );
}

export default RegisterForm;
