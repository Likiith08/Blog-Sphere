const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.post("/", verifyToken, categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:categoryId/blogs", categoryController.getBlogsByCategory);

module.exports = router;