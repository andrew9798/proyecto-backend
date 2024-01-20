const ID_ADMIN=1
const ID_USER=2
const ID_GUESS=3


const RUTA_SOLO_ADMINS = ["/api/v1/administracionPanel"]
const RUTAS_PERMITIDAS_GUESS = ["/api/v1/articulos"]

// Middleware de autorización
const authorization = async (req, res, next) => {
    if (req.session && req.session.usuario) {
        if (req.session.usuario[0].id_profiles === ID_ADMIN) {
            // Si el usuario es administrador, puede acceder a todo
            next();
        }
        else if (req.session.usuario[0].id_profiles === ID_USER) {
            // Si el usuario es nivel usuario, puede acceder a todo excepto al GET de la ruta solo permitida a administradores
            if (req._parsedOriginalUrl.path === RUTA_SOLO_ADMINS) {
                res.status(401).json({ codError: 401, desc: "No eres administrador" })
            } else {
                next();
            }
        }
        else if (req.session.usuario[0].id_profiles === ID_GUESS) {
            // Si el usuario es invitado, solo puede acceder a ciertas rutas y solo con métodos GET
            if ((req.method === "GET" && RUTAS_PERMITIDAS_GUESS.includes(req._parsedOriginalUrl.path))) {
                next();
            } else {
                res.status(401).json({codError: 401, desc: "No tienes permisos"})
            }
        }
    } else {
        res.status(401).json({codError: 401, desc: "No tienes permisos. Identifícate primero"})
    }
}


module.exports = authorization;