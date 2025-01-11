import mysql from "mysql2";

// Create a MySQL connection pool
const connection = mysql.createConnection({
    host: 'localhost',       // MySQL server host
    user: 'root',            // MySQL username (default: 'root')
    password: '',            // MySQL password (default is empty for XAMPP)
    database: 'exam',     // The name of your database
  });
  
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to the database as id " + connection.threadId);
  });
  
  export default connection;