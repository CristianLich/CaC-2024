// conexion de la base de datos
const { Sequelize } = require("sequelize");

//Creamos conexion a la base de datos para poder crear las tablas a traves de los modelos
const sequelize = new Sequelize("sql10717329", "sql10717329", "MCs2tfYW53", {
    host: "sql10.freesqldatabase.com",
    dialect: "mysql",
});

module.exports =  sequelize;
