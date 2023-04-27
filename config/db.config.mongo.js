const mongoose = require("mongoose");
const BaseDatosNoConectadaError = require("../errors/BaseDatosNoConectadaError");
const utils = require("../controllers/utils");
/**
 * Configuración para la base de datos de MongoDB
 */
const dbConfig = {
    host: "127.0.0.1",
    port: 27017,
    database: "Proyecto_therealsors"
}

/**
 * Objeto con una propiedad para conectar a la base de datos de MongoDB
 */
const dbConn = {
    conectar: mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`).catch(err => {
        throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada());
    }) 
}

module.exports = dbConn;