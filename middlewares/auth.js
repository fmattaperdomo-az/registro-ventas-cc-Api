const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Valida la autenticación del usuario
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    console.log(token);

    if(!token) {
        return next(new ErrorHandler('Primero Login para acceder a este recurso.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id);

    next();
});

// Manejo de los roles de usuarios
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.usuario.rol)) {
            return next(new ErrorHandler(`Rol(${req.usuario.rol}) No se permite el acceso a este recurso.`, 403))
        }
        next();
    }
}
