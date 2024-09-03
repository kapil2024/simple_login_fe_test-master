require('dotenv').config();
const express = require('express');
const sequelize = require('./db.config');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Authentication routes
app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Database connection and sync
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables have been created.');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
