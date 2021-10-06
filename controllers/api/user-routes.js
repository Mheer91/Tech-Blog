const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {

    try {
        const allUsers = await User.findAll({
            include: [{ model: Comment }, { model: Post }],
        });

        res.status(200).json(allUsers);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const singleUser = await User.findByPk(req.params.id, {
            include: [{ model: Comment }, { model: Post }]
        });

        res.status(200).json(singleUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {

    User.create(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));

});

router.put('/:id', (req, res) => {

    User.update(req.body, {
        where: {
            id: req.params.id,
        },
        individualHooks: true
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {

    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((deletedUser) => res.status(200).json(deletedUser))
    .catch((err) => res.status(400).json(err));
});

router.post('/login', async (req, res) => {
    try {
        const userInfoCheck = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        console.log(userInfoCheck)
        console.log(req.body)

        if (!userInfoCheck) {
            res.status(400).json({ message: "Some or all of the information entered is incorrect. Please try again!" });
            return;
        }

        const userPasswordCheck = userInfoCheck.checkPassword(req.body.password);

        console.log(userPasswordCheck)

        if (!userPasswordCheck) {
            res.status(400).json({ message: "Some or all of the information entered is incorrect. Please try again!" });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userInfoCheck.id;
            req.session.username = userInfoCheck.username;
            res.status(200).json({ message: "Welcome!" })
        })

    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).json({ message: "You have successfully logged out!" });
        });
    }
    else {
        res.status(404).json({ message: "Error logging out. Please try again!" });
    }
});

module.exports = router;