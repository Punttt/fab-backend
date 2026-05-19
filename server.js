const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./models/db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(ecpress.json());

// Startar servern
app.listen(PORT, ()=> {
    console.log(`restaurang-API kör på http://localhost:${PORT}`);
});