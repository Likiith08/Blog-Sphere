const commentRepository = require("../repositories/commentRepository");

class CommentService {

    async createComment(userId, commentData) {

        const { blogId, comment } = commentData;

        const newComment = {
            blogId,
            userId,
            comment
        };

        const result = await commentRepository.createComment(newComment);

        return {
            success: true,
            message: "Comment Added Successfully",
            data: result
        };

    }

    async getCommentsByBlog(blogId) {

    const comments = await commentRepository.getCommentsByBlog(blogId);

    return {
        success: true,
        totalComments: comments.length,
        data: comments
    };

}

async updateComment(id, userId, commentData) {

    const existingComment = await commentRepository.getCommentById(id);

    if (!existingComment) {
        return {
            success: false,
            message: "Comment Not Found"
        };
    }

    if (existingComment.userId !== userId) {
        return {
            success: false,
            message: "Unauthorized"
        };
    }

    const updatedComment = await commentRepository.updateComment(
        id,
        commentData.comment
    );

    return {
        success: true,
        message: "Comment Updated Successfully",
        data: updatedComment
    };

}

async deleteComment(id, userId) {

    const existingComment = await commentRepository.getCommentById(id);

    if (!existingComment) {
        return {
            success: false,
            message: "Comment Not Found"
        };
    }

    if (existingComment.userId !== userId) {
        return {
            success: false,
            message: "Unauthorized"
        };
    }

    await commentRepository.deleteComment(id);

    return {
        success: true,
        message: "Comment Deleted Successfully"
    };

}

}

module.exports = new CommentService();