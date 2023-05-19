const Usuario = require("../models/usuario.model");
const dbConn = require("../config/db.config.mongo");
const utils = require("./utils")
const logger = require("../logs/logger")
const utilsLogs = require("./utilsLogs")
const jwtMiddleware = require("../middleware/jwt.mw")
const jwt = require("jsonwebtoken");

const NoExisteError = require("../errors/NoExisteError");
const BaseDatosNoConectadaError = require("../errors/BaseDatosNoConectadaError");
const MissingDatosError = require("../errors/MissingDatosError");
const ParametrosIncorrectosError = require("../errors/ParametrosIncorrectosError");
const ErrInterno = require("../errors/ErrInterno");
const { JsonWebTokenError } = require("jsonwebtoken")

const bcrypt = require("bcrypt");

/**
 * Funcion para encontrar todos los usuarios, se le llama a la funcion del modelo de usuarios
 * @param {Object} req 
 * @param {JSON} res 
 * Devuelve la respuesta en JSON para poder manejarlo 
 */

exports.get_usuarios = utils.wrapAsync(async function (req, res, next) {
    try {
        await dbConn.conectar;
        await Usuario.get_usuarios()
            .then((usuario) => res.status(200).json(usuario), logger.access.info(utilsLogs.accesoCorrecto("usuario")))
            .catch((err) => {
                logger.error.error(utilsLogs.errInterno(err));
                throw new ErrInterno(utils.errInterno(err));
            })
    } catch (err) {
        if (!(err instanceof ErrInterno)) {
            logger.error.error(utilsLogs.baseDatosNoConectada());
            throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada())
        } else {
            throw err;
        }
    }
})

/**
 * Funcion para encontrar un usuarios, se le llama a la funcion del modelo de usuarios
 * @param {Object} req 
 * @param {JSON} res 
 * Devuelve la respuesta en JSON para poder manejarlo 
 */

exports.get_usuario_by_id = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;
    try {
        await dbConn.conectar;
        try {
            await Usuario.get_usuario_by_id(id)
                .them((usuario) => {
                    if (usuario === null) {
                        logger.warning.warn(utilsLogs.noExiste("usuario"));
                        throw new NoExisteError(utils.noExiste("usuario"));
                    }
                    else {
                        logger.access.info(utilsLogs.accesoCorrecto(`el usuario ${usuario._id}`))
                        res.status(200).json(usuario);
                    }
                })
                .catch((err) => {
                    if (!(err instanceof noExisteError)) {
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())

                    }
                    else {
                        throw err;
                    }
                })
        }
        catch (err) {
            if (!(err instanceof noExisteError)) {
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
                throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
            }
            else {
                throw err;
            }
        }
    }catch(err){
        if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
            logger.error.error(utilsLogs.baseDatosNoConectada());
            throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada())
        } else {
            throw err;
        }
    }    

})

exports.get_usuario_by_correo_and_password = async function(req,res,next){
    const emailycontraseña = req.body
    try{
        try{
            await Usuario.findByemail(emailycontraseña.Correo, async function (err, user) {
                //Terminar función
            })
        }catch{
            res.status(406).json(utils.parametrosIncorrectos()),
            logger.warning.warn(utilsLogs.parametrosIncorrectos());
        }
    }catch{
        res.status(500).json((utils.baseDatosNoConectada())),
        logger.error.err(utilsLogs.baseDatosNoConectada());
    }
}



