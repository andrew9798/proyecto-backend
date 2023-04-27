const dbConn = require("../config/db.config.mongo");

const usuario = [
    {
        usuario: "Andres",
        id_usuario: 1
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