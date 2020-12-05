const express = require('express'); // Useful to create a router
const router = express.Router(); // Creates router

const multer = require('../middlewares/multer-config'); // Handles files sent with HTTP request to our API
const auth = require('../middlewares/auth'); // Protects routes by verifying token

const postCtrl = require('../controllers/post');

router.get("/", auth.checkTokenValidity, postCtrl.getAllPosts);
router.get("/:id", auth.checkTokenValidity, postCtrl.getAPost);
router.post("/new", multer, auth.checkTokenValidity, postCtrl.createPost);
router.patch("/:id/text", auth.checkTokenValidity, auth.checkSpecialAuthorization, postCtrl.modifyPostText);
router.patch("/:id/picture", multer, auth.checkTokenValidity, auth.checkSpecialAuthorization, postCtrl.modifyPostPicture);
router.delete("/:id", auth.checkTokenValidity, auth.checkSpecialAuthorization, postCtrl.deletePost);
router.post("/:id/like", auth.checkTokenValidity, postCtrl.likePost);
router.post("/:id/comment", auth.checkTokenValidity, postCtrl.addComment);
router.patch("/:postId/comment/:commentId", auth.checkTokenValidity, auth.checkSpecialAuthorization, postCtrl.modifyComment);
router.delete("/:postId/comment/:commentId", auth.checkTokenValidity, auth.checkSpecialAuthorization, postCtrl.deleteComment);

module.exports = router;
