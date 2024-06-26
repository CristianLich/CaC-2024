const express = require('express');
const router = express.Router();
const { crearCompra, traerCompras} = require('../controllers/CompraController')


router.get('/compras', traerCompras);
router.post('/compras', crearCompra)

module.exports = router;