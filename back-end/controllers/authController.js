const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    // Authentification simplifiée
    // Logique pour vérifier les identifiants et générer un JWT
};

exports.register = async (req, res) => {
    // Inscription de nouveaux utilisateurs
};

exports.logout = async (req, res) => {
    // Déconnecter l'utilisateur
};
