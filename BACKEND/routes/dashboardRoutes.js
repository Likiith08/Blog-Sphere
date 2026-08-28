const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

router.get("/", verifyToken, dashboardController.getDashboardStats);

module.exports = router;