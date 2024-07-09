// conexion de la base de datos
const { Sequelize } = require("sequelize");
// "sql10717329", "sql10717329", "MCs2tfYW53", {
//     host: "sql10.freesqldatabase.com",
//Creamos conexion a la base de datos para poder crear las tablas a traves de los modelos
const sequelize = new Sequelize("gamemaster_db", "368192_backend", "backend1234", {
    host: "mysql-gamemaster.alwaysdata.net",
    dialect: "mysql",
});

module.exports =  sequelize;
