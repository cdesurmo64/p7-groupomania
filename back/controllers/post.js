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
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: models.User,
                attributes: ['firstName', 'surname', 'id', 'photo']
            },
            {
                model: models.Comment,
                attributes: ['message', 'id', 'createdAt', 'UserId'],
                order: [
                    ['createdAt', 'DESC']
                ],
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

// @desc Get one post
// @route GET /api/posts/:id
// @access Private
exports.getAPost = (req, res, next) => {
    const postId = req.params.id;

    models.Post.findOne({
        attributes: ['id', 'text', 'imageUrl', "createdAt"],
        where: { id: postId },
        include: [
            {
                model: models.User,
                attributes: ['firstName', 'surname', 'id', 'photo']
            },
            {
                model: models.Comment,
                attributes: ['message', 'id', 'createdAt', 'UserId'],
                order: [
                    ['createdAt', 'DESC']
                ],
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
exports.likePost = async (req, res, next) => {
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
exports.addComment = async (req, res, next) => {
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


// @desc Add user's comment on the post
// @route POST /api/posts/:id/comment
// @access Private
exports.createPost = async (req, res, next) => {
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
    })
        .catch(error => res.status(500).json({ error: "Problème de communication avec le serveur, veuillez réessayer et nous contacter si cela arrive de nouveau" }))
}

