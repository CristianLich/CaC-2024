const express = require('express');
const router = express.Router();
const {CrearJuego, ObtenerJuegos, ObtenerJuego ,ModificarJuego, DesactivarJuego, ActivarJuego} = require('../controllers/JuegoController');



// CRUD routes for Juegos
router.post('/juegos',CrearJuego);
router.get('/juegos', ObtenerJuegos);
router.get('/juegos/:ID_juego', ObtenerJuego);
router.put('/juegos/:ID_juego', ModificarJuego);
router.put('/juegos/:ID_juego/desactivar', DesactivarJuego);
router.put('/juegos/:ID_juego/activar', ActivarJuego);

module.exports = router;