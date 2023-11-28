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
    const id = req.params.id;
    try {
        await dbConn.conectar
        try {
            await Usuario.get_usuario_by_id(id)
                .then((usuario) => {
                    if (usuario === null) {
                        res.status(404).json(utils.noExiste("usuario"));
                        logger.warning.warn(utilsLogs.noExiste("usuario"))
                    } else {
                        res.status(200).json(usuario)
                        logger.access.info(utilsLogs.accesoCorrecto('usuario'))
                    }
                })
                .catch((err) => res.status(406).json(utils.parametrosIncorrectos()), logger.warning.warn(utilsLogs.parametrosIncorrectos()))
        } catch (err) {

            res.status(406).json(utils.parametrosIncorrectos());
            logger.warning.warn(utilsLogs.parametrosIncorrectos())
        }

    } catch (err) {
        res.status(500).json(utils.baseDatosNoConectada());
        logger.error.error(utilsLogs.baseDatosNoConectada())
    }
});



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

    /**
 * Controlador para añadir un usuario definida en el body de la request en la base de datos
 * Llama a la función del modelo Usuario add_usuario.
 * Si todo va bien, devolvera un código 201 y un mensaje indicandolo 
 * Si alguno de los datos es incorrecto(no cumple con las restricciones de la base de datos) o no esta definido, devuelve un código 406 y un mensaje indicandolo
 * Si la base de datos no está conectada, devuelve el código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */
exports.add_usuario = utils.wrapAsync(async function (req, res, next) {
    const usuario = req.body;
    if (usuario.titulo && usuario.correo && usuario.contrasenya && usuario.id_profile) {
        try {
            await dbConn.conectar
            try {
                await Usuario.add_articulo(usuario)
                    .then((result) => {
                        res.status(201).json(utils.creadoCorrectamente('usuario'))
                        logger.access.info(utilsLogs.creadoCorrectamente("usuario", result._id))
                    }).catch((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos())
                        console.log("error dos")
                    })
            } catch (err) {
                res.status(406).json(utils.parametrosIncorrectos());
                logger.warning.warn(utilsLogs.parametrosIncorrectos())
                console.log("error uno")
            }
        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.err(utilsLogs.baseDatosNoConectada());
        }

    } else {
        logger.warning.warn(utilsLogs.faltanDatos("usuario"))
        throw new MissingDatosError(utils.missingDatos())
    }
})


/**
 * Controlador para editar un usuario definida en el body de la request e identificada según el id en los parámetros de la request
 * Llama a la función del modelo Usuario edit_usuario
 * Si no existe ninguna articulo con el id enviado, devuelve un código 404, y un mensaje avisando de ello
 * Si todo ha ido bien, devolvera un código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si alguno de los datos es incorrecto(no cumple con las restricciones de la base de datos) o no esta definido, devuelve un código 406 y un mensaje indicandolo
 * Si la base de datos no está conectada, devuelve el código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */
exports.edit_articulo = utils.wrapAsync(async function (req, res, next) {
    const id = req.params.id;
    const usuario = req.body;

    console.log(id)
    console.log(usuario)

    if (usuario.titulo && usuario.cuerpo && usuario.id_usuario && usuario.imagen) {
        try {
            await dbConn.conectar;
            try {
                await Usuario.edit_usuario(id, usuario)
                    .then((result) => {
                        if (result.value === null) {
                            res.status(404).json(utils.noExiste('usuario'))
                            logger.warning.warn(utilsLogs.noExiste('usuario'))
                        } else {
                            res.status(200).json(utils.editadoCorrectamente("usuario"))
                            logger.access.info(utilsLogs.creadoCorrectamente("usuario", result.value._id))
                        }


                    }).catch((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        console.log("error 2")
                    })
            } catch (err) {
                res.status(406).json(utils.parametrosIncorrectos());
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
                console.log("error 1")
            }
        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.error(utilsLogs.baseDatosNoConectada());
        }

    } else {
        logger.warning.warn(utilsLogs.faltanDatosAcceso("añadir un usuario"));
        throw new MissingDatosError(utils.missingDatos())
    }
})




/**
 * Controlador para eliminar un usuario identificada según id definido en los parámetros de la request.
 * Llama a la fución del modelo usuario delete_usuario.
 * Si la tarea con ese id no existe, devuelve código 404 y un mensaje indicándolo.
 * Si todo ha ido bien, devuelve código 200 y un mensaje indicándolo.
 * Si el id es incorrecto (formato imposible de parsear como id de mongodb), devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */
exports.delete_usuario = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    try {
        await dbConn.conectar;
        try {
            await Usuario.delete_usuario(id)
                .then((info) => {
                    if (info === null) {
                        logger.warning.warn(utilsLogs.noExiste("usuario"));
                        throw new NoExisteError(utils.noExiste("usuario"));
                    } else {
                        res.status(200).json(utils.borradoCorrectamente("usuario"));
                        logger.access.info(utilsLogs.borradoCorrectamente("usuario", info._id));
                    }
                })
                .catch((err) => {
                    if (!(err instanceof NoExisteError)) {
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
                    } else {
                        throw err;
                    }
                });
        } catch (err) {
            if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
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



