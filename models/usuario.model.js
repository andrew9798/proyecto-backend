const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({

    usuario: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasenya: {
        type: String,
        required: true
    },
    id_profile: {
        type: Number,
        required: true
    }
})

/**
 * Generación del modelo usuario a partir del schema.
 */

const Usuario = mongoose.model("usuario",usuarioSchema);

/**
 * Recoger de la base de datos todas los usuarios sin ningún filtro
 */
Usuario.get_usuarios = async function () {
    return Usuario.find();
}

/**
 * Recoger de la base de datos un usuario por id.
 * @param {String} id 
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */

Usuario.get_usuario_by_id = async function(id) {
    return Usuario.findById({ _id: id })
}

/**
 * Recoger de la base de datos un comentario por correo y password.
 * @param {String} correo 
 * @param {String} password
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */

Usuario.get_usuario_by_correo_and_password = async function(){
    //Terminar Función
}

/**
 * Guardar un nuevo articulo en la base de datos
 * @param {JSON Object} usuario 
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */
Usuario.add_usuario = async function(usuario) {
    const nuevoUsuario = new Usuario(usuario);
    return nuevoUsuario.save()
}

/**
 * Editar un usuario en la base de datos definida por su id
 * @param {String} id 
 * @param {JSON Object} articulo 
 * @returns la Promesa resultante de hacer la consulta a la base de datos
 */
Usuario.edit_usuario = async function(id, usuario) {
    return Usuario.findByIdAndUpdate({ _id: id }, usuario, {runValidators: true, new: true, rawResult: true})
}

/**
 * Borrar un usuario de la base de datos definida por su id
 * @param {String} id 
 * @returns la Promesa resultante de hacer la consulta a la base de datos
 */
Usuario.delete_Usuario = async function(id) {
    return Usuario.findByIdAndDelete(id)
}

module.exports = Usuario;