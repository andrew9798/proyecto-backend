const comentarioController = require("../controllers/comentario.controller");
const express = require("express");
const router = express.Router();
const anyadirMorgan = require("../middleware/morgan.mw");

/**
 * Ruta para recoger todas las comentarios
 * Llama a la función get_comentarios de comentario.Controller
 * ej de ruta: http://localhost:3000/api/v1/comentarios
 */
router.get("/", anyadirMorgan, comentarioController.get_comentario);

/**
 * Ruta para recoger todas los comentarios por id de articulo definido en JSON
 * Llama a la función get_comentario_by_articulo de comentario.Controller
 * Ej de ruta: http://localhost:3000/api/v1/ejercicio/usuario {id_usuario a través de JSON}
 */
router.post("/articulo", anyadirMorgan, comentarioController.get_comentario_by_articulo);

module.exports = router
