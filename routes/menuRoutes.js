// Routes 
const express = require("express");
const router = express.Router();
const { 
    createMenu,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    getMenu
} = require("../controllers/menuController");
const authenticate = require("../middleware/authMiddleware");

// GET
router.get("/:year/:week", getMenu);

// Menyrätter
router.post("/", authenticate, createMenu);
router.post("/item", authenticate, addMenuItem);
router.put("/item/:id", authenticate, editMenuItem);
router.delete("/item/:id", authenticate, deleteMenuItem);

module.exports = router;