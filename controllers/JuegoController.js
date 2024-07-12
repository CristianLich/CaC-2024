const Juego  = require('../models/Juego');

const CrearJuego = async (req, res) => {
    const { Titulo, 
        Descripcion, 
        Categoria,
        Desarrollador, 
        Publicador, 
        Precio, 
        Plataforma, 
        URL_imagen,
        } = req.body;
    try {
        const juego = await Juego.create({ Titulo, Descripcion,Categoria, Desarrollador, Publicador, Precio, Plataforma, URL_imagen });
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

const ObtenerJuego = async (req, res) => {
    try {
        const {ID_juego} = req.params;
        const juego = await Juego.findByPk(ID_juego);
        if (juego) {
            res.status(200).json(juego);
        } else {
            res.status(404).json({ error: 'Juego not found' });
        }
        // res.status(200).json(juego);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch juegos' });
    }
}

const ModificarJuego = async (req, res) => {
    const { ID_juego } = req.params;
    const { Titulo, Descripcion,Categoria, Desarrollador, Publicador, Precio, Plataforma, URL_imagen } = req.body;
    try {
        const juego = await Juego.findByPk(ID_juego);
        if (juego) {
            juego.Titulo = Titulo || juego.Titulo;
            juego.Descripcion = Descripcion || juego.Descripcion;
            juego.Categoria = Categoria || juego.Categoria;
            juego.Desarrollador = Desarrollador || juego.Desarrollador;
            juego.Publicador = Publicador || juego.Publicador;
            juego.Precio = Precio || juego.Precio;
            juego.Plataforma = Plataforma || juego.Plataforma;
            juego.URL_imagen = URL_imagen || juego.URL_imagen;    
            await juego.save();
            res.status(200).json(juego);
        } else {
            res.status(404).json({ error: 'Juego not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update juego' });
    }
}

const DesactivarJuego = async (req, res) => {
    const  ID_juego  = req.params.ID_juego;
    try {
        const juego = await Juego.findByPk(ID_juego);
        if (juego) {
          await juego.update({ Estado: 0 });
          return res.json({ message: 'Estado actualizado exitosamente' });
        } else {
          return res.status(404).json({ message: 'Juego no encontrado' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el estado', error: error.message });
      }
}

const ActivarJuego = async (req, res) => {
    const  ID_juego  = req.params.ID_juego;
    try {
      const juego = await Juego.findByPk(ID_juego);
      if (juego) {
        await juego.update({ Estado: 1 });
        return res.json({ message: 'Estado actualizado exitosamente' });
      } else {
        return res.status(404).json({ message: 'Juego no encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error al actualizar el estado', error: error.message });
    }
  };



module.exports = {  CrearJuego ,
                    ObtenerJuegos,
                    ObtenerJuego,
                    ModificarJuego,
                    DesactivarJuego,
                    ActivarJuego }
