const likeService = require("../services/likeService");

class LikeController {

    async likeBlog(req, res) {

        const result = await likeService.likeBlog(
            req.user.id,
            req.body.blogId
        );

        if (!result.success) {

            if (result.message === "Blog Not Found") {
                return res.status(404).json(result);
            }

            return res.status(400).json(result);
        }

        res.status(201).json(result);
    }

    async unlikeBlog(req, res) {

    const result = await likeService.unlikeBlog(
        req.user.id,
        req.params.blogId
    );

    if (!result.success) {
        return res.status(404).json(result);
    }

    res.json(result);

}

//likecount

async getLikeCount(req, res) {

    const result = await likeService.getLikeCount(
        req.params.blogId
    );

    res.json(result);

}

async getLikeStatus(req, res) {

    const result = await likeService.getLikeStatus(
        req.user.id,
        req.params.blogId
    );

    res.json(result);

}

}

module.exports = new LikeController();