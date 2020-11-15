const bcrypt = require('bcrypt'); // Useful to encrypt passwords before saving them in the DB
const models = require('../models');
const jwtUtils = require("../middlewares/jwt");
require('dotenv').config();

// @desc Creates a new user
// @route POST /api/auth/signup
// @access Public
exports.signup = async (req, res, next) => {
    try {
        const existingUser = await models.User.findOne({
            where: { email: req.body.email }
        });
        if (existingUser) {
            res.status(400).json({ error: "Cette adresse email est déjà utilisée" });
        } else {
            bcrypt.hash(req.body.password, 10)
                .then(hash => { // If the hash creation was a success
                    const newUser = models.User.create({
                        email: req.body.email,
                        firstName: req.body.firstName,
                        surname: req.body.surname,
                        password: hash
                    })
                        .then(newUser => {
                            res.status(201).json({
                                message: ` ${newUser.firstName} ${newUser.surname}, votre compte a bien été créé !`
                            })
                        })
                })
                .catch(error => res.status(500).json({ error: error.message }));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// @desc To log in
// @route POST /api/auth/login
// @access Public

exports.login = async (req, res, next) => {
    try {
        const existingUser = await models.User.findOne({
            where: { email: req.body.email }
        });
        if (!existingUser) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        } else {
            bcrypt.compare(req.body.password, existingUser.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // If the user entered the good password
                    res.status(200).json({
                        user: existingUser,
                        token: jwtUtils.generateToken(existingUser),
                        message: `Bienvenue ${existingUser.firstName} !`
                    });
                })
                .catch(error => res.status(500).json({ error: error.message }));
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
