const Comentario= require("../models/comentario.model");
const Usuario= require("../models/usuario.model");
const utils = require("./utils");
const dbConn = require("../config/db.config.mongo");

const NoExisteError = require("../errors/NoExisteError");
const BaseDatosNoConectadaError = require("../errors/BaseDatosNoConectadaError");
const MissingDatosError = require("../errors/MissingDatosError");
const ParametrosIncorrectosError = require("../errors/ParametrosIncorrectosError");
const ErrInterno = require("../errors/ErrInterno");

const logger = require("../logs/logger");

/**
 * Controlador para encontrar todas los Comentarios. Llama a la función del modelo de Comentario get_Comentario.
 * Si todo ha ido bien, devuelve código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si la base de datos está conectada pero ha habido un error, devuelve código 500 y el error.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de que no está conectada  
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */

exports.get_comentario = utils.wrapAsync(async function (req, res, next) {
    try {
        await dbConn.conectar;
        await Ejercicio.get_comentario()
            .then((comentario) => res.status(200).json(comentario), logger.access.info(utilsLogs.accesoCorrecto("comentario")))
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
 * Controlador para encontrar un comentario por id definido en la request. 
 * Llama a la fución del modelo Comentario get_comentario_by_id.
 * Si el comentario con ese id no existe, devuelve código 404 y un mensaje avisando de ello.
 * Si todo ha ido bien, devuelve código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si el id es incorrecto (formato imposible de parsear como id de mongodb), devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello.
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */

exports.get_comentario_by_id = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Comentario.get_comentario_by_id(id)
                .then((comentario) => {
                    if (comentario === null) {
                        logger.warning.warn(utilsLogs.noExiste("comentario"));
                        throw new NoExisteError(utils.noExiste("comentario"));
                    } else {
                        logger.access.info(utilsLogs.accesoCorrecto(`el comentario ${comentario._id}`));
                        res.status(200).json(comentario);
                    }
                })
                .catch((err) => {
                    if (!(err instanceof NoExisteError)) {
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
                    } else {
                        throw err;
                    }
                })
        } catch (err) {
            if (!(err instanceof NoExisteError)) {
                logger.error.error(utilsLogs.baseDatosNoConectada());
                throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
            } else {
                throw err;
            }
        }
    } catch (err) {
        if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
            logger.error.error(utilsLogs.baseDatosNoConectada());
            throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada())
        } else {
            throw err;
        }
    }
})


/**
 * Controlador para guardar un comentario definida en el body de la request en la base de datos.
 * Llama a la fución del modelo Ejercicio add_ejercicio.
 * Si todo ha ido bien, devuelve código 201 y un mensaje indicándolo.
 * Si alguno de los datos es incorrecto (no coincide con las restricciones de la base de datos) o no está definido, devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */

exports.add_comentario = utils.wrapAsync(async function (req,res,next) {
    let comentario = req.body;

    if(comentario.usuario && comentario.id_usuario && comentario.id_comentario && comentario.titulo %% comentario.cuerpo){
        if(err){
            res.status(406).json(utils.parametrosIncorrectos);
            logger.warning.warn(utilsLogs.parametrosIncorrectos());
        }
        else{
            
        }
    }
})



