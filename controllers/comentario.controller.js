const Comentario = require("../models/comentario.model");
const Articulo = require("../models/articulos.model");
const Usuario = require("../models/usuario.model");
const utils = require("./utils");
const dbConn = require("../config/db.config.mongo");
const utilsLogs = require("./utilsLogs");


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
        await Comentario.get_comentario()
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

exports.get_comentario_by_articulo = utils.wrapAsync(async function (req, res, next) {
    let id_articulo = req.params.id_articulo;
    console.log(id_articulo);
    if (id_articulo) {
        try {
            await dbConn.conectar;
            try {
                await Articulo.get_articulo_by_id(id_articulo)
                    .then(async (articulo) => {
                        if (articulo === null) {
                            res.status(404).json(utils.noExiste("articulo"));
                            logger.warning.warn(utilsLogs.noExiste("articulo"))
                        } else {
                            try {
                                await dbConn.conectar;
                                try {
                                    await Ejercicio.get_comentario_by_articulo(id_articulo)
                                        .then((comentario) => {
                                            res.status(200).json(comentario)
                                            logger.access.info(utilsLogs.accesoCorrecto(`Comentarios del articulo: ${id_articulo}`))
                                        })
                                        .catch((err) => {
                                            res.status(406).json(utils.parametrosIncorrectos());
                                            logger.warning.warn(utilsLogs.parametrosIncorrectos());
                                        });
                                } catch (err) {
                                    res.status(406).json(utils.parametrosIncorrectos());
                                    logger.warning.warn(utilsLogs.parametrosIncorrectos());
                                }
                            } catch (err) {
                                res.status(500).json(utils.baseDatosNoConectada());
                                logger.error.error(utilsLogs.baseDatosNoConectada());
                            }
                        }
                    })
                    .catch((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos())
                    })
            } catch (err) {
                res.status(500).json(utils.baseDatosNoConectada());
                logger.error.error(utilsLogs.baseDatosNoConectada());
            }

        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.error(utilsLogs.baseDatosNoConectada());
        }
    } else {
        logger.warning.warn(utilsLogs.faltanDatosAcceso("comentario por articulo"));
        throw new MissingDatosError(utils.missingDatos());
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

exports.add_comentario = utils.wrapAsync(async function (req, res, next) {
    let comentario = req.body;
    if (comentario.usuario && comentario.id_usuario && comentario.id_articulo && comentario.titulo && comentario.cuerpo) {
        try {
            // await Usuario.findById(ejercicio.id_usuario, async function (err, user) {

                if (err) {
                    res.status(406).json(utils.parametrosIncorrectos());
                    logger.warning.warn(utilsLogs.parametrosIncorrectos());
                }
                else {
                    await dbConn.conectar;
                    console.log("entra");
                    try {
                        await Comentario.add_comentario(comentario)
                            .then((rest) => {
                                rest.status(201).json(utils.creadoCorrectamente('ejercicio'));
                                logger.access.info(utilsLogs.creadoCorrectamente("ejercicio", ejercicio._id));

                            })
                            .catch((err) => {
                                res.status(406).json(utils.parametrosIncorrectos())
                                logger.warning.warn(utilsLogs.parametrosIncorrectos());

                            });
                    } catch (err) {
                        res.status(500).json(utils.baseDatosNoConectada());
                        logger.error.error(utilsLogs.baseDatosNoConectada());
                    }
                }
            // })

        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.error(utils.baseDatosNoConectada());
        }
    } else {
        res.status(406).json(utils.missingDatos());
        throw new MissingDatosError(utils.missingDatos())
    }
})

/**
 * Controlador para editar un ejercicio definida en el body de la request e identificada según id definido en los parámetros de la request.
 * Llama a la fución del modelo Ejercicio edit_ejercicio.
 * Si la tarea con ese id no existe, devuelve código 404 y un mensaje indicándolo.
 * Si todo ha ido bien, devuelve código 200 y un mensaje indicándolo.
 * Si alguno de los datos es incorrecto (no coincide con las restricciones de la base de datos) o no está definido, devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */

exports.edit_comentario = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;
    let comentario = req.body;


    if (comentario.usuario && comentario.id_usuario && comentario.id_articulo && comentario.titulo && comentario.cuerpo) {
        try {
            await Usuario.findById(comentario.id_usuario, async function (err, user) {
                if (err) {
                    res.status(406).json(utils.parametrosIncorrectos());
                    logger.warning.warn(utilsLogs.parametrosIncorrectos());

                } else {
                    try {
                        await dbConn.conectar;
                        try {
                            await Usuario.edit_usuario(id, usuario)
                                .then((result) => {
                                    if (result.value === null) {
                                        res.status(404).json(utils.noExiste("ejercicio"));
                                        logger.warning.warn(utilsLogs.noExiste("ejercicio"));
                                    } else {
                                        res.status(200).json(utils.editadoCorrectamente("ejercicio"));
                                        logger.access.info(utilsLogs.actualizadoCorrectamente("ejercicio", result.value._id));

                                    }
                                })
                                .catch((err) => {
                                    res.status(406).json(utils.parametrosIncorrectos())
                                    logger.warning.warn(utilsLogs.parametrosIncorrectos());
                                });

                        } catch (err) {
                            res.status(406).json(utils.parametrosIncorrectos());
                            logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        }

                    } catch (err) {
                        res.status(500).json(utils.baseDatosNoConectada());
                        logger.error.error(utilsLogs.baseDatosNoConectada());
                    }

                }
            })
        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.error(utilsLogs.baseDatosNoConectada());

        }
    } else {
        logger.warning.warn(utilsLogs.faltanDatosAcceso("editar una tarea"));
        throw new MissingDatosError(utils.missingDatos())
    }

})


/**
 * Controlador para eliminar un ejercicio identificada según id definido en los parámetros de la request.
 * Llama a la fución del modelo Ejercicio delete_ejercicio.
 * Si la tarea con ese id no existe, devuelve código 404 y un mensaje indicándolo.
 * Si todo ha ido bien, devuelve código 200 y un mensaje indicándolo.
 * Si el id es incorrecto (formato imposible de parsear como id de mongodb), devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */

exports.delete_comentario_by_articulo = utils.wrapAsync(async function (req, res) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Comentario.delete_comentario(id)
                .then((del) => {
                    if (del === null) {
                        logger.warning.warn(utilsLogs.noExiste("Comentario"));
                        throw new NoExisteError(utils.noExiste("Comentario"));
                    } else {
                        res.status(200).json(utils.borradoCorrectamente("Comentario"));
                        logger.access.info(utilsLogs.borradoCorrectamente("comentario", del._id))
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



