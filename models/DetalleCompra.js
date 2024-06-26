const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Compra = require('./Compra');
const Juego = require('./Juego');

const DetalleCompra = sequelize.define('DetalleCompra', {
    ID_detalle: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ID_compra: {
        type: DataTypes.INTEGER,
        references: {
            model: Compra,
            key: 'ID_compra'
        }
    },
    ID_juego: {
        type: DataTypes.INTEGER,
        references: {
            model: Juego,
            key: 'ID_juego'
        }
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

DetalleCompra.belongsTo(Compra, { foreignKey: 'ID_compra' });
DetalleCompra.belongsTo(Juego, { foreignKey: 'ID_juego' });
Compra.hasMany(DetalleCompra, { foreignKey: 'ID_compra' });
Juego.hasMany(DetalleCompra, { foreignKey: 'ID_juego' });

module.exports = DetalleCompra;
