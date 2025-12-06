const Usuario = require('../models/usuario');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const APIFilters = require('../utils/apiFilters');

// Actualizar clave    =>    /api/v1/clave/actualizar
exports.actualizarClave = catchAsyncErrors( async(req, res, next) => {
    const usuario = await Usuario.findById(req.usuario.id).select('+password');

    // Validar clave
    const isMatched = await usuario.comparePassword(req.body.actualClave);
    if(!isMatched) {
        return next(new ErrorHandler('Clave anterior es incorrecta.', 401));
    }

    usuario.clave = req.body.nuevaClave;
    await usuario.save();

    sendToken(usuario, 200, res);
});

// Actualizar usuario    =>    /api/v1/usuario/actualizar
exports.actualizarUsuario = catchAsyncErrors( async(req, res, next) => {
    const nuevoUsuarioData = {
        nombre_completo : req.body.nombre_completo,
        correo : req.body.correo
    }

    const usuario = await Usuario.findByIdAndUpdate(req.user.id, nuevoUsuarioData, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        data : usuario
    });
});


// Solamente para administradores y/o registrador de centros comerciales
// Mostrar todos los usuarios del sistema  =>   /api/v1/usuarios
exports.obtenerUsuarios = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Usuario.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const usuarios = await apiFilters.query;

    res.status(200).json({
        resultado : true,
        registros : usuarios.length,
        data : usuarios
    })
});

