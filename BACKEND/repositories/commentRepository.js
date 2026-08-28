const Comment = require("../models/comment");
const User = require("../models/user");

class CommentRepository {

    async createComment(commentData) {
        return await Comment.create(commentData);
    }

    async updateComment(id, comment) {

    await Comment.update(
        { comment },
        {
            where: { id }
        }
    );

    return await Comment.findByPk(id);

}

    async getCommentsByBlog(blogId) {

    return await Comment.findAll({
        where: {
            blogId
        },
        include: [
            {
                model: User,
                attributes: ["id", "username"]
            }
        ],
        order: [["createdAt", "DESC"]]
    });

}

async getCommentById(id) {
    return await Comment.findByPk(id);
}


//delete

async deleteComment(id) {

    return await Comment.destroy({
        where: { id }
    });

}



}



module.exports = new CommentRepository();