const commentService = require("../services/commentService");

class CommentController {

    async createComment(req, res) {

        const result = await commentService.createComment(
            req.user.id,
            req.body
        );

        res.status(201).json(result);
    }

    async getCommentsByBlog(req, res) {

        const result = await commentService.getCommentsByBlog(
            req.params.blogId
        );

        res.json(result);
    }

    async updateComment(req, res) {

        const result = await commentService.updateComment(
            req.params.id,
            req.user.id,
            req.body
        );

        if (!result.success) {

            if (result.message === "Comment Not Found") {
                return res.status(404).json(result);
            }

            return res.status(403).json(result);
        }

        res.json(result);
    }

    async deleteComment(req, res) {

        const result = await commentService.deleteComment(
            req.params.id,
            req.user.id
        );

        if (!result.success) {

            if (result.message === "Comment Not Found") {
                return res.status(404).json(result);
            }

            return res.status(403).json(result);
        }

        res.json(result);
    }

}

module.exports = new CommentController();