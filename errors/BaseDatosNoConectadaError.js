class BaseDatosNoConectadaError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = 500;
    }
}

module.exports = BaseDatosNoConectadaError;