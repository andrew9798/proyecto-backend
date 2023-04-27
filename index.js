const express = require("express") //npm i express
const cors = require("cors");
const app = express()
const path = require("path")
const morgan = require("morgan") //npm i morgan
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000

 app.listen(port, () => {
     console.log(`escuchando en puerto ${port}`);
 })
