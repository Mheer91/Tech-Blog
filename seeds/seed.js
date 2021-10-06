const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');
const seedComments = require('../seeds/commentSeed.json');
const seedUsers = require('../seeds/userSeed.json');
const seedPosts = require('../seeds/postSeed.json');

const seedDb = async () => {
    await sequelize.sync({ force: true });

    console.log('\n----- DATABASE SYNCED -----\n');

    await User.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    });

    console.log('\n----- USERS SYNCED -----\n');

    await Post.bulkCreate(seedPosts);

    console.log('\n----- POSTS SYNCED -----\n');

    await Comment.bulkCreate(seedComments);

    console.log('\n----- COMMENTS SYNCED -----\n');

    process.exit(0);

};

seedDb();