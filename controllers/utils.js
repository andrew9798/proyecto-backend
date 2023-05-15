// Función para control de errores asíncrono
exports.wrapAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(e => {
            next(e)
        });
    }
}


/**
 * Mensaje de error interno de la base de datos
 * @param {Error} err 
 * @returns mensaje en formato JSON 
 */
exports.errInterno = (err) => {
    return JSON.parse(` { "codError": "500", "desc": "${err}" }`);
};

/**
 * Mensaje de error de base de datos no conectada
 * @param {Error} err 
 * @returns mensaje en formato JSON  
 */
exports.baseDatosNoConectada = (err) => {
    return JSON.parse(` { "codError": "500", "desc": "base de datos no conectada" }`);
}

/**
 * Mensaje de éxito de recurso creado correctamente
 * @param {String} valor - el nombre de la entidad (usuario, tarea, etc)
 * @returns mensaje en formato JSON
 */
exports.creadoCorrectamente = (valor) => {
    return JSON.parse(` { "info": "${valor} creado correctamente"}`);
};

/**
 * Mensaje de éxito de recurso borrado correctamente
 * @param {String} valor - el nombre de la entidad (usuario, tarea, etc)
 * @returns mensaje en formato JSON
 */
exports.borradoCorrectamente = (valor) => {
    return JSON.parse(` { "info": "${valor} borrado correctamente"}`);
};

/**
 * Mensaje de éxito de recurso editado correctamente
 * @param {String} valor - el nombre de la entidad (usuario, tarea, etc)
 * @returns mensaje en formato JSON
 */
exports.editadoCorrectamente = (valor) => {
    return JSON.parse(` { "info": "${valor} editado correctamente"}`);
};

/**
 * Mensaje de error de recurso no existente
 * @param {String} valor - el nombre de la entidad (usuario, tarea, etc)
 * @returns mensaje en formato JSON
 */
exports.noExiste = (valor) => {
    return JSON.parse(` { "codError": "404", "desc": "${valor} no existe" }`);
};

/**
 * Mensaje de error de datos faltantes
 * @returns mensaje en formato JSON
 */
exports.missingDatos = () => {
    return JSON.parse(` { "codError": "406", "desc": "faltan datos" }`);
};

/**
 * Mensaje de error de parámetros incorrectos
 * @returns mensaje en formato JSON
 */
exports.parametrosIncorrectos = () => {
    return JSON.parse(` { "codError": "406", "desc": "datos incorrectos" }`);
}

/**
 * Mensaje de error de que los recursos solicitados de un usuario concreto no
 * @param {String} valor - el nombre de la entidad (usuario, tarea, etc)
 * @returns mensaje en formato JSON
 */
exports.recursoDeUsuarioNoExiste = (valor) => {
    return JSON.parse(` { "codError": "404", "desc": "el usuario no tenía ${valor} guardados" }`);
}

exports.recursoDeRutinaNoExiste = (valor) => {
    return JSON.parse(` { "codError": "404", "desc": "la rutina no tenía ${valor} guardados" }`);
}