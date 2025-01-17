// Import dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import path from 'path';
import mainRouter from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

// Create an Express app
const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.json());
const port = 3000;

const __dirname = path.resolve(path.dirname(new URL(import.meta.url).pathname).substring(1));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.use("/api",mainRouter);




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});