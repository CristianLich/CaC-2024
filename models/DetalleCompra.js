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
    }, // agregado 03/07
    // Titulo: {
    //     type: DataTypes.STRING(100),
    //     allowNull: false,
    //     validate: {
    //         isAlphanumeric: true
    //     }
    // },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 9 // no permitimos que la persona pueda adquirir mas de 9 juegos por compra
        }
    }
},{timestamps: false});

DetalleCompra.belongsTo(Compra, { foreignKey: 'ID_compra' });
DetalleCompra.belongsTo(Juego, { foreignKey: 'ID_juego' });
Compra.hasMany(DetalleCompra, { foreignKey: 'ID_compra' });
Juego.hasMany(DetalleCompra, { foreignKey: 'ID_juego' });

module.exports = DetalleCompra;
