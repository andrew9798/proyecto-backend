const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.mw");

// Ruta para el inicio de sesión
router.post("/login", auth, (req, res) => {
  res.status(200).json({ success: true, token: req.session.token });
});

module.exports = router;