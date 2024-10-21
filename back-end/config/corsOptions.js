const corsOptions = {
    origin: 'https://ton-domaine.com', // Remplacer par ton domaine
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

module.exports = corsOptions;
