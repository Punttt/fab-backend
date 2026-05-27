
const pool = require('./db');

// VECKOMENY
// Skapar ny veckomeny
async function createWeeklyMenu(weekNumber, year, createdBy) {
    const result = await pool.query(
        `INSERT INTO weekly_menus (week_number, year, created_by)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [weekNumber, year, createdBy]
    );

    return result.rows[0];
}

// Hitta befintlig veckomeny via vecka och år
async function findWeekMenu(weekNumber, year) {
    const result = await pool.query(
        `SELECT * FROM weekly_menus WHERE week_number = $1 AND year = $2`,
        [weekNumber, year]
    );

    return result.rows[0];
}

// Hämtar en veckomeny med alla rätter för måndag - fredag.
async function getWeeklyMenuItems(weekNumber, year) {
    // Hämtar veckomenyn
    const menuResult = await pool.query(
        `SELECT * FROM weekly_menus WHERE week_number = $1 AND year = $2`,
        [weekNumber, year]
    );

    const menu = menuResult.rows[0];

    // validering om veckan inte finns, returnerar null
    if(!menu) {
        return null;
    }

    // Hämta alla rätter för den veckan
    const itemsResult = await pool.query(
        `SELECT id, day_of_week, dish
        FROM menu_items
        WHERE weekly_menu_id = $1`,
        [menu.id]
    );

    // Sätter ihop till ett objekt
    return {
        id: menu.id,
        week_number: menu.week_number,
        year: menu.year,
        items: itemsResult.rows
    };
}

// DAILYRÄTT
// Skapa en menyrätt för en specifik dag
async function createMenuItem(weeklyMenuId, dayOfWeek, dish) {
    const result = await pool.query(
        `INSERT INTO menu_items (weekly_menu_id, day_of_week, dish)
        VALUES($1, $2, $3)
        RETURNING *`,
        [weeklyMenuId, dayOfWeek, dish]
    );
    return result.rows[0];
}

// uppdatera en menyrätt
async function updateMenuItem(id, dish) {
    const result = await pool.query(
        `UPDATE menu_items
        SET dish = $1
        WHERE id = $2
        RETURNING *`,
        [dish, id]
    );
    return result.rows[0];
}

// radera menyrätt
async function deleteMenuItem(id) {
    const result = await pool.query(
        `DELETE FROM menu_items
        WHERE id = $1
        RETURNING *`,
        [id]
    );
    return result.rows[0];
}

module.exports = {
    createWeeklyMenu,
    findWeekMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getWeeklyMenuItems
}