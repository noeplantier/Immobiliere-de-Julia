import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';
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
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImagePicker from '../ImagePicker';
import DatePickerCpn from '../DatePicker/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';

const defaultTheme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body1"
      color="grey"
      align="center"
      {...props}
    >
      {'Copyright © '}L'immobilière de Julia - {new Date().getFullYear()} . Tous droits
      réservés.
    </Typography>
  );
}

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
  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };
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
      // Validation des données avec Zod
      updateSchema.parse(formData);

      const raw = JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        birth_date: formData.birth_date,
        address: formData.address,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        about: 'Nouveau ici',
        profil_picture: formData.profile_picture,
      });

      // Envoi des données au serveur
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        `${process.env.API_URL}register`,
        requestOptions
      );
      const result = await response.json();

      if (response.ok) {
        console.log('Inscription réussie:', result);
        navigate('/');
      } else {
        console.error("Erreur lors de l'inscription:", result);
        setErrors([result.message || "Erreur lors de l'inscription"]);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.map((err) => err.message);
        setErrors(zodErrors);
      } else {
        setErrors([error.message]);
      }
      console.log(error);
    }
  };

  const toConnexionModal = () => {
    onClose();
    setIsConnexionModalOpen(true);
    setIsRegisterModalOpen(false);
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
                  InputProps={{ sx: { height: 54.9 } }}
                  placeholder="Prénom"
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
              <Grid item xs={12} sm={6}>
                <DatePickerCpn onDateChange={handleDateChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  label="Adresse mail"
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
                  label="Confirmation mot de passe"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ImagePicker url={url} setUrl={setUrl} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, mx: 'auto', display: 'block', width: '50%' }}
            >
              Inscription
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ mt: 1, mb: 2, mx: 'auto', display: 'block', width: '50%' }}
            >
              Fermer
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  className="already-have-account"
                  onClick={toConnexionModal}
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    margin: '0 auto',
                  }}
                >
                  Vous avez déja un compte l'immobilière de Julia ? Connectez-vous dès
                  maintenant !
                </Button>
              </Grid>
            </Grid>
            {errors.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {errors.map((error, index) => (
                  <Typography key={index} color="error">
                    {error}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default RegisterForm;
