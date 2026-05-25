// Routes 
const express = require("express");
const router = express.Router();
const { createMenu } = require("../controllers/menuController");
const authenticate = require("../middleware/authMiddleware");

// POST 
router.post("/", authenticate, createMenu);

module.exports = router;