const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: { model: User },
        });

        const post = postData.map((data) => data.get({ plain: true }));

        console.log(post);

        res.render('home', { post, loggedIn: req.session.loggedIn })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: { model: User }
        })

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: { model: User },
        });

        const post = postData.get({ plain: true });
        const comment = commentData.map((data) => data.get({ plain: true }));

        console.log(comment);
        console.log(post);

        res.render('post', { comment, post, loggedIn: req.session.loggedIn, userId: req.session.user_id })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;