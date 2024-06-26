// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('videogame_store', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
