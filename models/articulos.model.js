const mongoose = require("mongoose");

const articuloSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    cuerpo: {
        type: String,
        required: true
    },    
    id_usuario: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
})

/**
 * Generación del modelo Articulo a partir del schema 
 */
const Articulo = mongoose.model("Articulo",articuloSchema);

/**
 * Recoger de la base de datos todas los articulos sin ningún filtro
 */
Articulo.get_articulos = async function () {
    return Articulo.find();
}

/**
 * Recoger de la base de datos un articulo por id
 * @param {String} id 
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */
Articulo.get_articulo_by_id = async function(id) {
    return Articulo.findById({_id: id})
} 

/**
 * Guardar un nuevo articulo en la base de datos
 * @param {JSON Object} articulo 
 * @returns la Promesa resultante de hacer la consulta a la base de datos.
 */
Articulo.add_articulo = async function(articulo) {
    const nuevoArticulo = new Articulo(articulo);
    return nuevoArticulo.save()
}

/**
 * Editar un articulo en la base de datos definida por su id
 * @param {String} id 
 * @param {JSON Object} articulo 
 * @returns la Promesa resultante de hacer la consulta a la base de datos
 */
Articulo.edit_articulo = async function(id, articulo) {
    return Articulo.findByIdAndUpdate({ _id: id }, articulo, {runValidators: true, new: true, rawResult: true})
}

/**
 * Borrar un articulo de la base de datos definida por su id
 * @param {String} id 
 * @returns la Promesa resultante de hacer la consulta a la base de datos
 */
Articulo.delete_articulo = async function(id) {
    return Articulo.findByIdAndDelete({ _id: id })
}

module.exports = Articulo;





