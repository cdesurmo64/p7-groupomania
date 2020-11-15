'use strict';
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (user) => {
    return jwt.sign(
        { userId: user.id},
        `${process.env.TOKEN_KEY}`,
        { expiresIn: '12h' }
    );
}
