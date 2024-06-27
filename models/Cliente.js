const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Cliente = sequelize.define('Cliente', {
    ID_cliente: {
        type: DataTypes.INTEGER,
        unique: true,
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
        allowNull: false,
        primaryKey: true
    },
},
{
    hooks: {
        beforeCreate: async (cliente, options) => {
            const ultimoCliente = await Cliente.findOne({
                order: [['ID_cliente', 'DESC']]
            });

            cliente.ID_cliente = ultimoCliente ? ultimoCliente.ID_cliente + 1 : 1;
        }
    }})

module.exports = Cliente;