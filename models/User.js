const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPasswordL(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 2,
            },
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    },
)

module.exports = User;