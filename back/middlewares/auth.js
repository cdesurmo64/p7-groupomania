const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkTokenValidity = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new Error(`L'authentification a échoué, vous allez être redirigé vers la page de connexion`);
            } else {
                next();
            }
        } else {
            throw new Error(`L'authentification a échoué, vous allez être redirigé vers la page de connexion`);
        }
    } catch(error) {
        res.status(403).json({ error: error.message });
    }
}


exports.checkSpecialAuthorization = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error(`Vous n'êtes pas autorisé à réaliser cette action`);
        } else {
            next();
        }
    } catch(error) {
        res.status(403).json({ error: error.message });
    }
};
