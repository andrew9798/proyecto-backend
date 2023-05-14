const articulosController = require("../controllers/articulo.controller");
const express = require("express");
const router = express.Router();
var cors = require("cors");
const anyadirMorgan = require("../middleware/morgan.mw");

/**
 * Ruta para recoger todas las comentarios
 * Llama a la función get_comentarios de comentario.Controller
 * ej de ruta: http://localhost:3000/api/v1/comentarios
 */
router.get("/", anyadirMorgan, articulosController.get_articulos);


/**
 * Ruta para recoger todas los comentarios por id de articulo definido en JSON
 * Llama a la función get_comentario_by_articulo de comentario.Controller
 * Ej de ruta: http://localhost:3000/api/v1/ejercicio/usuario {id_usuario a través de JSON}
 */
router.post("/usuario", anyadirMorgan, articulosController.get_articulo_by_id);

module.exports = router
