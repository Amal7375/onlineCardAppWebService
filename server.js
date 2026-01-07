const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const port = 3000;

//This is edited
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const app = express();
app.use(express.json());

// Create a connection pool
const pool = mysql.createPool(dbConfig);

app.get('/allcards', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM card');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error for allcards' });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
