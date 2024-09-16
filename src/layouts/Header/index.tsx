import { Box, Button, Dialog } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/immo-logo.jpg';
import './index.scss';
import Splitter from '../../components/Splitter';
import ConnexionForm from '../../components/ConnexionForm';
import RegisterForm from '../../components/RegisterForm';
import GlobalContext from '../../context/GlobalContext';
import accountServices from '../../_services/account.service';
import MenuBar from '../../components/MenuBar';

function Header() {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isConnexionModalOpen, setIsConnexionModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleConnexionClick = () => {
    setIsConnexionModalOpen(true);
  };

  const handleProfileClick = () => {
    navigate(`/user/me`);
  };

  const handleDeconnexionClick = () => {
    // Appeler le service de déconnexion pour supprimer le token et les données utilisateur
    accountServices.logout();

    // Effacer les données de l'utilisateur stockées dans le contexte global
    context.setUser(null); // Assurez-vous que cette fonction est définie dans votre contexte global

    // Effacer les données de session
    sessionStorage.clear();

    // Rediriger l'utilisateur vers la page d'accueil
    navigate(`/`);
  };

  return (
    <>
      <header className="header">
        <h1 className="header_title">L'immobilière de Julia</h1>
        <div className="header_logo_immo_julia">
          <Link to="/">
            <img src={logo} alt="O'Party Logo" />
          </Link>
        </div>
        <Box className="header_buttons">
          {context.user?.first_name ? (
            <>
              <Button
                size="small"
                variant="contained"
                type="button"
                className="login"
                onClick={handleDeconnexionClick}
              >
                Déconnexion
              </Button>
              <Button
                size="small"
                variant="contained"
                type="button"
                className="register"
                onClick={handleProfileClick}
              >
                Mon profil
              </Button>
            </>
          ) : (
            <>
              <Button
                size="small"
                variant="contained"
                type="button"
                className="login"
                onClick={handleConnexionClick}
              >
                Connexion
              </Button>
              <Button
                size="small"
                variant="contained"
                type="button"
                className="register"
                onClick={handleRegisterClick}
              >
                Inscription
              </Button>
            </>
          )}
        </Box>
        <Dialog
          open={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        >
          <RegisterForm
            onClose={() => setIsRegisterModalOpen(false)}
            setIsConnexionModalOpen={setIsConnexionModalOpen}
            setIsRegisterModalOpen={setIsRegisterModalOpen}
          />
        </Dialog>
        <Dialog
          open={isConnexionModalOpen}
          onClose={() => setIsConnexionModalOpen(false)}
        >
          <ConnexionForm
            onClose={() => setIsConnexionModalOpen(false)}
            setIsRegisterModalOpen={setIsRegisterModalOpen}
            setIsConnexionModalOpen={setIsConnexionModalOpen}
          />
        </Dialog>
      </header>
    </>
  );
}

export default Header;
