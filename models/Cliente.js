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
        allowNull: false,
        validate: {
            isAlpha:true
        }
    },
    Apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isAlpha:true
        }
    },
    Direccion: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isAlphanumeric:true
        }
    },
    Telefono: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isNumeric:true
        }
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail:true
        }
    }
},
{
    timestamps: false
})

module.exports = Cliente;