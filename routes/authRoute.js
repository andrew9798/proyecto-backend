const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Ruta para el inicio de sesión
router.post("/login", authMiddleware.login, (req, res) => {
  res.status(200).json({ success: true, token: req.session.token });
});

module.exports = router;