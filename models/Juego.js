const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Juego = sequelize.define('Juego', {
    ID_juego: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Desarrollador: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Publicador: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Fecha_lanzamiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Plataforma: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    URL_imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    URL_archivo: {
        type: DataTypes.STRING(255),
        allowNull: true
    }   
},{
    timestamps: false
}
);

module.exports = Juego;
