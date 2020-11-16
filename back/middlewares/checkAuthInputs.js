const passwordValidator = require('password-validator'); // Useful to create a complex schema for passwords

exports.password = (req, res, next) => {
    const passwordSchema = new passwordValidator(); // Creates a schema
    // Adds properties to it to define a strong password schema
    passwordSchema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                                   // Must have at least one uppercase letter
        .has().lowercase()                                   // Must have at least one lowercase letter
        .has().digits()                                      // Must have at least one digit
        .has().not().spaces()                                // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    if (!passwordSchema.validate(req.body.password)) { // If the entered password does not respect the passwordSchema
        res.status(400).json({ error: 'Le mot de passe choisi n\'est pas assez fort ! Veuillez respecter les règles suivantes : ' + passwordSchema.validate(req.body.password, {list: true}) });
    } else { // If the entered password respects the passwordSchema
        next();
    }
};
