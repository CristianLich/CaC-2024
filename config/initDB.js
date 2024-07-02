require('dotenv').config();

 
const mysql = require("mysql2");

const createDatabase = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      // host: "localhost",
      // user: "root",
      // password: "",
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    });

    connection.connect((err) => {
      if (err) {
        console.error("Error " + err);
        return reject(
          new Error("Error conectando a la base de datos: " + err.message)
        );
      }

      console.log("Conectado a la base de datos");

      connection.query(
        "CREATE DATABASE IF NOT EXISTS videogame_store",
        (err, results) => {
          if (err) {
            console.error("Error creando la base de datos", err);
            return;
          }

          console.log("Base de datos creada");

          connection.changeUser({ database: "videogame_store" }, (err) => {
            if (err) {
              console.error("Error al cambiar a videogame_store", err);
              return;
            }

            console.log("Cambiado a la base de datos videogame_store");

            // Cerrar la conexión MySQL
            connection.end((err) => {
              if (err) {
                return reject(
                  new Error("Error cerrando la conexión MySQL: " + err.message)
                );
              }

              console.log("Conexión MySQL cerrada");
              resolve();
            });
          });
        }
      );
    });
  });
};

module.exports = createDatabase;
