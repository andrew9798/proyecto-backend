const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    id_usuario: {
        type: Number,
        required: true
    },
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

const Usuario = mongoose.model("usuario",comentarioSchema);

/**
 * Recoger de la base de datos un comentario por id.
 * @param {String} id 
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */

Usuario.get_usuario_by_id = async function(id) {
    return Usuario.findById(id)
}

module.exports = Usuario;