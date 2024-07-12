const Compra = require('../models/Compra');
const Cliente = require('../models/Cliente');
const Juego = require('../models/Juego');
const DetalleCompra = require('../models/DetalleCompra');
const sequelize = require('../config/database');

const crearCompra = async (req, res) => {
    const { cliente, detallesCompra } = req.body;

    let transaction;

    try {
        // Iniciar una transacción en Sequelize para manejar operaciones de base de datos
        transaction = await sequelize.transaction();

        // Crear el cliente (si es nuevo) o buscarlo si ya existe
        const [clienteCreado] = await Cliente.findOrCreate({
            where: { Email: cliente.Email },
            defaults: cliente,
            transaction // Asocia la transacción a esta operación
        });

        // Crear la compra asociada al cliente
        const compra = await Compra.create({
            ID_cliente: clienteCreado.ID_cliente,
            Fecha_compra: new Date() // Asegurarnos de que la fecha de compra se establezca correctamente
        }, { transaction });

        let total = 0;
        const detallesCompraCreados = [];

        // Crear los detalles de compra asociados a la compra creada
        for (const detalle of detallesCompra) {
            const juego = await Juego.findByPk(detalle.ID_juego);

            if (juego) {
                const detalleCompra = await DetalleCompra.create({
                    ID_compra: compra.ID_compra,
                    ID_juego: detalle.ID_juego,
                    Precio: juego.Precio,
                    Cantidad: detalle.cantidad
                }, { transaction });

                // Agregar el detalle creado a la lista de detalles
                detallesCompraCreados.push(detalleCompra);

                // Calcular el total sumando el precio del juego por la cantidad comprada
                total += juego.Precio * detalle.cantidad;
            }
        }

        // Actualizar el total de la compra creada
        await Compra.update({ Total: total }, { where: { ID_compra: compra.ID_compra }, transaction });

        // Confirmar la transacción
        await transaction.commit();

        // Responder con la compra creada y el total calculado
        res.status(201).json({ compra, cliente: clienteCreado, detallesCompra: detallesCompraCreados });
    } catch (error) {
        // Revertir la transacción si hay algún error
        if (transaction) await transaction.rollback();

        console.error('Error al crear la compra:', error);
        res.status(500).json({ error: 'Error al intentar crear la compra', details: error.message });
    }
};

const traerCompras = async (req, res) => {
    try {
      const compras = await Compra.findAll({
        include: [
          {
            model: Cliente,
            attributes: ["Nombre"],
          },
        ],
      });
      res.status(200).json(compras);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch compras" });
    }
};

module.exports = {
    crearCompra,
    traerCompras
};