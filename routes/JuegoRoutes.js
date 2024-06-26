const express = require('express');
const router = express.Router();
const {CrearJuego, ObtenerJuegos ,ModificarJuego, BorrarJuego} = require('../controllers/JuegoController');



// CRUD routes for Juegos
router.post('/juegos',CrearJuego);
router.get('/juegos', ObtenerJuegos);
router.put('/juegos/:ID_juego', ModificarJuego);
router.delete('/juegos/:ID_juego', BorrarJuego);

module.exports = router;