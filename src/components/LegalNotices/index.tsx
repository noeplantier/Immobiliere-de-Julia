import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.scss';

const defaultTheme = createTheme();

function LegalNotices() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography component="h1" variant="h3" gutterBottom>
            Mentions Légales
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Bienvenue sur O'Party, votre plateforme dédiée à l'organisation et à
            la participation à des événements festifs. En accédant à notre site,
            vous acceptez les présentes mentions légales. Nous vous invitons à
            les lire attentivement.
          </Typography>
          <Typography variant="h4" gutterBottom>
            1. Informations Générales
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            O'Party est une plateforme en ligne permettant aux utilisateurs de
            participer et d'organiser des soirées et événements festifs. La
            société O'Party, située au 123 Rue de l'Innovation, 75000 Paris, est
            responsable de l'édition et de la gestion du site. Vous pouvez nous
            contacter à l'adresse suivante : contact@oparty.com.
          </Typography>
          <Typography variant="h4" gutterBottom>
            2. Hébergement du site
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Le site O'Party est hébergé par OVH, dont le siège social est situé
            2 Rue Kellermann, 59100 Roubaix, France. Vous pouvez contacter
            l'hébergeur par téléphone au 1007.
          </Typography>
          <Typography variant="h4" gutterBottom>
            3. Propriété intellectuelle
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Tous les contenus présents sur le site O'Party (textes, images,
            logos, vidéos, etc.) sont protégés par les lois sur la propriété
            intellectuelle. Toute reproduction, représentation, modification,
            publication, adaptation de tout ou partie des éléments du site, quel
            que soit le moyen ou le procédé utilisé, est interdite, sauf
            autorisation écrite préalable de O'Party.
          </Typography>
          <Typography variant="h4" gutterBottom>
            4. Données personnelles
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            O'Party s'engage à protéger la vie privée de ses utilisateurs. Nous
            collectons et utilisons vos données personnelles conformément à
            notre politique de confidentialité. Les informations recueillies
            sont destinées à améliorer votre expérience utilisateur et à
            faciliter l'organisation et la participation à des événements. Vous
            avez le droit d'accéder, de rectifier et de supprimer vos données
            personnelles en nous contactant à : privacy@oparty.com.
          </Typography>
          <Typography variant="h4" gutterBottom>
            5. Cookies
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Le site O'Party utilise des cookies pour améliorer la navigation et
            offrir des services personnalisés. Les cookies sont des petits
            fichiers stockés sur votre appareil qui nous aident à analyser
            l'utilisation du site et à vous proposer des contenus adaptés. Vous
            pouvez configurer votre navigateur pour refuser les cookies, mais
            cela peut limiter certaines fonctionnalités du site.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LegalNotices;
