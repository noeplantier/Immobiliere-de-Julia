import * as React from 'react';
import {
  Link,
  Typography,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import {
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
} from '@mui/icons-material';
import './index.scss';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: '60vh',
        backgroundImage: 'url(https://st.depositphotos.com/2369859/3205/i/450/depositphotos_32055461-stock-photo-abstract-blue-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'center',
        mt: 'auto',
        mb: '0',
        padding: '20px',
        color: 'white',
      }}
    >
      <Grid container spacing={3} sx={{ maxWidth: '1200px', textAlign: 'center' }}>

        <Grid item xs={12} md={4}>
        <Typography 
          variant="h4" 
          fontFamily={'Times New Roman'}
          sx={{ color: 'white', textDecoration: 'none', mb: 5 }}
          >
            L'immobilière de Julia
          </Typography>
          <Typography 
          variant="body2"
          fontFamily={'Times New Roman'}
          sx={{ maxWidth: '1200px', textAlign: 'left' }}>
 
SIREN : 948 371 463 <br></br>
SIRET : 948 371 463 00019 <br></br>
N° TVA : FR29 948 371 463 <br></br>
Activité principale (NAF/APE) : Agences immobilières <br></br>
Code NAF/APE : 68.31Z <br></br>
Adresse postale : 2 PLACE DE LA RESISTANCE 29530 PLONEVEZ-DU-FAOU <br></br>
Nature juridique : Société à responsabilité limitée (sans autre indication) <br></br>
Date de création : 16/02/2023 <br></br>

            
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography 
          variant="h4" 
          fontFamily={'Times New Roman'}
          sx={{ color: 'white', textDecoration: 'none', mb: 5 }}
          >
            Contactez-nous
          </Typography>
          <Typography variant="body1" fontFamily={'Times New Roman'}>
            📞 : <Link href="tel:+330612345678" sx={{ color: 'white', textDecoration: 'none' }}>06 12 34 56 78</Link> <br />
            📧 : <Link href="mailto:contact@immobilierejulia.fr" sx={{ color: 'white', textDecoration: 'none' }}>contact@immobilierejulia.fr</Link>
          </Typography>
        </Grid>

        {/* Section Réseaux Sociaux */}
        <Grid item xs={12} md={4}>
        <Typography 
          variant="h4" 
          fontFamily={'Times New Roman'}
          sx={{ color: 'white', textDecoration: 'none', mb: 5 }}
          >
            Nos réseaux
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton href="https://linkedin.com" sx={{ color: 'white' }}>
              <LinkedIn />
            </IconButton>
            <IconButton href="https://twitter.com" sx={{ color: 'white' }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://facebook.com" sx={{ color: 'white' }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://instagram.com" sx={{ color: 'white' }}>
              <Instagram />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright et Mentions Légales */}
      <Typography variant="body2" color="white" align="left" fontFamily={'Times New Roman'} mt={3}>
        {'© '}{new Date().getFullYear()} L'immobilière de Julia. Tous droits réservés.
      </Typography>
      <Typography variant="body2" color="white" align="left" fontFamily={'Times New Roman'}>
        <Link
          href="/mentions-legales"
          sx={{ color: 'white', textDecoration: 'underline', mx: 1 }}
        >
          Mentions légales
        </Link> |
        <Link
          href="/politique-confidentialite"
          sx={{ color: 'white', textDecoration: 'underline', mx: 1 }}
        >
          Politique de confidentialité
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
