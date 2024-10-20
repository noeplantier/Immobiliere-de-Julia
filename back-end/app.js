const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const corsOptions = require('./config/corsOptions');
const securityHeaders = require('./config/securityHeaders');
const rateLimiter = require('./config/rateLimiter');
const authRoutes = require('./routes/authRoutes');

const app = express();
require('./config/env');

// Middleware et configurations
app.use(express.json());
app.use(cors(corsOptions));
app.use(securityHeaders);
app.use(rateLimiter);

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
