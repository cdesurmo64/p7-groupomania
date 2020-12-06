const rateLimit = require('express-rate-limit'); // Useful to limit repeated requests to public APIs and endpoints

exports.allRoutes = rateLimit({
    windowMs: 5 * 60 * 1000, // During 5 minutes
    max: 200,                // 200 requests max
    message: {
        error: 'Vous avez dépassé le nombre de requêtes autorisé. Réessayez dans 5 minutes.'
    }
});

exports.login = rateLimit({
    windowMs: 30 * 60 * 1000, // During 30 minutes
    max: 3,                   // 3 intents max
    message: {
        error: 'Vous avez dépassé le nombre de tentative de connexion autorisé. Réessayez dans 30 minutes.'
    }
});

exports.signup = rateLimit({
    windowMs: 2 * 60 * 1000, // During 2 minutes
    max: 3,                  // 3 requests max
    message: {
        error: 'Vous avez dépassé le nombre d\'inscription autorisé. Réessayez dans 2 minutes.'
    }
});
