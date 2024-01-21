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

exports.get_comentarios = utils.wrapAsync(async function (req, res, next) {
  try {
    await dbConn.conectar;
    await Comentario.get_comentarios()
      .then(
        (comentario) => res.status(200).json(comentario),
        logger.access.info(utilsLogs.accesoCorrecto("comentario"))
      )
      .catch((err) => {
        logger.error.error(utilsLogs.errInterno(err));
        throw new ErrInterno(utils.errInterno(err));
      });
  } catch (err) {
    if (!(err instanceof ErrInterno)) {
      logger.error.error(utilsLogs.baseDatosNoConectada());
      throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada());
    } else {
      throw err;
    }
  }
});

/**
 * Controlador el cual nos ayuda a encontrar los comentarios por id que esta definido en la request
 * Llama a la función del modelo Comentario get_comentario_by_id
 * Si no existe ningun articulo con el id enviado, devuelve un código 404, y un mensaje avisando de ello
 * Si todo ha ido bien, devolvera un código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si el id es incorrecto (formato imposible de parsear como id de mongodb), devolvera un código 406 y un mensaje avisando de ello
 * Si la base de datos se encuentra conectada pero ha ocurrido algún error, nos devolvera un código 500 y el error.
 * Si la base de datos no esta conectada, nos devolvera un error 500y un mensaje avidando de que no se encuentra conectada.
 * @param {JSON Object} req
 * @param {JSON Object} res
 */
exports.get_comentario_by_id = utils.wrapAsync(async function (req, res, next) {
  const id = req.params.id;
  try {
    await dbConn.conectar;
    try {
      await Comentario.get_comentario_by_id(id)
        .then((comentario) => {
          if (comentario === null) {
            res.status(404).json(utils.noExiste("comentario"));
            logger.warning.warn(utilsLogs.noExiste("comentario"));
          } else {
            res.status(200).json(comentario);
            logger.access.info(utilsLogs.accesoCorrecto("comentario"));
          }
        })
        .catch(
          (err) => res.status(406).json(utils.parametrosIncorrectos()),
          logger.warning.warn(utilsLogs.parametrosIncorrectos())
        );
    } catch (err) {
      res.status(406).json(utils.parametrosIncorrectos());
      logger.warning.warn(utilsLogs.parametrosIncorrectos());
    }
  } catch (err) {
    res.status(500).json(utils.baseDatosNoConectada());
    logger.error.error(utilsLogs.baseDatosNoConectada());
  }
});

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

