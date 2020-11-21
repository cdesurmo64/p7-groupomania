const models = require('../models');

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
