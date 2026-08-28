const likeRepository = require("../repositories/likeRepository");
const Blog = require("../models/blog");

class LikeService {

    async likeBlog(userId, blogId) {

        // Check if blog exists
        const blog = await Blog.findByPk(blogId);

        if (!blog) {
            return {
                success: false,
                message: "Blog Not Found"
            };
        }

        // Check if already liked
        const existingLike = await likeRepository.findLike(userId, blogId);

        if (existingLike) {
            return {
                success: false,
                message: "Blog Already Liked"
            };
        }

        await likeRepository.createLike({
            userId,
            blogId
        });

        return {
            success: true,
            message: "Blog Liked Successfully"
        };

    }
    
    async unlikeBlog(userId, blogId) {

    const existingLike = await likeRepository.findLike(userId, blogId);

    if (!existingLike) {
        return {
            success: false,
            message: "Like Not Found"
        };
    }

    await likeRepository.deleteLike(userId, blogId);

    return {
        success: true,
        message: "Blog Unliked Successfully"
    };

}

//likecount

async getLikeCount(blogId) {

    const count = await likeRepository.getLikeCount(blogId);

    return {
        success: true,
        likes: count
    };

}

async getLikeStatus(userId, blogId) {

    const like = await likeRepository.findLike(userId, blogId);

    return {
        success: true,
        liked: !!like
    };

}

}

module.exports = new LikeService();