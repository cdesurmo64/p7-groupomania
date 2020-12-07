const models = require('../models');
const jwt = require("../middlewares/jwt");
const fs = require('fs'); // Useful to do operations linked to the file system

// @desc Gets all posts info
// @route GET /api/posts
// @access Private
exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({
        attributes: ['id', 'text', 'imageUrl', "createdAt"],
        order: [
            ['createdAt', 'DESC'],
            [models.Comment, 'createdAt', 'DESC'],
        ],
        include: [
            {
                model: models.User,
                attributes: ['firstName', 'surname', 'id', 'photo']
            },
            {
                model: models.Comment,
                attributes: ['message', 'id', 'createdAt', 'UserId', 'PostId'],
                include: [
                    {
                        model: models.User,
                        attributes: ['firstName', 'surname', 'photo']
                    }
                ]
            },
            {
                model: models.Like,
                attributes: ['UserId']
            }
        ]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
}


// @desc Gets 5 last posts from a user
// @route GET /api/posts/:userId/last
// @access Private
exports.getLastPostsOfUser = (req, res, next) => {
    const userId = req.params.userId;

    models.Post.findAll({
        attributes: ['id', 'text', 'imageUrl', "createdAt"],
        where: { UserId: userId },
        order: [
            ['createdAt', 'DESC'],
            [models.Comment, 'createdAt', 'DESC'],
        ],
        limit: 5,
        include: [
            {
                model: models.User,
                attributes: ['firstName', 'surname', 'id', 'photo']
            },
            {
                model: models.Comment,
                attributes: ['message', 'id', 'createdAt', 'UserId', 'PostId'],
                include: [
                    {
                        model: models.User,
                        attributes: ['firstName', 'surname', 'photo']
                    }
                ]
            },
            {
                model: models.Like,
                attributes: ['UserId']
            }
        ]
    })
        .then(lastPosts => res.status(200).json(lastPosts))
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
}


// @desc Get one post
// @route GET /api/posts/:id
// @access Private
exports.getAPost = (req, res, next) => {
    const postId = req.params.id;

    models.Post.findOne({
        attributes: ['id', 'text', 'imageUrl', "createdAt"],
        where: { id: postId },
        order : [
            [models.Comment, 'createdAt', 'DESC']
        ],
        include: [
            {
                model: models.User,
                attributes: ['firstName', 'surname', 'id', 'photo']
            },
            {
                model: models.Comment,
                attributes: ['message', 'id', 'createdAt', 'UserId', 'PostId'],
                include: [
                    {
                        model: models.User,
                        attributes: ['firstName', 'surname', 'photo']
                    }
                ]
            },
            {
                model: models.Like,
                attributes: ['UserId']
            }
        ]
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, le post n'a pas pu être récupéré" }));
}


// @desc Sets user's opinion on the post (like or 'neutral')
// @route POST /api/posts/:id/like
// @access Private
exports.likePost = (req, res, next) => {
    const userId = jwt.getUserId(req);
    const postId = req.params.id;
    models.Like.findOne({
        where: { UserId: userId, PostId: postId }
    }).then( user => {
        if (!user) {
            models.Like.create({
                UserId: userId,
                PostId: postId
            }).then(() => res.status(201).json({ message: "Votre like a été ajouté" }))
                .catch(error => res.status(500).json({ error: error.message }))
        } else {
            models.Like.destroy({
                where: { UserId: userId, PostId: postId }
            }).then(() => res.status(200).json({ message: "Votre like a été retiré" }))
                .catch(error => res.status(500).json({ error: error.message }))
        }
    }).catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
}


// @desc Add user's comment on the post
// @route POST /api/posts/:id/comment
// @access Private
exports.addComment = (req, res, next) => {
    const userId = jwt.getUserId(req);
    const postId = req.params.id;
    const comment = req.body.comment;
    models.Comment.create({
        UserId: userId,
        PostId: postId,
        message: comment
    }).then(() => res.status(201).json({ message: "Votre commentaire a été publié" }))
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
}


// @desc Updates a comment
// @route PATCH /api/posts/:postId/comment/:commentId
// @access Private + Special Auth
exports.modifyComment = (req, res, next) => {
    const newComment = req.body.text;
    const commentId = req.body.commentId;
    models.Comment.update(
        { message: newComment },
        { where: { id: commentId }}
    )
        .then(() => res.status(200).json({ message: 'Commentaire mis à jour' }))
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
}


// @desc Deletes a comment
// @route DELETE /api/posts/:postId/comment/:commentId
// @access Private + Special Auth
exports.deleteComment = (req, res, next) => {
    models.Comment.destroy({
        where: { id: req.params.commentId }
    })
        .then(() => res.status(200).json({ message: "Le commentaire a été supprimé" }))
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
};


// @desc Creates a post
// @route POST /api/posts
// @access Private
exports.createPost = (req, res, next) => {
    const userId = jwt.getUserId(req);
    const postText = req.body.text;
    let imageUrl;
    if (req.file) { // If an image was sent with the request
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // Generates the URL of the image
    }
    models.Post.create({
        UserId: userId,
        text: postText,
        imageUrl: imageUrl
    }).then((newPost) => {
        res.status(201).json({ newPost, message: "Votre post a été publié" })
    }).catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
}


// @desc Updates a post text
// @route PATCH /api/posts/:id/text/update
// @access Private + Special Auth
exports.modifyPostText = (req, res, next) => {
    const newPostText = req.body.text;
    models.Post.update(
        { text: newPostText },
        { where: { id: req.params.id }}
    )
        .then(() => res.status(200).json({ message: 'Texte du post mis à jour' }))
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
}


// @desc Updates a post picture
// @route PATCH /api/posts/:id/picture/update
// @access Private + Special Auth
exports.modifyPostPicture = (req, res, next) => {
    if (req.file) {
        const newImageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // Generates the URL of the new image

        models.Post.findOne({
            where: { id: req.params.id }
        })
            .then(post => {
                if (post.imageUrl) {
                    const filename = post.imageUrl.split('/images/')[1];
                    fs.unlinkSync(`images/${filename}`) // Deletes the old image file from the server
                }
            })
            .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));

        models.Post.update(
            { imageUrl: newImageUrl },
            { where: { id: req.params.id }}
        )
            .then(() => res.status(200).json({ message: 'Image du post modifiée' }))
            .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
    } else {
     res.status(400).json({ error: "Le fichier envoyé n'est pas conforme" });
    }
}


// @desc Deletes a post picture
// @route PATCH /api/posts/:id/picture/delete
// @access Private + Special Auth
exports.removePostPicture = (req, res, next) => {
    models.Post.findOne({
        where: { id: req.params.id }
    })
        .then(post => {
            if (post.imageUrl) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {// Deletes the image file from the server, and executes the callback once it's done
                    models.Post.update(
                        { imageUrl: null },
                        { where: { id: req.params.id }}
                    )
                        .then(() => res.status(200).json({ message: 'Photo du post supprimée' }))
                        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
                })}
        })
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
};


// @desc Deletes a post
// @route DELETE /api/posts/:id
// @access Private + Special Auth
exports.deletePost = (req, res, next) => {
    models.Post.findOne({
        where: { id: req.params.id }
    })
        .then(post => {
            if (post.imageUrl) {
                // Deletes image file from server
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`)
            }
            models.Post.destroy({
                where: { id: req.params.id }
            })
                .then(() => res.status(200).json({ message: "Le post a été supprimé" }))
                .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
        })
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }));
};
