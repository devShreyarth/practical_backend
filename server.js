// Import dependencies
const express = require('express');
const mysql = require('mysql2');

// Create an Express app
const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',       // MySQL server host
  user: 'root',            // MySQL username (default: 'root')
  password: '',            // MySQL password (default is empty for XAMPP)
  database: 'exam',     // The name of your database
});

// Test the connection to MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL server as ID ' + connection.threadId);
});

// Sample route to get data from MySQL
app.get('/data', (req, res) => {
  pool.query('SELECT * FROM papers', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});