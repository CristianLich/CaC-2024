const DetalleCompra = require('../models/DetalleCompra')

const crearDetalleCompra = async (req, res) => {
    const { ID_compra, ID_juego, Precio, Cantidad } = req.body;
    try {
        const detalleCompra = await DetalleCompra.create({ ID_compra, ID_juego, Precio, Cantidad });
        res.status(201).json(detalleCompra);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create detalleCompra', details: error.message });
    }
}

const traerDetalleCompra = async (req, res) => {
    try {
        const detallesCompra = await DetalleCompra.findAll();
        res.status(200).json(detallesCompra);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch detallesCompra' });
    }
}

module.exports = { crearDetalleCompra , traerDetalleCompra};