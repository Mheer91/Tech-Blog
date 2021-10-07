const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: { model: User },
        });

        const post = postData.map((data) => data.get({ plain: true }));

        console.log(post);

        res.render('home', { post, loggedIn: req.session.loggedIn, userId: req.session.user_id  })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: { model: User }
        });

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

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Post}, { model: Comment}]
        });

        const user = userData.get({ plain: true });

        console.log(user)

        res.render('dashboard', { user, loggedIn: req.session.loggedIn, userId: req.session.user_id })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Post }, { model: Comment }]
        });

        const user = userData.get({ plain: true });

        console.log(user)

        res.render('dashboard', { user, loggedIn: req.session.loggedIn, userId: req.session.user_id  })
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    }
    res.render('login', { loggedIn: req.session.loggedIn });
});

module.exports = router;