const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const postCtrl = require('../controllers/post');

router.get("/", postCtrl.getAllPosts);

module.exports = router;
