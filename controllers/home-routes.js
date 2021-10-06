const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment}],
        });

        const post = postData.map((data) => data.get({ plain: true }));

        console.log(post);

        res.render('home', { post, loggedIn: req.session.loggedIn })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;