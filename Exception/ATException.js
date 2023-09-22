class ATException extends Error {
    constructor(code, message, ...params) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ATException)
        }
        this.code = code
        this.message = message
    }

}
module.exports = ATException