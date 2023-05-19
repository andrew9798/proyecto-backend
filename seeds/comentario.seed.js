const Comentario = require("../models/comentario.model")
const dbConn = require("../config/db.config.mongo");

const comentario = [

    {

        usuario: "Andres",
        id_usuario: "6467c116201942560a904b18",
        id_articulo: "6467c22755d4e8e74d1e94d1",
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },
    {

        usuario: "Andres",
        id_usuario: "6467c116201942560a904b18",
        id_articulo: "6467c22755d4e8e74d1e94cf",
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },
    {

        usuario: "Jose",
        id_usuario: "6467c116201942560a904b19",
        id_articulo: "6467c22755d4e8e74d1e94cf",
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },    {

        usuario: "jose",
        id_usuario: "6467c116201942560a904b19",
        id_articulo: "6467c22755d4e8e74d1e94d0",
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    }

]

try {
    dbConn.conectar;
    Comentario.insertMany(comentario)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
} catch (err) {
    console.log("Error al conectar con la base de datos");
}