const rateLimit = require('express-rate-limit'); // Useful to limit repeated requests to public APIs and endpoints

exports.allRoutes = rateLimit({
    windowMs: 3 * 60 * 1000, // During 3 minutes
    max: 200,                // 200 requests max
    message: {
        error: 'Vous avez dépassé le nombre de requêtes autorisé. Réessayez dans 3 minutes.'
    }
});

exports.login = rateLimit({
    windowMs: 10 * 60 * 1000, // During 10 minutes
    max: 7,                   // 7 intents max
    message: {
        error: 'Vous avez dépassé le nombre de tentative de connexion autorisé. Réessayez dans 10 minutes.'
    }
});

exports.signup = rateLimit({
    windowMs: 2 * 60 * 1000, // During 2 minutes
    max: 3,                  // 3 requests max
    message: {
        error: 'Vous avez dépassé le nombre d\'inscription autorisé. Réessayez dans 2 minutes.'
    }
});
