const usuarioController = require("../controllers/usuario.controller");
const express = require("express");
const router = express.Router();
const anyadirMorgan = require("../middleware/morgan.mw");

/**
 * Ruta para recoger todos los usuarios
 * Llama a la función get_usuario de usuario.Controller
 * ej de ruta: http://localhost:3000/api/v1/comentarios
 */
router.get("/", anyadirMorgan, usuarioController.get_usuarios);

/**
 * Ruta para recoger un usuario por id de usuario definido en JSON
 * Llama a la función get_usuario_by_id de usuario.Controller
 * Ej de ruta: http://localhost:3000/api/v1/ejercicio/usuario {id_usuario a través de JSON}
 */
router.post("/:id", anyadirMorgan, usuarioController.get_usuario_by_id);

module.exports = router