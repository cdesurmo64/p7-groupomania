const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
            userRole: user.role
        },
        `${process.env.TOKEN_KEY}`,
        { expiresIn: '12h' }
    );
}


exports.getUserId = (req) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = decodedToken.userId;
        return userId;
    } catch (error) {
        throw new Error(` La récupération de l'ID a échoué, veuillez vous reconnecter !`);
    }
}
