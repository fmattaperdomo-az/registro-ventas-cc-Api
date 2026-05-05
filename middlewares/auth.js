const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Valida la autenticación del usuario
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new ErrorHandler('Primero Login para acceder a este recurso.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuarioId = decoded.id || decoded._id;

    if(!usuarioId || !mongoose.Types.ObjectId.isValid(usuarioId)) {
        return next(new ErrorHandler('Token inválido. Vuelva a iniciar sesión.', 401));
    }

    req.usuario = await Usuario.findById(usuarioId);

    if(!req.usuario) {
        return next(new ErrorHandler('Usuario no encontrado. Vuelva a iniciar sesión.', 401));
    }

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
