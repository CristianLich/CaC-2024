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
        allowNull: false,

    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,

    },
    Categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,

    },
    Desarrollador: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isAlphanumeric:true
        }
    },
    Publicador: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    Plataforma: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    URL_imagen: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    Estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    } 
},{
    timestamps: false
}
);

module.exports = Juego;
