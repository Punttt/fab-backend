// Databas-queries för users-tabellen

const pool = require('./db');

// Hitta användare via username
async function findUserByUsername(username) {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0];
}

module.exports = {
  findUserByUsername
};