exports.get_comentario_by_articulo = utils.wrapAsync( 
  async function (req, res, next) {
    const id_articulo = req.params.articulo;
    if (id_articulo) {
      try {
        await dbConn.conectar;
        try {
          await Articulo.get_articulo_by_id(id_articulo)
            .then(async (articulo) => {
              if (articulo === null) {
                res.status(404).json(utils.noExiste("articulo"));
                logger.warning.warn(utilsLogs.noExiste("articulo"));
              } else {
                try {
                  await dbConn.conectar;
                  try {
                    await Comentario.get_comentario_by_articulo(id_articulo)
                      .then((comentario) => {
                        res.status(200).json(comentario);
                        logger.access.info(
                          utilsLogs.accesoCorrecto(
                            `Comentarios del articulo: ${id_articulo}`
                          )
                        );
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
              console.log(articulo);
            })
            .catch((err) => {
              res.status(406).json(utils.parametrosIncorrectos());
              logger.warning.warn(utilsLogs.parametrosIncorrectos());
            });
        } catch (err) {
          res.status(500).json(utils.baseDatosNoConectada());
          logger.error.error(utilsLogs.baseDatosNoConectada());
        }
      } catch (err) {
        res.status(500).json(utils.baseDatosNoConectada());
        logger.error.error(utilsLogs.baseDatosNoConectada());
      }
    } else {
      logger.warning.warn(
        utilsLogs.faltanDatosAcceso("comentario por articulo")
      );
      throw new MissingDatosError(utils.missingDatos());
    }
  }
);

/**
 * Controlador para guardar un comentario definida en el body de la request en la base de datos.
 * Llama a la fución del modelo comentario add_comentario.
 * Si todo ha ido bien, devuelve código 201 y un mensaje indicándolo.
 * Si alguno de los datos es incorrecto (no coincide con las restricciones de la base de datos) o no está definido, devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello
 * @param {JSON Object} req
 * @param {JSON Object} res
 */

exports.add_comentario = utils.wrapAsync(async function (req, res, next) {
  const comentario = req.body;
  if (
    comentario.usuario &&
    comentario.id_usuario &&
    comentario.id_articulo &&
    comentario.titulo &&
    comentario.cuerpo
  ) {
    try {
      await dbConn.conectar;
      try {
        await Comentario.add_comentario(comentario)
          .then((result) => {
            res.status(201).json(utils.creadoCorrectamente("comentario"));
            logger.access.info(
              utilsLogs.creadoCorrectamente("comentario", comentario._id)
            );
          })
          .catch((err) => {
            console.log("entra a error 406");
            res.status(406).json(utils.parametrosIncorrectos());
            logger.warning.warn(utilsLogs.parametrosIncorrectos());
          });
      } catch (err) {
        res.status(500).json(utils.baseDatosNoConectada());
        logger.error.error(utilsLogs.baseDatosNoConectada());
      }
    } catch (err) {
      res.status(500).json(utils.baseDatosNoConectada());
      logger.error.error(utils.baseDatosNoConectada());
    }
  } else {
    res.status(406).json(utils.missingDatos());
    throw new MissingDatosError(utils.missingDatos());
  }
});

/**
 * Controlador para editar un comentario definida en el body de la request e identificada según id definido en los parámetros de la request.
 * Llama a la fución del modelo comentario edit_comentario.
 * Si la tarea con ese id no existe, devuelve código 404 y un mensaje indicándolo.
 * Si todo ha ido bien, devuelve código 200 y un mensaje indicándolo.
 * Si alguno de los datos es incorrecto (no coincide con las restricciones de la base de datos) o no está definido, devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello
 * @param {JSON Object} req
 * @param {JSON Object} res
 */

exports.edit_comentario = utils.wrapAsync(async function (req, res, next) {
  const id = req.params.id;
  const comentario = req.body;

  if (
    comentario.usuario &&
    comentario.id_usuario &&
    comentario.id_articulo &&
    comentario.titulo &&
    comentario.cuerpo
  ) {
    try {
      try {
        await dbConn.conectar;
        try {
          await Comentario.edit_comentario(id, comentario)
            .then((result) => {
              if (result.value === null) {
                res.status(404).json(utils.noExiste("comentario"));
                logger.warning.warn(utilsLogs.noExiste("comentario"));
              } else {
                res.status(200).json(utils.editadoCorrectamente("comentario"));
                logger.access.info(
                  utilsLogs.actualizadoCorrectamente(
                    "comentario",
                    result.value._id
                  )
                );
              }
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
    } catch (err) {
      res.status(500).json(utils.baseDatosNoConectada());
      logger.error.error(utilsLogs.baseDatosNoConectada());
    }
  } else {
    logger.warning.warn(utilsLogs.faltanDatosAcceso("editar una comentario"));
    throw new MissingDatosError(utils.missingDatos());
  }
});

exports.delete_comentario_by_id = utils.wrapAsync(async function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  try {
    await dbConn.conectar;
    try {
      await Comentario.delete_comentario(id)
        .then((info) => {
          if (info === null) {
            logger.warning.warn(utilsLogs.noExiste("comentario"));
            throw new NoExisteError(utils.noExiste("comentario"));
          } else {
            res.status(200).json(utils.borradoCorrectamente("comentario"));
            logger.access.info(
              utilsLogs.borradoCorrectamente("comentario", info._id)
            );
          }
        })
        .catch((err) => {
          if (!(err instanceof NoExisteError)) {
            logger.warning.warn(utilsLogs.parametrosIncorrectos());
            throw new ParametrosIncorrectosError(utils.parametrosIncorrectos());
          } else {
            throw err;
          }
        });
    } catch (err) {
      if (
        !(
          err instanceof NoExisteError ||
          err instanceof ParametrosIncorrectosError
        )
      ) {
        logger.warning.warn(utilsLogs.parametrosIncorrectos());
        throw new ParametrosIncorrectosError(utils.parametrosIncorrectos());
      } else {
        throw err;
      }
    }
  } catch (err) {
    if (
      !(
        err instanceof NoExisteError ||
        err instanceof ParametrosIncorrectosError
      )
    ) {
      logger.error.error(utilsLogs.baseDatosNoConectada());
      throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada());
    } else {
      throw err;
    }
  }
});

/**
 * Controlador para eliminar un comentario por id definido en la request. 
 * Llama a la fución del modelo Comentario delete_comentario_by_articulo.
 * Si el comentario con ese id no existe, devuelve código 404 y un mensaje avisando de ello.
 * Si todo ha ido bien, devuelve código 200 y el objeto respuesta de la consulta a la base de datos.
 * Si el id es incorrecto (formato imposible de parsear como id de mongodb), devuelve código 406 y un mensaje avisando de ello.
 * Si la base de datos no está conectada, devuelve código 500 y un mensaje avisando de ello
 * @param {JSON Object} req
 * @param {JSON Object} res
 */

exports.delete_comentario_by_articulo = utils.wrapAsync(
  async function (req, res) {
    const id = req.params.id;

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
              logger.access.info(
                utilsLogs.borradoCorrectamente("comentario", del._id)
              );
            }
          })
          .catch((err) => {
            if (!(err instanceof NoExisteError)) {
              logger.warning.warn(utilsLogs.parametrosIncorrectos());
              throw new ParametrosIncorrectosError(
                utils.parametrosIncorrectos()
              );
            } else {
              throw err;
            }
          });
      } catch (err) {
        if (
          !(
            err instanceof NoExisteError ||
            err instanceof ParametrosIncorrectosError
          )
        ) {
          logger.warning.warn(utilsLogs.parametrosIncorrectos());
          throw new ParametrosIncorrectosError(utils.parametrosIncorrectos());
        } else {
          throw err;
        }
      }
    } catch (err) {
      if (
        !(
          err instanceof NoExisteError ||
          err instanceof ParametrosIncorrectosError
        )
      ) {
        logger.error.error(utilsLogs.baseDatosNoConectada());
        throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada());
      } else {
        throw err;
      }
    }
  }
);
