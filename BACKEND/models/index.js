const User = require("./user");
const Blog = require("./blog");
const Comment = require("./comment");
const Like = require("./like");
const Category = require("./category");

// User ↔ Blog
User.hasMany(Blog, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Blog.belongsTo(User, {
    foreignKey: "userId"
});

// Blog ↔ Comment
Blog.hasMany(Comment, {
    foreignKey: "blogId",
    onDelete: "CASCADE"
});

Comment.belongsTo(Blog, {
    foreignKey: "blogId"
});

// User ↔ Comment
User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});

//likes

// User ↔ Like
User.hasMany(Like, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Like.belongsTo(User, {
    foreignKey: "userId"
});

// Blog ↔ Like
Blog.hasMany(Like, {
    foreignKey: "blogId",
    onDelete: "CASCADE"
});

Like.belongsTo(Blog, {
    foreignKey: "blogId"
});

Category.hasMany(Blog, {
    foreignKey: "categoryId",
    onDelete: "SET NULL"
});

Blog.belongsTo(Category, {
    foreignKey: "categoryId"
});

module.exports = {
    User,
    Blog,
    Comment,
    Like,
    Category
};