const Cliente = require('../models/Cliente')


//dejamos esta funcino aca que seguramente vayamos a quitar 
//porq no tiene funcionalidad ya que se encarga el controlador de compra
const crearCliente = async (req, res) => {
    const { cliente } = req.body;
    try {
        const clienteBuscadoOCreado = await Cliente.findOrCreate({
            where: { Email: cliente.Email},
            defaults: 
            {
                Nombre: cliente.Nombre,
                Apellido: cliente.Apellido,
                Email: cliente.Email
            }
            
        });
        res.status(201).json(clienteBuscadoOCreado);
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
    const { ID_cliente } = req.params;
    const { Nombre, Apellido } = req.body;
    try {
        const cliente = await Cliente.findByPk(ID_cliente);
        if (cliente) {
            cliente.Nombre = Nombre || cliente.Nombre;
            cliente.Apellido = Apellido || cliente.Apellido;

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
    const { ID_cliente } = req.params;
    try {
        const cliente = await Cliente.findByPk(ID_cliente);
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