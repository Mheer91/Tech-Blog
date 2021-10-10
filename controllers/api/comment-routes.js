const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {

    try {
        const allComments = await Comment.findAll({
            include: [{ model: Post }, { model: User }],
        });

        res.status(200).json(allComments);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

router.get('/:id', async (req, res) => {

    try {
        const singleComment = await Comment.findByPk(req.params.id, {
            include: [{ model: Post }, { model: User }]
        });

        res.status(200).json(singleComment);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

router.post('/', withAuth, (req, res) => {

    Comment.create({
        comment_body: req.body.comment_body,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    })
        .then((comment) => res.status(200).json(comment))
        .catch((err) => res.status(400).json(err));

});

router.put('/:id', (req, res) => {

    Comment.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((comment) => res.status(200).json(comment))
        .catch((err) => res.status(400).json(err));

});

router.delete('/:id', (req, res) => {

    Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((comment) => res.status(200).json(comment))
        .catch((err) => res.status(400).json(err));

});

module.exports = router;