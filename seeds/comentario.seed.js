
const dbConn = require("../config/db.config.mongo");

const comentario = [

    {

        usuario: "Andres",
        id_usuario: 1,
        id_comentario: 1,
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },
    {

        usuario: "Andres",
        id_usuario: 1,
        id_comentario: 2,
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },
    {

        usuario: "Jose",
        id_usuario: 2,
        id_comentario: 3,
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    },    {

        usuario: "Antonio",
        id_usuario: 3,
        id_comentario: 4,
        titulo: "Buenas ilustraciones",
        cuerpo:"Estas ilustraciones son de calidad, hechas en diferentes tamaños "

    }

]

try {
    dbConn.conectar;
    Ejercicio.insertMany(ejercicios)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
} catch (err) {
    console.log("Error al conectar con la base de datos");
}