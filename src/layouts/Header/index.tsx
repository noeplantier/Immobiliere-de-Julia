import { Box, Button, Dialog } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/immo-logo.jpeg';
import './index.scss';
import Splitter from '../../components/Splitter';
import ConnexionForm from '../../components/ConnexionForm';
import RegisterForm from '../../components/RegisterForm';
import GlobalContext from '../../context/GlobalContext';
import accountServices from '../../_services/account.service';

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
        <img src='src/assets/immo-logo.jpeg'
        alt="Logo ChatBot"
        className="chatbot-logo"
 
      />
          <nav className="menu-bar">
      <Link to="/" className="menu-link">
        Accueil
      </Link>
      <Link to="/sales" className="menu-link">
        Nos biens immobiliers
      </Link>
      <Link to="/buy" className="menu-link">
        Acheter
      </Link>
      <Link to="/rent" className="menu-link">
        Vendre
      </Link>
      <Link to="/estimate" className="menu-link">
        Estimer
      </Link>
         <Link to="/contacts" className="menu-link">
         Contacts
         </Link>
    </nav>
  
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
            setIsConnexionModalOpen={setIsConnexionModalOpen} isConnexionModalOpen={false}          />
        </Dialog>
      </header>
    </>
  );
}

export default Header;
