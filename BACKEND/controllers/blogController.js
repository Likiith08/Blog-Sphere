const blogService = require("../services/blogService");

class BlogController {

    async createBlog(req, res) {

        try {

            const result = await blogService.createBlog(
                req.user.id,
                req.body
            );

            res.status(201).json(result);

        } catch (err) {

            console.error(err);

            res.status(500).json({
                message: err.message,
                sqlMessage: err.parent?.sqlMessage,
                sql: err.parent?.sql
            });

        }

    }

    async getAllBlogs(req, res) {

        try {

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;

            const result = await blogService.getAllBlogs(page, limit);

            res.json(result);

        } catch (err) {

            console.log("\n========== BLOG ERROR ==========");

            console.log("Message:");
            console.log(err.message);

            console.log("\nSQL Message:");
            console.log(err.parent?.sqlMessage);

            console.log("\nSQL:");
            console.log(err.parent?.sql);

            console.log("\nFull Error:");
            console.log(err);

            res.status(500).json({
                message: err.message,
                sqlMessage: err.parent?.sqlMessage
            });

        }

    }

    async getBlogById(req, res) {

        try {

            const result = await blogService.getBlogById(req.params.id);

            if (!result.success) {
                return res.status(404).json(result);
            }

            res.json(result);

        } catch (err) {

            console.error(err);

            res.status(500).json({
                message: err.message,
                sqlMessage: err.parent?.sqlMessage
            });

        }

    }

    async updateBlog(req, res) {

        try {

            const result = await blogService.updateBlog(
                req.params.id,
                req.user.id,
                req.body
            );

            if (!result.success) {

                if (result.message === "Blog Not Found") {
                    return res.status(404).json(result);
                }

                return res.status(403).json(result);

            }

            res.json(result);

        } catch (err) {

            console.error(err);

            res.status(500).json({
                message: err.message,
                sqlMessage: err.parent?.sqlMessage
            });

        }

    }

    async deleteBlog(req, res) {

        try {

            const result = await blogService.deleteBlog(
                req.params.id,
                req.user.id
            );

            if (!result.success) {

                if (result.message === "Blog Not Found") {
                    return res.status(404).json(result);
                }

                return res.status(403).json(result);

            }

            res.json(result);

        } catch (err) {

            console.error(err);

            res.status(500).json({
                message: err.message,
                sqlMessage: err.parent?.sqlMessage
            });

        }

    }

    async searchBlogs(req, res) {

        try {

            const result = await blogService.searchBlogs(
                req.query.keyword
            );

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.json(result);

        } catch (err) {

            console.error(err);

            res.status(500).json({
                message: err.message,
                sqlMessage: err.parent?.sqlMessage
            });

        }

    }

}

module.exports = new BlogController();