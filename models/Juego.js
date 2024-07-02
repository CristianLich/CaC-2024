const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Juego = sequelize.define('Juego', {
    ID_juego: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // validate: {
        //     isAlphanumeric:true
        // }
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
        // validate: {
        //     isAlphanumeric:true
        // }
    },
    Categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // validate: {
        //     isAlphanumeric:true
        // }
    },
    Desarrollador: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isAlphanumeric:true
        }
    },
    Publicador: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    Fecha_lanzamiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    Plataforma: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    URL_imagen: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    URL_archivo: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: true
        }
    }   
},{
    timestamps: false
}
);

module.exports = Juego;
