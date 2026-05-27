// logik för veckymeny

const menuModel = require("../models/menuModel");

// Hämta en veckomeny med rätter
const getMenu = async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Kunde inte hämta veckomenyn"
        });
    }
}

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
        const existing = await menuModel.findWeekMenu(week_number, year);
        if(existing) {
            return res.status(409).json({
                error: "Det finns redan en meny registrerad för denna vecka"
            });
        }

        // User ID jw token
        const createdBy = req.user.uderId;

        // Skapa veckomenyn
        const newMenu = await menuModel.createWeeklyMenu(week_number, year, createdBy);

        res.status(201).json({
            message: "Veckomeny skapad",
            menu: newMenu
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Kunde inte skapa veckomeny" });
    }
}

// Skapar / lägger till en rätt för en dag
const addMenuItem = async (req, res) => {
    try {
        const { weekly_menu_id, day_of_week, dish } = req.body;

        // Validering
        if (!weekly_menu_id || !day_of_week || !dish) {
            return res.status(400).json({
                error: "weekly_menu_id, day_of_week och dish krävs"
            });
        }

        const newItem = await menuModel.createMenuItem(weekly_menu_id, day_of_week, dish);

        res.status(201).json({
            message: "Rätt tillagd",
            item: newItem
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Kunde inte lägga till rätten" })
    }
}

// Uppdaterar befintlig rätt
const editMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { dish } = req.body;

        if(!dish) {
            return res.status(400).json({ error: "dish krävs" });
        }

        const updatedItem = await menuModel.updateMenuItem(id, dish);

        // Om inget uppdaterades finns inte raden
        if(!updatedItem) {
            return res.status(404).json({ error: "Rätten hittades inte" })
        }

        res.status(200).json({
            message: "Rätt uppdaterad",
            item: updatedItem
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Kunde inte uppdatera rätten" });
    }
}

// raderar befintlig rätt
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedItem = await menuModel.deleteMenuItem(id);

        if(!deletedItem) {
            return res.status(404).json({ error: "Rätten hittades inte" });
        }

        res.status(200).json({
            message: "Rätten raderad",
            item: deletedItem
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Kunde inte radera rätten" });
    }
}

module.exports = { 
    createMenu,
    addMenuItem,
    editMenuItem,
    deleteMenuItem
 };