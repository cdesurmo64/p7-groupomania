const bcrypt = require('bcrypt'); // Useful to encrypt passwords before saving them in the DB
const fs = require('fs'); // Useful to do operations linked to the file system
const models = require('../models');
const jwtUtils = require("../middlewares/jwt");
require('dotenv').config();

// @desc Creates a new user
// @route POST /api/user/signup
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
                        .catch(error => res.status(400).json({ error: error.message })); // Catches the error sent by the User model validation process
                })
                .catch(error => res.status(500).json({ error: error.message }));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// @desc To log in
// @route POST /api/user/login
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


// @desc Gets one specified user info
// @route GET /api/user/:id
// @access Private
exports.getOneUser = (req, res, next) => {
    models.User.findOne({
        where: { id: req.params.id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error: error.message }));
};


// @desc Deletes one specified user
// @route GET /api/user/:id
// @access Private
exports.deleteUser = (req, res, next) => {
    models.User.findOne({
        where: { id: req.params.id }
    })
        .then(user => {
            if (user.photo) {
                // Deletes image file from server
                const filename = user.photo.split('/images/')[1];
                fs.unlink(`images/${filename}`)
            }
            models.User.destroy({
                where: { id: req.params.id }
            })
                .then(() => res.status(200).json({ message: "Le compte a été supprimé" }))
                .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
        })
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
};
