const Comentario = require("../models/comentario.model")
const dbConn = require("../config/db.config.mongo");

const comentario = [

    {

        usuario: "Andres",
        id_articulo: 1,
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },
    {

        usuario: "Andres",
        id_articulo: 1,
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },
    {

        usuario: "Jose",
        id_articulo: 2,
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },    {

        usuario: "Antonio",
        id_articulo: 2,
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