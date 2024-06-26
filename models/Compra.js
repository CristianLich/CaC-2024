const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');

const Compra = sequelize.define('Compra', {
    ID_compra: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
        // get() {
        //     // Función getter para calcular el total dinámicamente
        //     return DetalleCompra.sum('Precio', {
        //         where: { ID_compra: this.ID_compra }
        //     });}
    },
    ID_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'ID_cliente'
        }
    }
},
{
    sequelize,
    modelName: 'Compra',
    timestamps: false
});

Compra.belongsTo(Cliente, { foreignKey: 'ID_cliente' });
Cliente.hasMany(Compra, { foreignKey: 'ID_cliente' });

module.exports = Compra;
