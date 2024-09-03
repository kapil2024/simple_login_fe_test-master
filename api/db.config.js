const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false, // Disable logging; change to console.log to see SQL queries
});

module.exports = sequelize;

