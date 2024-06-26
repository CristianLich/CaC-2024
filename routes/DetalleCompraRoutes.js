const express = require('express');
const router = express.Router();
const {crearDetalleCompra, traerDetalleCompra} =require('../controllers/DetalleCompraController')

router.get('/compra', traerDetalleCompra);
router.post('/compra', crearDetalleCompra);

module.exports = router;