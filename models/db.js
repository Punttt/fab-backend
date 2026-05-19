const { pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("error", (err) => {
    console.error("Oväntat fel inträffat: " + err);
    process.exit(-1)
})