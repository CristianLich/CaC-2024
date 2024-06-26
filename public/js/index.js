const express = require('express');
const sequelize = require('../../config/database');
const mysql = require('mysql');

//Rutas
const JuegoRoutes = require('../../routes/JuegoRoutes');
const CompraRoutes = require('../../routes/CompraRoutes');
const DetalleCompraRoutes = require('../../routes/DetalleCompraRoutes');

//Modelos
const Cliente = require('../../models/Cliente');

const app = express(); // instanciamos express
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Middleware para parsear cuerpos de petición en formato JSON
app.use(express.static('public')); // Middleware para servir archivos estáticos desde el directorio 'public'
const bodyParser = require('body-parser');


// ruta de prueba
app.get('/', (req, res) => {
    res.send('Welcome to the Videogame Store API');
});

//uso de la app real
// CRUD routes de juegos
app.use('/', JuegoRoutes);
// CRUD routes de compra
app.use('/', CompraRoutes);
// CRUD routes de DetallesCompra
app.use('/', DetalleCompraRoutes)




// Middleware de manejo de errores
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message.details });
});


// CRUD routes for Clientes
app.post('/clientes', async (req, res) => {
    const { Nombre, Apellido, Direccion, Telefono, Email } = req.body;
    try {
        const cliente = await Cliente.create({ Nombre, Apellido, Direccion, Telefono, Email });
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create cliente', details: error.message });
    }
});

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch clientes' });
    }
});

app.put('/clientes/:ID_cliente', async (req, res) => {
    const { ID_cliente } = req.params;
    const { Nombre, Apellido, Direccion, Telefono, Email } = req.body;
    try {
        const cliente = await Cliente.findByPk(ID_cliente);
        if (cliente) {
            cliente.Nombre = Nombre || cliente.Nombre;
            cliente.Apellido = Apellido || cliente.Apellido;
            cliente.Direccion = Direccion || cliente.Direccion;
            cliente.Telefono = Telefono || cliente.Telefono;
            cliente.Email = Email || cliente.Email;
            await cliente.save();
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cliente' });
    }
});

app.delete('/clientes/:ID_cliente', async (req, res) => {
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
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'videogame_store'
});

// Verificar y crear la base de datos si no existe
connection.connect((error) => {
    if (error) {
        console.log('Error de conexión a MySQL:', error);
        return;
    }

    connection.query('CREATE DATABASE IF NOT EXISTS videogame_store', (error) => {
        if (error) {
            console.log('Error al crear la base de datos:', error);
            return;
        }
        console.log('Base de datos verificada o creada correctamente');
    });
});


sequelize.sync() // sincronizamos los modelos de sequelize con la base de datos y retorna una promesa
    .then(() => app.listen(PORT, () => {// Inicia el servidor Express
        console.log(`Server running at http://localhost:${PORT}`);
    }))
    .catch((err) => console.log('Error syncing database:', err));
