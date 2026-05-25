
const pool = require('./db');

// Skapar ny veckomeny
async function createWeeklyMenu(weekNumber, year, createdBy) {
    const result = await pool.query(
        `INSERT INTO weekly_menus (week_number, year, created_by)
        VALUES ($1, $2, $3)
        RETURNING *`
        [weekNumber, year, createdBy]
    );

    return result.rows[0];
}