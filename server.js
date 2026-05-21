const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Importerar routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get('/api/health', async (req, res) => {
  try {
    // Försök en simpel query mot databasen
    const result = await pool.query('SELECT NOW() AS server_time');
    
    res.json({
      status: 'ok',
      message: 'fab API kör och databas är ansluten',
      database_time: result.rows[0].server_time,
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    console.error('Databas-fel:', err);
    res.status(500).json({
      status: 'error',
      message: 'Kunde inte ansluta till databasen',
      error: err.message
    });
  }
});


// Startar servern
app.listen(PORT, ()=> {
    console.log(`restaurang-API kör på http://localhost:${PORT}`);
});