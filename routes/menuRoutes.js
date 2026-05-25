// Routes 
const express = require("express");
const router = express.Router();
const { 
    createMenu,
    addMenuItem,
    editMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");
const authenticate = require("../middleware/authMiddleware");

// POST 
router.post("/", authenticate, createMenu);

// Menyrätter
router.post("/item", authenticate, addMenuItem);
router.put("/item/:id", authenticate, editMenuItem);
router.delete("/item/:id", authenticate, deleteMenuItem);

module.exports = router;