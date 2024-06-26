const Juego  = require('../models/Juego');

const CrearJuego = async (req, res) => {
    const { Titulo, 
        Descripcion, 
        Desarrollador, 
        Publicador, 
        Fecha_lanzamiento, 
        Precio, Plataforma, 
        URL_imagen, 
        URL_archivo } = req.body;
    try {
        const juego = await Juego.create({ Titulo, Descripcion, Desarrollador, Publicador, Fecha_lanzamiento, Precio, Plataforma, URL_imagen, URL_archivo });
        res.status(201).json(juego);
    } catch (error) {
        res.status(500).json({ error: 'Error al intentar crear juego juego', details: error.message });
    }
}

const ObtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.findAll();
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch juegos' });
    }
}

const ModificarJuego = async (req, res) => {
    const { ID_juego } = req.params;
    const { Titulo, Descripcion, Desarrollador, Publicador, Fecha_lanzamiento, Precio, Plataforma, URL_imagen, URL_archivo } = req.body;
    try {
        const juego = await Juego.findByPk(ID_juego);
        if (juego) {
            juego.Titulo = Titulo || juego.Titulo;
            juego.Descripcion = Descripcion || juego.Descripcion;
            juego.Desarrollador = Desarrollador || juego.Desarrollador;
            juego.Publicador = Publicador || juego.Publicador;
            juego.Fecha_lanzamiento = Fecha_lanzamiento || juego.Fecha_lanzamiento;
            juego.Precio = Precio || juego.Precio;
            juego.Plataforma = Plataforma || juego.Plataforma;
            juego.URL_imagen = URL_imagen || juego.URL_imagen;
            juego.URL_archivo = URL_archivo || juego.URL_archivo;
            await juego.save();
            res.status(200).json(juego);
        } else {
            res.status(404).json({ error: 'Juego not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update juego' });
    }
}

const BorrarJuego = async (req, res) => {
    const { ID_juego } = req.params;
    try {
        const juego = await Juego.findByPk(ID_juego);
        if (juego) {
            await juego.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Juego not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete juego' });
    }
}





module.exports = {  CrearJuego ,
                    ObtenerJuegos,
                    ModificarJuego,
                    BorrarJuego }
