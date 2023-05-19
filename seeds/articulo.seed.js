const Articulo = require("../models/articulos.model");
const dbConn = require("../config/db.config.mongo");

const articulo =[

    {
        titulo: "Articulo 1",
        cuerpo: "Lorem  dolor sit amet, consectetur adipiscing elit. Pellentesque at dui maximus, tristique neque non, pharetra nibh. Aenean ultrices vestibulum felis, at commodo ligula euismod varius. Cras vitae orci augue. Nam vel bibendum dolor. Vestibulum pharetra dui at eros fringilla consectetur. Duis vel ipsum vel eros molestie tincidunt sed et odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam magna augue, maximus in molestie et, ultrices ac erat. Nunc euismod ligula nec risus elementum lobortis. Etiam dictum molestie finibus. Praesent vel magna cursus, feugiat odio vel, auctor enim. Proin volutpat vitae nisl nec tempor. Etiam maximus vel leo dapibus pulvinar. Pellentesque molestie sem ac nisi sagittis malesuada. Integer et placerat tellus. Vivamus placerat leo eu mauris accumsan, vestibulum tempor neque vehicula. Integer feugiat condimentum feugiat. In eget leo vitae leo porta mollis. Quisque vel facilisis est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed hendrerit mi sit amet orci sodales, nec suscipit sapien pretium. Nunc venenatis semper rhoncus. Sed at quam aliquet dui tincidunt egestas. Proin sit amet condimentum velit. Curabitur viverra lacinia leo, eget sollicitudin tortor rutrum ac. Nulla justo sapien, porttitor non leo in, tempus vulputate enim. Nulla porttitor turpis vel mollis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec gravida purus a tortor efficitur, vitae consectetur diam mollis. Praesent cursus accumsan magna in dignissim. Vestibulum porta felis id dui sollicitudin, id pellentesque lorem accumsan. Praesent ultricies ultricies sollicitudin. Sed in rutrum mi. Nulla massa purus, tempus ut consequat a, laoreet vitae libero. Nam ut ante non massa volutpat hendrerit.",
        id_usuario: "64629c64621d603399944600",
        imagen: "https://th.bing.com/th/id/R.babd7148b97046f5e14b79ac81767d71?rik=ju%2fnCLmMpBelWQ&pid=ImgRaw&r=0"
    },

    {
        titulo: "Articulo 2",
        cuerpo: "Lorem  dolor sit amet, consectetur adipiscing elit. Pellentesque at dui maximus, tristique neque non, pharetra nibh. Aenean ultrices vestibulum felis, at commodo ligula euismod varius. Cras vitae orci augue. Nam vel bibendum dolor. Vestibulum pharetra dui at eros fringilla consectetur. Duis vel ipsum vel eros molestie tincidunt sed et odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam magna augue, maximus in molestie et, ultrices ac erat. Nunc euismod ligula nec risus elementum lobortis. Etiam dictum molestie finibus. Praesent vel magna cursus, feugiat odio vel, auctor enim. Proin volutpat vitae nisl nec tempor. Etiam maximus vel leo dapibus pulvinar. Pellentesque molestie sem ac nisi sagittis malesuada. Integer et placerat tellus. Vivamus placerat leo eu mauris accumsan, vestibulum tempor neque vehicula. Integer feugiat condimentum feugiat. In eget leo vitae leo porta mollis. Quisque vel facilisis est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed hendrerit mi sit amet orci sodales, nec suscipit sapien pretium. Nunc venenatis semper rhoncus. Sed at quam aliquet dui tincidunt egestas. Proin sit amet condimentum velit. Curabitur viverra lacinia leo, eget sollicitudin tortor rutrum ac. Nulla justo sapien, porttitor non leo in, tempus vulputate enim. Nulla porttitor turpis vel mollis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec gravida purus a tortor efficitur, vitae consectetur diam mollis. Praesent cursus accumsan magna in dignissim. Vestibulum porta felis id dui sollicitudin, id pellentesque lorem accumsan. Praesent ultricies ultricies sollicitudin. Sed in rutrum mi. Nulla massa purus, tempus ut consequat a, laoreet vitae libero. Nam ut ante non massa volutpat hendrerit.",
        id_usuario: "64629c64621d603399944600",
        imagen: "https://th.bing.com/th/id/R.babd7148b97046f5e14b79ac81767d71?rik=ju%2fnCLmMpBelWQ&pid=ImgRaw&r=0"
    },
    {
        titulo: "Articulo 3",
        cuerpo: "Lorem  dolor sit amet, consectetur adipiscing elit. Pellentesque at dui maximus, tristique neque non, pharetra nibh. Aenean ultrices vestibulum felis, at commodo ligula euismod varius. Cras vitae orci augue. Nam vel bibendum dolor. Vestibulum pharetra dui at eros fringilla consectetur. Duis vel ipsum vel eros molestie tincidunt sed et odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam magna augue, maximus in molestie et, ultrices ac erat. Nunc euismod ligula nec risus elementum lobortis. Etiam dictum molestie finibus. Praesent vel magna cursus, feugiat odio vel, auctor enim. Proin volutpat vitae nisl nec tempor. Etiam maximus vel leo dapibus pulvinar. Pellentesque molestie sem ac nisi sagittis malesuada. Integer et placerat tellus. Vivamus placerat leo eu mauris accumsan, vestibulum tempor neque vehicula. Integer feugiat condimentum feugiat. In eget leo vitae leo porta mollis. Quisque vel facilisis est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed hendrerit mi sit amet orci sodales, nec suscipit sapien pretium. Nunc venenatis semper rhoncus. Sed at quam aliquet dui tincidunt egestas. Proin sit amet condimentum velit. Curabitur viverra lacinia leo, eget sollicitudin tortor rutrum ac. Nulla justo sapien, porttitor non leo in, tempus vulputate enim. Nulla porttitor turpis vel mollis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec gravida purus a tortor efficitur, vitae consectetur diam mollis. Praesent cursus accumsan magna in dignissim. Vestibulum porta felis id dui sollicitudin, id pellentesque lorem accumsan. Praesent ultricies ultricies sollicitudin. Sed in rutrum mi. Nulla massa purus, tempus ut consequat a, laoreet vitae libero. Nam ut ante non massa volutpat hendrerit.",
        id_usuario: 1,
        imagen: "https://th.bing.com/th/id/R.babd7148b97046f5e14b79ac81767d71?rik=ju%2fnCLmMpBelWQ&pid=ImgRaw&r=0"
    }

]

try {
    dbConn.conectar;
    Articulo.insertMany(articulo)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
} catch (err) {
    console.log("Error al conectar con la base de datos");
}