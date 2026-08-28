const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const Like = require("../models/like");
const Category = require("../models/category");

class DashboardRepository {

    async getDashboardStats() {

        const totalUsers = await User.count();
        const totalBlogs = await Blog.count();
        const totalComments = await Comment.count();
        const totalLikes = await Like.count();
        const totalCategories = await Category.count();

        return {
            totalUsers,
            totalBlogs,
            totalComments,
            totalLikes,
            totalCategories
        };

    }

}

module.exports = new DashboardRepository();