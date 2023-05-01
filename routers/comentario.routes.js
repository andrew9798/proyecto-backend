const comentarioController = require("../controllers/comentario.controller");
const express = require("express");
const router = express.Router();
const { application } = require("express");
var cors = require("cors");
const anyadirMorgan = require("../middleware/morgan.mw");

/**
 * Ruta para recoger todas las comentarios
 * Llama a la función get_comentarios de comentario.Controller
 * ej de ruta: http://localhost:3000/api/v1/comentarios
 */
router.get("/", anyadirMorgan, comentarioController.get_comentario);


