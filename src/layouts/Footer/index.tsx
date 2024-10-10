import * as React from 'react';
import {
  Link,
  Typography,
  Box,
  IconButton,
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
        width: '210vh',
        height: '40vh',
        backgroundImage: 'url(https://img.freepik.com/photos-gratuite/fond-texture-abstrait_1258-30515.jpg?t=st=1728417372~exp=1728420972~hmac=39d9479bb00c90e5addffb345d015ac654323012c22582f5891034d990b35a09&w=740)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
