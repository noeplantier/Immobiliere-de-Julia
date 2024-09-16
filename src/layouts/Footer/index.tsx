import * as React from 'react';
import {
  Link,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Translate,
  LinkedIn,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import './index.scss';

function Footer() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleTranslate = (language) => {
    i18n.changeLanguage(language); // Change la langue
    handleCloseMenu();
  };

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: '150px',
        backgroundColor: '#266de7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <IconButton onClick={handleOpenMenu} sx={{ color: 'white' }}>
          <Translate />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => handleTranslate('fr')}>Français</MenuItem>
          <MenuItem onClick={() => handleTranslate('en')}>Anglais</MenuItem>
          <MenuItem onClick={() => handleTranslate('en')}>Espagnol</MenuItem>
          <MenuItem onClick={() => handleTranslate('en')}>Chinois</MenuItem>
        </Menu>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton href="https://linkedin.com" sx={{ color: 'white' }}>
            <LinkedIn />
          </IconButton>
          <IconButton href="https://twitter.com" sx={{ color: 'white' }}>
            <Twitter />
          </IconButton>
          <IconButton
            href="https://facebook.com"
            sx={{ color: 'white' }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            sx={{ color: 'white' }}
          >
            <Instagram />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="h6" color="white" align="center" fontFamily={'Times New Roman'}>
        {'Copyright © '}L'immobilière de Julia - {new Date().getFullYear()}
        <Link
          fontFamily={'Times New Roman'}
          variant="h6"
          href="/mentions-legales"
          sx={{ color: 'white', textDecoration: 'none', mx: 1 }}
        >
          {('Mentions légales')}
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
