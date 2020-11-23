const models = require('../models');
const jwt = require("../middlewares/jwt");

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
        .catch(error => res.status(500).json({ error: error.message }));

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
    }).catch(error => res.status(500).json({ error: error.message }))
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
        .catch(error => res.status(500).json({ error: error.message }))
}
