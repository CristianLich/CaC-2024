const express = require('express');
const router = express.Router();
const {crearCliente, obtenerClientes, modificarCliente, eliminarCliente} =require ('../controllers/ClienteController')

router.get('/clientes', obtenerClientes);
router.post('/clientes', crearCliente);
router.put('/clientes/:ID_cliente', modificarCliente);
router.delete('/clientes/:ID_cliente', eliminarCliente);

module.exports = router;