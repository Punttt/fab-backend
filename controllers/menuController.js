// logik för veckymeny

const menuModel = require("../models/menuModel");

// Skapar en ny veckomenu 
const createMenu = async (req, res) => {
    try {
        const { week_number, year } = req.body;

        // Validerar att fälten finns.
        if (!week_number || !year) {
            return res.status(400).json({
                error: "Vecka och år krävs"
            });
        }

        // Valdierar att veckanummer är inom 1-52
        if (week_number < 1 || week_number > 52) {
            return res.status(400).json({
                error: "Vecka måste vara mellan 1-52"
            });
        }

        // Validerar för att kontrllera att veckan inte finns i db
        const existing = await menuModel.findWeekMenu(week_number, year)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Kunde inte skapa veckomeny" });
    }
}