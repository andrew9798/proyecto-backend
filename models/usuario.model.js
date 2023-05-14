const mongoose = require("mongoose");

const articuloSchema = new mongoose.Schema({
    id_usuario: {
        type: Number,
        required: true
    },
    nombre: {
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
    }
})

module.exports = Comentario;