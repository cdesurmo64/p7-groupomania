const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const userCtrl = require('../controllers/user');

const checkAuthInputs = require('../middlewares/checkAuthInputs');
// const loginRateLimiter = require('../middleware/rate-limit-configs/login-rate-limit-config'); // Verifies if the max number of login intents was reached (3 in 30min)
// const signupRateLimiter = require('../middleware/rate-limit-configs/signup-rate-limit-config'); // Verifies if the max number of signup intents was reached (3 in 2min)

// router.post('/signup', verifyPassword, signupRateLimiter, userCtrl.signup);
// router.post('/login', loginRateLimiter, userCtrl.login);

router.post('/signup', checkAuthInputs.password, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router; // Exports User router
