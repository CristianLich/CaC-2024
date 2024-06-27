const Cliente = require('../models/Cliente')

const crearCliente = async (req, res) => {
    const { Nombre, Apellido, Direccion, Telefono, Email } = req.body;
    try {
        const cliente = await Cliente.create({ Nombre, Apellido, Direccion, Telefono, Email });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create cliente', details: error.message });
    }
}

const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clientes' });
    }
}

const modificarCliente = async (req, res) => {
    const { Email } = req.params;
    const { Nombre, Apellido, Direccion, Telefono } = req.body;
    try {
        const cliente = await Cliente.findByPk(Email);
        if (cliente) {
            cliente.Nombre = Nombre || cliente.Nombre;
            cliente.Apellido = Apellido || cliente.Apellido;
            cliente.Direccion = Direccion || cliente.Direccion;
            cliente.Telefono = Telefono || cliente.Telefono;
            await cliente.save();
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cliente' });
    }
}

const eliminarCliente = async (req, res) => {
    const { Email } = req.params;
    try {
        const cliente = await Cliente.findByPk(Email);
        if (cliente) {
            await cliente.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Cliente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete cliente' });
    }
}

module.exports = {  crearCliente,
                    obtenerClientes,
                    modificarCliente,
                    eliminarCliente
                                    }