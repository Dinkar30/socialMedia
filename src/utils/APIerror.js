class APIerror extends Error {
    constructor(statusCode , message = "Something's wrong", errors ){
        super(message)
        this.statusCode = statusCode
        this.name = this.constructor.name
        this.success = false
        this.errors = errors
    }

}

export {APIerror}
