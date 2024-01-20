const usuarioController = require("../controllers/usuario.controller");
const express = require("express");
const router = express.Router();
// const anyadirMorgan = require("../middleware/morgan.mw");

/**
 * Ruta para recoger todos los usuarios
 * Llama a la función get_usuario de usuario.Controller
 * ej de ruta: http://localhost:3000/api/v1/comentarios
 */
router.get("/", usuarioController.get_usuarios);

/**
 * Ruta para recoger un usuario por id de usuario definido en la url (parámetro)
 * Llama a la función get_usuario_by_id de usuario.Controller
 * Ej de ruta: http://localhost:3000/api/v1/ejercicio/usuario {id_usuario a través de JSON}
 */
router.get("/:id", usuarioController.get_usuario_by_id);

/**
 * Ruta para añadir un nuevo usuario
 * Llama a la función add_usuario del usuarioController
 * ej de ruta: http://localhost:3000/api/v1/usuarios
 */
router.post("/", usuarioController.add_usuario);

/**
 * Ruta para modificar un usuario definido en JSON según id definido en la url (parámetro)
 * Llama a la función edit_usuario de usuario.Controller
 * Ej de ruta: https://localhost:3000/api/v1/usuario/id {nombre, id_usuario y estado a través de JSON}
 */
router.patch("/:id", usuarioController.edit_usuario);

/**
 * Ruta para eliminar un usuario por id definido en la url (parámetro)
 * Llama a la función delete_ejercicio_by_usuario de ejercicio.Controller
 * Ej de ruta: https://localhost:3000/api/v1/comentario/id {id_usuario a través de JSON}
 */
router.delete("/:id", usuarioController.delete_usuario);

module.exports = router

