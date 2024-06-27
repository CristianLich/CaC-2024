// conexion de la base de datos
const { Sequelize } = require("sequelize");

//Creamos conexion a la base de datos para poder crear las tablas a traves de los modelos
const sequelize = new Sequelize("videogame_store", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

module.exports =  sequelize;
