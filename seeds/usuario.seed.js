const Usuario = require("../models/usuario.model");
const dbConn = require("../config/db.config.mongo");

const usuario = [
    {
        usuario: "Jero",
        correo: "jeronimo1298@gmail.com",
        contrasenya: "12345678",
        id_profile: 1
    },    
    {
        usuario: "Andres",
        correo: "andresganga1298@gmail.com",
        contrasenya: "12345678",
        id_profile: 2
    },
    {
        usuario: "Jose",
        correo: "jose@gmail.com",
        contrasenya: "12345678",
        id_profile: 2
    }  
]

try {
    dbConn.conectar;
    Usuario.insertMany(usuario)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
} catch (err) {
    console.log("Error al conectar con la base de datos");
}