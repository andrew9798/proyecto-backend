const articulosController = require("../controllers/articulo.controller");
const express = require("express");
const router = express.Router();
const anyadirMorgan = require("../middleware/morgan.mw");

/**
 * Ruta para recoger todas los articulos
 * Llama a la función get_articulos de articulos.Controller
 * ej de ruta: https://localhost:3000/api/v1/articulos
 */
router.get("/", anyadirMorgan, articulosController.get_articulos);


/**
 * Ruta para recoger un articulo por id definido en la url (parámetro)
 * Llama a la función get_articulo_by_id de articulo.Controller
 * Ej de ruta: http://localhost:3000/api/v1/articulos/id
 */
router.get("/:id", anyadirMorgan, articulosController.get_articulo_by_id);

/**
 * Ruta para añadir un nuevo articulo
 * Llama a la función add_articulo del articulosController
 * ej de ruta: http://localhost:3000/api/v1/articulos
 */
router.post("/",anyadirMorgan,articulosController.add_articulo);

/**
 * Ruta para modificar un articulo definido en JSON según id definido en la url (parámetro)
 * Llama a la función edit_articulo de articulo.Controller
 * Ej de ruta: http://localhost:3000/api/v1/articulos/id {nombre, id_usuario y estado a través de JSON}
 */
router.patch("/:id", anyadirMorgan, articulosController.edit_articulo);

/**
 * Ruta para eliminar un articulo por id definido en la url (parámetro)
 * Llama a la función delete_ejercicio_by_usuario de ejercicio.Controller
 * Ej de ruta: http://localhost:3000/api/v1/comentario/id {id_usuario a través de JSON}
 */
router.delete("/:id", anyadirMorgan, articulosController.delete_articulo);


module.exports = router
