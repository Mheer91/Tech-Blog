const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 150],
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    },
)

module.exports = Comment;