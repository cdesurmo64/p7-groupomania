const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const multer = require('../middlewares/multer-config'); // Handles files sent with HTTP request to our API

const postCtrl = require('../controllers/post');

router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getAPost);
router.post("/:id/like", postCtrl.likePost);
router.post("/:id/comment", postCtrl.addComment);
router.post("/new", multer, postCtrl.createPost);

module.exports = router;
