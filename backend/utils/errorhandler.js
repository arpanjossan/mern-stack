// class ErrorHandler extends Error{
//     constructor(message,statusCode){
//         super(message);
//         this.statusCode = statusCode

//         Error.captureStackTrace(this,this.statusCode)
//     }
// }

// module.exports = ErrorHandler
class ErrorHander extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHander