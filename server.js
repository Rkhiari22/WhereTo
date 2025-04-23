const express = require('express');
const userRoutes = require('./routes/user.routes');
const destinationRoutes = require('./routes/destination.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json()); // Remplace bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Remplace bodyParser.urlencoded()
app.use(cookieParser());

// JWT auth
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).json(res.locals.user._id);
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/destination', destinationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});