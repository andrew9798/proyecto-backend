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
 * Ej de ruta: http://localhost:3000/api/v1/comentarios/articulo {id_usuario a través de JSON}
 */
router.post("/:articulo", anyadirMorgan, comentarioController.get_comentario_by_articulo);

/**
 * Ruta para añadir un nuevo comentario
 * Llama a la función add_comentario del routineController
 * ej de ruta: http://localhost:3000/api/v1/comentarios {titulo,descripcion e id_usuario}
 */
router.post("/",anyadirMorgan,comentarioController.add_comentario);

/**
 * Ruta para modificar un comentario definido en JSON según id definido en la url (parámetro)
 * Llama a la función edit_ejercicio de ejercicio.Controller
 * Ej de ruta: http://localhost:3000/api/v1/comentarios/id
 */
router.patch("/:id", anyadirMorgan, comentarioController.edit_comentario);

/**
 * Ruta para eliminar un articulo por id definido en la url (parámetro)
 * Llama a la función delete_ejercicio_by_usuario de ejercicio.Controller
 * Ej de ruta: http://localhost:3000/api/v1/comentarios/id {id_usuario a través de JSON}
 */
router.delete("/:id", anyadirMorgan, comentarioController.delete_comentario);

/**
 * Ruta para eliminar todos los comentarios de un articulo según id definido en JSON
 * Llama a la función delete_ejercicio_by_usuario de ejercicio.Controller
 * Ej de ruta: http://localhost:3000/api/v1/tareas/usuario {id_usuario a través de JSON}
 */
router.delete("/articulo", anyadirMorgan, comentarioController.delete_comentario_by_articulo);


module.exports = router
