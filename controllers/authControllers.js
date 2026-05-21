const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Logga in som användare
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kontrollerar att fälten finns
        if (!username || !password) {
            return res.status(400).json({ 
                error: "Både användarnamn och lösenord krävs" 
            });
        }

        // Hitta användaren i databasen
        const user = await userModel.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ 
                error: "Fel användarnamn eller lösenord" 
            });
        }

        // Jämför inputlösenordet mot det hashade lösenordet i databasen
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ 
                error: "Fel användarnamn eller lösenord" 
            });
        }

        // Skapa JWT-token
        const token = jwt.sign(
            { 
                userId: user.id, 
                username: user.username, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Skickar tillbaka token till klienten
        res.status(200).json({
            message: "Inloggning lyckades",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internt serverproblem" });
    }
};

module.exports = { login };