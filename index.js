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


/*------------- Aplicación del Cors* -----------------*/

 const whitelist = ["http://127.0.0.1:5000", "http://127.0.0.1:5001", "http://127.0.0.1:5002", "http://127.0.0.1:5003", "http://127.0.0.1:5004"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            logger.access.info("Acceso a la aplicación desde " + origin);
            callback(null, true);
        } else {
            logger.error.fatal("Intento de acceso a la aplicación desde origen desautorizado: " + origin)
            callback(null, false);
        }
    },
    credentials: true
}

app.use(cors(corsOptions));





