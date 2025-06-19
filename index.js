const cors = require("cors");
require('dotenv').config();
const express = require('express');
const connectDB = require('./connect/database');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

connectDB();
console.log('Connected using the MONGO_URI defined in .env file');

// Middleware that parses incoming JSON payloads and makes them available under req.body
// MUST be added before routes

// Method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json())

// Method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: false }))

// Add error logging
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Routes for airline routes
app.use('/api/airlines', require('./routes/airlineRoutes'));

// Routes for user routes
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('HTTP request GET is working!');
});

app.post('/', (req, res) => {
  res.send('HTTP request POST is working!');
});

app.listen(PORT, () => {
  console.log(`My server is running on http://localhost:${PORT}`);
});