const express = require('express');  // Useful to create Express applications
const bodyParser = require('body-parser'); // Useful to transform requests body to JSON (ie usable JS objets)
const path = require('path'); // Useful to get the path to our server files system

const rateLimiters = require('./middlewares/rate-limiters'); // Verifies if the max number of requests intents was reached

const userRoutes = require('./routes/user'); // Imports user router
const postRoutes = require('./routes/post'); // Imports post router

const app = express();

// Database connection
const { sequelize } = require('./models/index');

// Configures specific response object headers to avoid CORS errors (middleware applied to all routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Gives access to all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //  In response to a preflight request, indicates which HTTP headers can be used during the actual request
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allows to use these methods when accessing the resource in response to a preflight request
    next();
});

// Middlewares applied to all routes
app.use(bodyParser.json());
app.use(rateLimiters.allRoutes);

app.use('/images', express.static(path.join(__dirname, 'images'))); // Adds this router manager to requests made to /images, which tells Express to serve the folder images

app.use('/api/user', userRoutes); // To register the user router for all requests made to /api/auth
app.use('/api/posts', postRoutes); // To register the post router for all requests made to /api/posts


// Test database connection
const testDatabaseConnection = async function () {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la BDD réussie !');
    } catch (error) {
        console.error('Impossible de se connection à la BDD', error);
    }
};
testDatabaseConnection();

module.exports = app;
