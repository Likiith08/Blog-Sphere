const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/profile", verifyToken, userController.getProfile);

router.put("/profile", verifyToken, userController.updateProfile);

module.exports = router;