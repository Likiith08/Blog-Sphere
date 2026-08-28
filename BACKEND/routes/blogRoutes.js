const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const blogController = require("../controllers/blogController");
const upload = require("../middleware/uploadMiddleware");

router.get("/", blogController.getAllBlogs);
router.get("/search", blogController.searchBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/", verifyToken, blogController.createBlog);
router.put("/:id", verifyToken, blogController.updateBlog);
router.delete("/:id", verifyToken, blogController.deleteBlog);



router.post(
    "/upload",
    upload.single("blogImage"),
    (req, res) => {
        res.json({
            success: true,
            image: req.file.filename
        });
    }
);

module.exports = router;