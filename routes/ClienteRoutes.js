const express = require('express');
const router = express.Router();
const {crearCliente, obtenerClientes, modificarCliente, eliminarCliente} =require ('../controllers/ClienteController')

router.get('/clientes', obtenerClientes);
router.post('/clientes', crearCliente);
router.put('/clientes/:Email', modificarCliente);
router.delete('//clientes/:Email', eliminarCliente);

module.exports = router;