//-----------Funciones para accesos---------------------------
//Función para registrar el mensaje cuando accedemos a alguna parte de la página con exito
exports.accesoCorrecto = (nombre) => {
    return (`se ha accedido a ${nombre} `);
};

//Función para registrar cuando creamos un elemento nuevo con exito
exports.creadoCorrectamente = (nombre, id) => {
    if (nombre == "usuario" || nombre == "articulo" || nombre == "comentario")
        return (`se ha creado un nuevo ${nombre} con el id ${id}`);
}

//Función para registrar cuando editamos algun elemento de la página con exito
exports.actualizadoCorrectamente = (nombre, id) => {
    return (`Se ha modificado ${nombre} con el id ${id}`)
}

//Función para registrar cuando eliminamos un elemento de la página con exito

exports.borradoCorrectamente = (nombre, id) => {
    return (`Se ha eliminado un elemento ${nombre} con el id ${id}`);
}

// Función para registrar que se han eliminado todos los registros de X elemento de un usuario
exports.todosRecursosDeUsuarioBorradosCorrectamente = (nombre, id_usuario) => {
    return (`Se ha eliminado todos los elementos ${nombre} del usuario con el id ${id_usuario}`);
}

exports.todosRecursosDeArticuloBorradosCorrectamente = (nombre, id_articulo) => {
    return (`Se ha eliminado todos los elementos ${nombre} de la rutina con el id ${id_articulo}`);
}

//-----------Funciones para errores---------------------------

//Función para registrar que la base de datos no esta conectada

exports.baseDatosNoConectada = () => {
    return ("La base de datos no conectada")
}

//Función para registrar si se ha intentado acceder a la página sin iniciar sesión
exports.accesoSinLoggeo = (nombre) => {
    return (`Se ha intentado acceder a ${nombre} sin iniciar sesión`)
}

//Función para registrar un error interno

exports.errInterno = (err) => {
    return (`Ha ocurrido un error interno. Error ${err}`)
}

//-----------Funciones para warnings---------------------------

//Función para registrar que se ha intentado eliminar un elemento que no existe

exports.noExiste = (nombre) => {
    return (`El elemento ${nombre} no existe`)
}

// Función para registrar que el usuario ha introducido datos incorrectos
exports.parametrosIncorrectos = () => {
        return (`Datos introducidos incorrectos`)
    }

//Función para registrar que el usuario se ha dejado algun dato sin introducir

exports.faltanDatos = (nombre) => {
    return (`Faltan datos a la hora de registrar ${nombre}`)
}

exports.faltanDatosAcceso = (datos) => {
    return (`Faltan datos para acceder a ${datos}`);
}

exports.recursoDeUsuarioNoExiste = (nombreRecurso) => {
    return (`El usuario no tenía ${nombreRecurso}`);
}

exports.recursoDeArticuloNoExiste = (nombreRecurso) => {
    return (`La rutina no tenía ${nombreRecurso}`);
}