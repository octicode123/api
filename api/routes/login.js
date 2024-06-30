// In api/routes/login.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aProjet'
};

router.post('/', async (req, res, next) => {
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);

  const { email, password } = req.body;

  try {
    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Query to check if the user exists
    const [rows] = await connection.execute(
      'SELECT * FROM login_admin WHERE email = ? AND password = ?',
      [email, password]
    );

    // Close the database connection
    await connection.end();

    if (rows.length > 0) {
      // User found
      res.status(200).json({
        message: 'Login successful!',
        user: { email: rows[0].email }
      });
    } else {
      // User not found
      res.status(401).json({
        message: 'Invalid credentials. Please try again.'
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      message: 'An error occurred during login. Please try again.'
    });
  }
});

module.exports = router;