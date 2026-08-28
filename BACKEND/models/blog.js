console.log("Loading Blog Model...");

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");



const Blog = sequelize.define("Blog", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    timestamps: true
});



module.exports = Blog;