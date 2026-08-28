const Blog = require("../models/blog");
const User = require("../models/user");
const Category = require("../models/category");
const { Op, Sequelize } = require("sequelize");

class BlogRepository {

    async createBlog(blogData) {
        return await Blog.create(blogData);
    }

    async getAllBlogs(page = 1, limit = 5) {

        const offset = (page - 1) * limit;

        const { count, rows } = await Blog.findAndCountAll({

            include: [
                {
                    model: User,
                    attributes: ["id", "username", "email"]
                },
                {
                    model: Category,
                    attributes: ["id", "name"]
                }
            ],

            attributes: {
                include: [

                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Likes
                            WHERE Likes.blogId = Blog.id
                        )`),
                        "likeCount"
                    ],

                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Comments
                            WHERE Comments.blogId = Blog.id
                        )`),
                        "commentCount"
                    ]

                ]
            },

            order: [["createdAt", "DESC"]],

            limit,
            offset

        });

        return {
            totalBlogs: count,
            blogs: rows
        };

    }

    async getBlogById(id) {

        return await Blog.findByPk(id, {

            include: [
                {
                    model: User,
                    attributes: ["id", "username", "email"]
                },
                {
                    model: Category,
                    attributes: ["id", "name"]
                }
            ]

        });

    }

    async updateBlog(id, blogData) {

        await Blog.update(blogData, {
            where: { id }
        });

        return await Blog.findByPk(id, {

            include: [
                {
                    model: User,
                    attributes: ["id", "username", "email"]
                },
                {
                    model: Category,
                    attributes: ["id", "name"]
                }
            ]

        });

    }

    async deleteBlog(id) {

        return await Blog.destroy({
            where: { id }
        });

    }

    async searchBlogs(keyword) {

        return await Blog.findAll({

            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${keyword}%`
                        }
                    },
                    {
                        content: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                ]
            },

            include: [
                {
                    model: User,
                    attributes: ["id", "username"]
                },
                {
                    model: Category,
                    attributes: ["id", "name"]
                }
            ],

            order: [["createdAt", "DESC"]]

        });

    }

}

module.exports = new BlogRepository();