import jwt from 'jsonwebtoken';

import bcrypt from'bcrypt';

import connection from '../db/connection.js';


const queryPromise = (query, params) => {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (err, results) => {
        if (err) {
          reject(err);  // Reject the promise if there's an error
        } else {
          resolve(results);  // Resolve the promise if successful
        }
      });
    });
  };
export const login = async (req, res) => {


    try {
      const { enrollment_no, password } = req.body;
  
      console.log('data',req.body);
      
  
      if (!enrollment_no || !password) {
        return res.status(400).json({ message: 'Enrollment number and password are required' });
      }
  
     
  
      // Query the database to find the student by enrollment number
      const rows = await queryPromise(
        'SELECT id, password,name,paper_set FROM students WHERE enrollment_no = ?',
        [enrollment_no]
      );
  
      // If no student is found
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const user = rows[0];
      console.log('enroll ment :',user);
      
  
      if (password !=user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }else{
             // Generate JWT using the JWT_SECRET from environment variables
      const token = jwt.sign(
        { id: user.id, enrollment_no: enrollment_no, paper_set:user.paper_set },
        process.env.JWT_SECRET,  // Using JWT_SECRET from .env file
        { expiresIn: '1d' }  // Token expires in 1 day
      );

      return res.status(200).json({ message: 'Login successful', token });
      }      
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(500).json({ message: 'An error occurred during login' });
    }};