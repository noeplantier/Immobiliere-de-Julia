import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import accountServices from '../../_services/account.service';

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

const defaultTheme = createTheme();

type ConnexionFormProps = {
  setIsConnexionModalOpen: (value: boolean) => void;
  isConnexionModalOpen: boolean;
  setIsRegisterModalOpen: (value: boolean) => void;
  onClose: () => void;
};

function ConnexionForm({
  setIsConnexionModalOpen,
  isConnexionModalOpen,
  setIsRegisterModalOpen,
  onClose,
}: ConnexionFormProps) {
  const { user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      if (!email || !password) {
        throw new Error('Erreur de connexion');
      }
      const header = {
        'Content-Type': 'application/json',
        method: 'POST',
        credentials: 'include',
      };
      const body = { email, password };

      const response = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const token = response.headers.get('Authorization') || data.token || '';
      if (token) {
        const tokenValue = token.split(' ')[1];
        console.log('Token:', tokenValue);
        sessionStorage.clear();
        setUser({});
        setUser(data);
        accountServices.saveToken(token);

        navigate('/profile'); // Redirection vers la page de profil
      } else {
        console.error('En-tête Authorization non trouvé');
      }
    } catch (error) {
      throw new Error('Erreur lors du fetch');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    login(email, password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ alignSelf: 'flex-end', marginBottom: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar sx={{ m: 1, bgcolor: 'skyblue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  onClick={() => {
                    setIsConnexionModalOpen(false);
                    setIsRegisterModalOpen(true);
                  }}
                >
                  {"Vous n'avez pas de compte l'Immobilière de Julia ? Inscrivez-vous"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default ConnexionForm;
