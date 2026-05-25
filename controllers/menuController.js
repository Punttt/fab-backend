// logik för veckymeny

const menuModel = require("../models/menuModel");

// Skapar en ny veckomenu 
const createMenu = async (requestAnimationFrame, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Kunde inte skapa veckomeny" });
    }
}