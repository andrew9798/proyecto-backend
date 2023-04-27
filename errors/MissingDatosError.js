class MissingDatosError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = 406;
    }
}

module.exports = MissingDatosError;