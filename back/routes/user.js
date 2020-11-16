const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const userCtrl = require('../controllers/user');
const verifyPasswordStrength = require('../middlewares/verify-password-strength');
const rateLimiters = require('../middlewares/rate-limiters'); // Verifies if the max number of requests intents was reached

router.post('/signup', rateLimiters.signup, verifyPasswordStrength, userCtrl.signup);
router.post('/login', rateLimiters.login, userCtrl.login);

module.exports = router; // Exports User router
