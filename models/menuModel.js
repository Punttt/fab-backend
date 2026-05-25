
const pool = require('./db');

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