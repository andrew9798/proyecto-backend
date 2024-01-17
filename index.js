const express = require("express"); // npm i express
const cors = require('cors');
const app = express();
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const session = require("express-session"); // npm i express-session
// const morgan = require("morgan"); // npm i morgan
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3500;
const logger = require("./logs/logger");
<<<<<<< HEAD
// const https = require("https");
=======
>>>>>>> 01f5fd3ba91544c35ffaad54b3feb5fee8ab61f6
const http = require("http");
const fs = require("fs");
const utils= require("../proyecto-backend/controllers/utils");

const articulosRoutes = require("./routes/articulos.routes");
const comentarioRoutes = require("./routes/comentario.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const authRoute = require("./routes/authRoute")

// para la versiones
const version = "v1";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/api/${version}/articulos`, articulosRoutes);
app.use(`/api/${version}/usuarios`, usuarioRoutes);
app.use(`/api/${version}/comentarios`, comentarioRoutes);

// ------------- COOKIES ---------------------------//

// app.use("/cookieSession", function (req, res, next) {
//   res.locals.session = req.session.admin = "admin";
//   next();
// });

// app.get("/cookieSession", (req, res) => {
//   // No neceistas el cookieparse para ver las cookies o para añadir
//   res.cookie("SoyCookie", "Soy una Cookie Normal");
//   res.cookie("SoySecretCookie", "Soy una cookie Secreta", { signed: true });

//   ses = {
//     id: req.sessionID,
//     name: req.session.admin,
//   };

//   // req.session.usuario = "Carmen";
//   res.render("cookieYsession", { ses });
// });

/* ------------- Aplicación del Cors* ----------------- */

const whitelist = ["http://127.0.0.1:3500", "http://127.0.0.1:5501", "http://127.0.0.1:5502", "http://127.0.0.1:5503", "http://127.0.0.1:5504", "http://127.0.0.1:5505", "http://127.0.0.1:5506"]
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

// -------------- error 500 ---------------------------//

app.use((err, req, res, next) => {
  const { status = 500, message = utils.errInterno() } = err;
  res.status(status).send(message);
});

// ---------------- levantar servidor ---------------- //

const host = 'localhost';

const server = http.createServer(app);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
