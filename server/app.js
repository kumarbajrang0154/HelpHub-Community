// app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/request', require('./routes/requestRoutes'));

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Middleware
app.use(errorHandler);

module.exports = app;