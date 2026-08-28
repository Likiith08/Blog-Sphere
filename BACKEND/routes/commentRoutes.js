const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const commentController = require("../controllers/commentController");

router.post("/", verifyToken, commentController.createComment);
router.get("/blog/:blogId", commentController.getCommentsByBlog);
router.put("/:id", verifyToken, commentController.updateComment);
router.delete("/:id", verifyToken, commentController.deleteComment);


router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Comment Routes Working"
    });

});

module.exports = router;