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
 * Controlador el cual nos ayuda a encontrar todas los articulos en la base de datos. Llama a la función de Articulos get_articulos
 * Si todo ha ido bien, devolvera un código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si la base de datos se encuentra conectada pero ha ocurrido algún error, nos devolvera un código 500 y el error.
 * Si la base de datos no esta conectada, nos devolvera un error 500y un mensaje avidando de que no se encuentra conectada.
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */

exports.get_articulo = utils.wrapAsync(async function (req, res, next) {
    try {
        await dbConn.conectar;
        await Articulo.get_articulo()
            .then((articulo) => res.status(200).json(articulo), logger.access.info(utilsLogs.accesoCorrecto("articulo")))
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
 * Controlador el cual nos ayuda a encontrar los articulos por id que esta definido en la request
 * Llama a la función del modelo Articulo get_articulo_by_id
 * Si no existe ningun articulo con el id enviado, devuelve un código 404, y un mensaje avisando de ello
 * Si todo ha ido bien, devolvera un código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si el id es incorrecto (formato imposible de parsear como id de mongodb), devolvera un código 406 y un mensaje avisando de ello
 * Si la base de datos se encuentra conectada pero ha ocurrido algún error, nos devolvera un código 500 y el error.
 * Si la base de datos no esta conectada, nos devolvera un error 500y un mensaje avidando de que no se encuentra conectada.
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */
exports.get_articulo_by_id = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;
    console.log(id);
    try {
        await dbConn.conectar
        try {

            await Articulo.get_articulo_by_id(id)
                .then((articulo) => {
                    if (articulo === null) {
                        res.status(404).json(utils.noExiste("articulo"));
                        logger.warning.warn(utilsLogs.noExiste("articulo"))
                    } else {
                        res.status(200).json(articulo)
                        logger.access.info(utilsLogs.accesoCorrecto('articulo'))
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


/**
 * Controlador para añadir un articulo definida en el body de la request en la base de datos
 * Llama a la función del modelo articulo add_articulo.
 * Si todo va bien, devolvera un código 201 y un mensaje indicandolo 
 * Si alguno de los datos es incorrecto(no cumple con las restricciones de la base de datos) o no esta definido, devuelve un código 406 y un mensaje indicandolo
 * Si la base de datos no está conectada, devuelve el código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */
exports.add_articulo = utils.wrapAsync(async function (req, res, next) {
    let articulo = req.body;

    if (articulo.id_articulo && articulo.titulo && articulo.cuerpo) {
        try {
            await dbConn.conectar
            try {
                await Articulo.add_articulo(articulo)
                    .then((result) => {
                        res.status(201).json(utils.creadoCorrectamente('articulo'))
                        logger.access.info(utilsLogs.creadoCorrectamente("articulo", result._id))
                    }).catch((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos())
                    })
            } catch (err) {
                res.status(406).json(utils.parametrosIncorrectos());
                logger.warning.warn(utilsLogs.parametrosIncorrectos())
            }
        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.err(utilsLogs.baseDatosNoConectada());
        }

    } else {
        logger.warning.warn(utilsLogs.faltanDatos("articulo"))
        throw new MissingDatosError(utils.missingDatos())
    }
})

/**
 * Controlador para editar un articulo definida en el body de la request e identificada según el id en los parámetros de la request
 * Llama a la función del modelo Articulo edit_articulo
 * Si no existe ninguna articulo con el id enviado, devuelve un código 404, y un mensaje avisando de ello
 * Si todo ha ido bien, devolvera un código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si alguno de los datos es incorrecto(no cumple con las restricciones de la base de datos) o no esta definido, devuelve un código 406 y un mensaje indicandolo
 * Si la base de datos no está conectada, devuelve el código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */
exports.edit_articulo = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;
    let articulo = req.body;

    if (articulo.id_articulo && articulo.titulo && articulo.cuerpo) {

        try {
            await dbConn.conectar;
            try {
                await Articulo.edit_articulo(id, articulo)
                    .then((result) => {
                        if (result.value === null) {
                            res.status(404).json(utils.noExiste('articulo'))
                            logger.warning.warn(utilsLogs.noExiste('articulo'))
                        } else {
                            res.status(200).json(utils.editadoCorrectamente("articulo"))
                            logger.access.info(utilsLogs.creadoCorrectamente("articulo", result.value._id))
                        }


                    }).catch((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                    })
            } catch (err) {
                res.status(406).json(utils.parametrosIncorrectos());
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
            }
        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.error(utilsLogs.baseDatosNoConectada());
        }

    } else {
        logger.warning.warn(utilsLogs.faltanDatosAcceso("añadir un articulo"));
        throw new MissingDatosError(utils.missingDatos())
    }
})


/**
 * Controlador para eliminar un articulo identificada según el id definido en los parámetros de la request
 * Llama a la función del modelo Articulo delete_articulo
 * Si no existe ninguna rutina con el id enviado, devuelve un código 404, y un mensaje avisando de ello
 * Si todo ha ido bien, devolvera un código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si el id es incorrecto (formato imposible de parsear como id de mongodb), devolvera un código 406 y un mensaje avisando de ello 
 * Si la base de datos no está conectada, devuelve el código 500 y un mensaje avisando de ello
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 */
exports.delete_articulo = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Articulo.delete_articulo(id)
                .then((info) => {
                    if (info === null) {
                        logger.warning.warn(utilsLogs.noExiste("articulo"));
                        throw new NoExisteError(utils.noExiste("articulo"));
                    } else {
                        res.status(200).json(utils.borradoCorrectamente("articulo"));
                        logger.access.info(utilsLogs.borradoCorrectamente("articulo", info._id));
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





















