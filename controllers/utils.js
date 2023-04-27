// Función para control de errores asíncrono
exports.wrapAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(e => {
            next(e)
        });
    }
}