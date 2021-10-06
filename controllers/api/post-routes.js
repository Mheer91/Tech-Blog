const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {

    try {
        const allPosts = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });

        res.status(200).json(allPosts);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

router.get('/:id', async (req, res) => {

    try {
        const singlePost = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });

        res.status(200).json(singlePost);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

router.post('/', (req, res) => {

    Post.create(req.body)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json(err));

});

router.put('/:id', (req, res) => {

    Post.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json(err));

});

router.delete('/:id', (req, res) => {

    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json(err));

});

module.exports = router;