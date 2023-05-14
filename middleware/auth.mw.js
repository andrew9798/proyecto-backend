let ID_ADMIN=1
let ID_USER=2
let ID_GUESS=3


const RUTA_SOLO_ADMINS = "/api/v1/tareas"
const RUTAS_PERMITIDAS_GUESS = ["/api/v1/tareas/usuario/estado", "/api/v1/tareas"]

//Middleware de autorización
const authorization = async (req, res, next) => {
    if (req.session && req.session.usuario) {
        if (req.session.usuario[0].id_profiles === ID_ADMIN) {
            // Si el usuario es administrador, puede acceder a todo
            next();
        }
        else if (req.session.usuario[0].id_profiles === ID_USER) {
            // Si el usuario es nivel usuario, puede acceder a todo excepto al GET de la ruta solo permitida a administradores
            if (req._parsedOriginalUrl.path === RUTA_SOLO_ADMINS && req.method === "GET") {
                res.status(401).json({ codError: 401, desc: "No eres administrador" })
            } else {
                next();
            }
        }
        else if (req.session.usuario[0].id_profiles === ID_GUESS) {
            // Si el usuario es invitado, solo puede acceder a ciertas rutas y solo con métodos POST
            if ((req.method === "POST" && RUTAS_PERMITIDAS_GUESS.includes(req._parsedOriginalUrl.path))) {
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


/*Funciones para asignar las variables el id correcto
async function asignarADMIN() {
    //console.log("asdasd");
     return Perfil.findADM( async function (err, result) {
        //console.log(result);
        //console.log(err);
        console.log("MW para admin: "+ result);
        if (err) {
            console.log("me he metido en el if");
            return  null
        } else {
            console.log("me he metido en el else");
            return  result
        }
    });
   
}


Perfil.findUser( function (err, result) {
    console.log("MW para usarios: "+result[0].id);
    if (err) {
        ID_USER = null
    } else {
        ID_USER = result[0].id
    }
});
 Perfil.findGUESS( function (err, result) {
    console.log("MW para invitados: "+result[0].id);
    if (err) {
        ID_GUESS = null
    } else {
        ID_GUESS = result[0].id
    }
});
*/