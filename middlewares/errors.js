const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'desarollo') {
        res.status(err.statusCode).json({
            resultado : false,
            error : err,
            errMensaje : err.message,
            pila : err.stack
        });
    }

    if(process.env.NODE_ENV === 'produccion') {
        let error = {...err};

        error.message = err.message;

        // Error ID objeto Mongoose
        if(err.name === 'CastError') {
            const message = `Recurso no encontrado. Inválido: ${err.path}`;
            error = new ErrorHandler(message, 404);
        }

        // Menejo de errores de validación  Mongoose
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        // Manejo de errores de duplicidad 
        if(err.code === 11000) {
            const message = `Duplicado ${Object.keys(err.keyValue)} ingresado.`;
            error = new ErrorHandler(message, 400);
        }

        // Menejo de errores JWT token 
        if(err.name === 'JsonWebTokenError') {
            const message = 'JSON Web token es invalido. Envie nuevamente!';
            error = new ErrorHandler(message, 500);
        }

        // Manejo de errores de expiración JWT token
        if(err.name === 'TokenExpiredError') {
            const message = 'JSON Web token esta expirado. Envie nuevamente!';
            error = new ErrorHandler(message, 500);
        }

        res.status(error.statusCode).json({
            resultado : false,
            mensaje : error.message || 'Error Interno del servidor.'
        })

    }

}