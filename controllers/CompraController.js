const Compra = require('../models/Compra')
const Cliente = require('../models/Cliente')
const Juego  = require('../models/Juego');
const DetalleCompra = require('../models/DetalleCompra')

const crearCompra =  async (req, res) => {
    const { cliente, detallesCompra } = req.body;

    let transaction;

    try {
        // Iniciar una transacción en Sequelize para manejar operaciones de base de datos
        transaction = await sequelize.transaction();

        // Crear el cliente (si es nuevo) o buscarlo si ya existe
        let clienteCreado = await Cliente.findOrCreate({
            where: { email: cliente.email }, // Usa un campo único como el email para buscar/crear el cliente
            defaults: cliente,
            transaction // Asocia la transacción a esta operación
        });

        // clienteCreado es un array con el cliente creado o encontrado
        const clienteId = clienteCreado[0].ID_cliente;

        // Crear la compra asociada al cliente
        const compra = await Compra.create({
            Fecha_compra: new Date(),  // Puedes usar la fecha actual
            ID_cliente: clienteId,
        }, { transaction });

        let total = 0;

        // Crear los detalles de compra asociados a la compra creada
        for (const detalle of detallesCompra) {
            const juego = await Juego.findByPk(detalle.ID_juego);

            if (juego) {
                await DetalleCompra.create({
                    ID_compra: compra.ID_compra,
                    ID_juego: detalle.ID_juego,
                    Precio: juego.Precio,
                    Cantidad: detalle.cantidad
                }, { transaction });

                // Calcular el total sumando el precio del juego por la cantidad comprada
                total += juego.Precio * detalle.cantidad;
            }
        }

        // Actualizar el total de la compra creada
        await Compra.update({ Total: total }, { where: { ID_compra: compra.ID_compra }, transaction });

        // Confirmar la transacción
        await transaction.commit();

        // Responder con la compra creada y el total calculado
        res.status(201).json({ compra, total });
    } catch (error) {
        // Revertir la transacción si hay algún error
        if (transaction) await transaction.rollback();

        console.error('Error al crear la compra:', error);
        res.status(500).json({ error: 'Error al intentar crear la compra', details: error.message });
    }
};


const traerCompras = async (req, res) => {
    try {
        const compras = await Compra.findAll();
        res.status(200).json(compras);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch compras' });
    }
}

module.exports = {
    crearCompra,
    traerCompras
}