import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.scss';

const theme = createTheme({
  typography: {
    fontFamily: 'Times New Roman',
    h3: {
      fontWeight: 700,
      color: '#002366', // bleu profond pour un look professionnel
      textAlign: 'center',
      marginBottom: '1em',
    },
    h4: {
      fontWeight: 600,
      color: '#0055a5', // ton plus clair pour les titres de section
      marginTop: '1.5em',
      textAlign: 'left',
    },
    body1: {
      color: '#333',
      lineHeight: 1.8,
    },
  },
});

function LegalNotices() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography component="h1" variant="h3" gutterBottom>
            Mentions Légales
          </Typography>
          <Typography variant="body1" paragraph>
            Bienvenue sur le site de L'Immobilière de Julia, votre partenaire pour toutes vos transactions immobilières. En accédant à notre site, vous acceptez les présentes mentions légales. Nous vous invitons à les lire attentivement.
          </Typography>

          <Typography variant="h4" gutterBottom>
            1. Informations Générales
          </Typography>
          <Typography variant="body1" paragraph>
            L'Immobilière de Julia est une agence immobilière située au 45 Avenue de la Liberté, 33000 Bordeaux, France. Nous sommes spécialisés dans la vente, l'achat, la location, et la gestion de biens immobiliers. Pour toute question ou information, vous pouvez nous contacter à l'adresse suivante : contact@immobilierejulia.fr ou par téléphone au 05 56 12 34 56.
          </Typography>

          <Typography variant="h4" gutterBottom>
            2. Hébergement du site
          </Typography>
          <Typography variant="body1" paragraph>
            Le site de L'Immobilière de Julia est hébergé par OVH, dont le siège social est situé 2 Rue Kellermann, 59100 Roubaix, France. Vous pouvez contacter l'hébergeur par téléphone au 1007.
          </Typography>

          <Typography variant="h4" gutterBottom>
            3. Propriété Intellectuelle
          </Typography>
          <Typography variant="body1" paragraph>
            Tous les contenus présents sur le site de L'Immobilière de Julia (textes, images, logos, vidéos, etc.) sont protégés par les lois sur la propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de L'Immobilière de Julia.
          </Typography>

          <Typography variant="h4" gutterBottom>
            4. Données Personnelles
          </Typography>
          <Typography variant="body1" paragraph>
            L'Immobilière de Julia s'engage à protéger la vie privée de ses clients. Nous collectons et utilisons vos données personnelles conformément à notre politique de confidentialité. Les informations recueillies sont destinées à faciliter vos transactions immobilières et à vous offrir une expérience personnalisée. Vous avez le droit d'accéder, de rectifier et de supprimer vos données personnelles en nous contactant à : privacy@immobilierejulia.fr.
          </Typography>

          <Typography variant="h4" gutterBottom>
            5. Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Le site de L'Immobilière de Julia utilise des cookies pour améliorer la navigation et offrir des services personnalisés. Les cookies sont de petits fichiers stockés sur votre appareil qui nous aident à analyser l'utilisation du site et à vous proposer des contenus adaptés. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut limiter certaines fonctionnalités du site.
          </Typography>

          <Typography variant="h4" gutterBottom>
            6. Responsabilité
          </Typography>
          <Typography variant="body1" paragraph>
            L'Immobilière de Julia s'efforce de fournir sur son site des informations aussi précises que possible. Toutefois, nous ne saurions être tenus responsables des omissions, inexactitudes ou carences dans la mise à jour, qu'elles soient de notre fait ou du fait des tiers partenaires qui nous fournissent ces informations.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LegalNotices;
