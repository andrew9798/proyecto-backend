const mongoose = require("mongoose");

const ComentarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    id_usuario: {
        type: Number,
        required: true
    },
    id_comentario: {
        type: Number,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    cuerpo: {
        type: String,
        required: true
    }
})