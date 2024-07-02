// conexion de la base de datos
const { Sequelize } = require("sequelize");

//Creamos conexion a la base de datos para poder crear las tablas a traves de los modelos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});

module.exports =  sequelize;
