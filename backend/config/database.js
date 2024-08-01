const { Sequelize } = require('sequelize');

// Initialize a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

module.exports = sequelize;
