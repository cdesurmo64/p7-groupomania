const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth'); // Protects routes by verifying token
const verifyPasswordStrength = require('../middlewares/verify-password-strength');
const rateLimiters = require('../middlewares/rate-limiters'); // Verifies if the max number of requests intents was reached
const multer = require('../middlewares/multer-config'); // Handles files sent with HTTP request to our API

router.post('/signup', rateLimiters.signup, verifyPasswordStrength, userCtrl.signup);
router.post('/login', rateLimiters.login, userCtrl.login);
router.get('/:id', auth.checkTokenValidity, userCtrl.getOneUser);
router.patch('/:id/update/picture', multer, auth.checkTokenValidity, auth.checkSpecialAuthorization, userCtrl.modifyProfilePicture);
router.patch('/:id/update/bio', auth.checkTokenValidity, auth.checkSpecialAuthorization, userCtrl.modifyProfileBio);
router.delete('/:id', auth.checkTokenValidity, auth.checkSpecialAuthorization, userCtrl.deleteUser);

module.exports = router; // Exports User router
