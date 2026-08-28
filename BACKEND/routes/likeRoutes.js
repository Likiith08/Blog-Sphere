const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const likeController = require("../controllers/likeController");

router.post("/", verifyToken, likeController.likeBlog);
router.delete("/:blogId", verifyToken, likeController.unlikeBlog);
router.get("/:blogId/count", likeController.getLikeCount);
router.get("/:blogId/status", verifyToken, likeController.getLikeStatus);

module.exports = router;