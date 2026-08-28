const Like = require("../models/like");

class LikeRepository {

    async findLike(userId, blogId) {

        return await Like.findOne({
            where: {
                userId,
                blogId
            }
        });

    }

    async createLike(likeData) {

        return await Like.create(likeData);

    }

    async deleteLike(userId, blogId) {

        return await Like.destroy({
            where: {
                userId,
                blogId
            }
        });

    }

    //likecount
    async getLikeCount(blogId) {

    return await Like.count({
        where: {
            blogId
        }
    });

}

}

module.exports = new LikeRepository();