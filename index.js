const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const createDatabase = require('./config/initDB')

//Rutas
const JuegoRoutes = require('./routes/JuegoRoutes');
const CompraRoutes = require('./routes/CompraRoutes');
const DetalleCompraRoutes = require('./routes/DetalleCompraRoutes');
const ClienteRoutes = require('./routes/ClienteRoutes');


const app = express(); // instanciamos express
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Middleware para parsear cuerpos de petición en formato JSON


app.use(express.static(path.join(__dirname, 'public'))); // Middleware para servir archivos estáticos desde el directorio 'public'
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
//   });
// CRUD routes de juegos
app.use('/', JuegoRoutes);
// CRUD routes de compra
app.use('/', CompraRoutes);
// CRUD routes de DetallesCompra
app.use('/', DetalleCompraRoutes)
// CRUD routes for Clientes
app.use('/', ClienteRoutes)




// Middleware de manejo de errores
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message.details });
});

// Verificar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//createDatabase().then(() => {
 //   return sequelize.sync()
//        .then( console.log("Tablas Creadas")) // sincronizamos los modelos de sequelize con la base de datos y retorna una promesa
 //       .then(() => app.listen(PORT, () => {// Inicia el servidor Express
  //          console.log(`Server running at http://localhost:${PORT}`);
  //      }))
  //      .catch((err) => console.log('Error syncing database:', err));
//})
//
