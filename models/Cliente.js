const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Cliente = sequelize.define('Cliente', {
    ID_cliente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Direccion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Telefono: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },


})

module.exports = Cliente;