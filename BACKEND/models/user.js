const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        profileImage: {
            type: DataTypes.STRING,
            defaultValue: "default.png",
        },

        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        role: {
            type: DataTypes.ENUM("USER", "ADMIN"),
            defaultValue: "USER",
        },
    },
    {
        timestamps: true,
    }
);


module.exports = User;