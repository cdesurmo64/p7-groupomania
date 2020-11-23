const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const postCtrl = require('../controllers/post');

router.get("/", postCtrl.getAllPosts);
router.post("/:id/like", postCtrl.likePost);
router.post("/:id/comment", postCtrl.addComment);

module.exports = router;
