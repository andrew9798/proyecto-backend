const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
    usuario:{
        type: String,
        required: true
    },
    id_usuario: {
        type: String,
        required: true
    },
    id_articulo: {
        type: String,
        required: true
    },
    titulo:{
        type: String,
        required: true
    },
    cuerpo:{
        type: String,
        required: true
    }
});

/**
 * Generación del modelo Comentario a partir del schema.
 */

const Comentario = mongoose.model("Comentario",comentarioSchema);

/**
 * Recoger de la base de datos todos los comentarios.
 */
Comentario.get_comentarios = async function() {
    return Comentario.find();
}

/**
 * Recoger de la base de datos los comentarios que hay dentro de un articulo definido por id del articulo.
 * @param {String} id 
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */

Comentario.get_comentario_by_articulo = async function(id) {
    return Comentario.find({ id_articulo: id })
}

/**
 * Recoger de la base de datos todas los comentarios de un usuario definido por id de usuario
 * @param {Number} id
 * @returns la Promesa resultante de hacer la consulta a la base de datos
 */
Comentario.get_comentario_by_usuario = async function(id) {
    return Comentario.find({ id_usuario: id })
}

/**
 * Guardar una nuevo comentario en la base de datos
 * @param {JSON Object} comentario 
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */
Comentario.add_comentario = async function(comentario) {
    const nuevoComentario = new Comentario(comentario);
    return nuevoComentario.save()
}

/**
 * Editar un comentario en la base de datos definida por su id
 * @param {String} id 
 * @param {JSON Object} comentario
 * @returns la Promesa resultante de hacer la consulta a la base de datos. */

Comentario.edit_comentario = async function(id,comentario) {
    return Comentario.findByIdAndUpdate(id, comentario, { runValidators: true, new: true, rawResult: true })
} 

/**
 * Borrar un comentario de la base de datos definida por su id
 * @param {String} id 
 * @returns la Promesa resultante de hacer la consulta a la base de datos
 */
Comentario.delete_comentario = async function(id) {
    return Comentario.findByIdAndDelete({ _id: id })
}

/**
 * Borrar todas los comentarios de un articulo definido por su id de la base de datos
 * @param {Number} id
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */
Comentario.delete_comentario_by_usuario = async function(id) {
    return Comentario.deleteMany({ id_usuario: id })
}

/**
 * Borrar todas los comentarios de un articulo definido por su id de la base de datos
 * @param {Number} id
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */
Comentario.delete_comentario_by_articulo = async function(id) {
    return Comentario.deleteMany({ id_articulo: id })
}

module.exports = Comentario;
