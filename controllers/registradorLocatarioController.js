const RegistradorLocatario = require('../models/registradorLocatario');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener un registrador locatario   =>    /api/v1/registradorLocatario/:id
exports.obtenerRegistradorLocatario = catchAsyncErrors( async(req, res, next) => {
    const registradorLocatario = await RegistradorLocatario.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : registradorLocatario
    })
});

// Crear un registrador locatario    =>  /api/v1/registradorLocatario
exports.crearRegistradorLocatario = catchAsyncErrors(async (req, res, next) => {
    const registradorLocatario = await RegistradorLocatario.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Registrador Locatario creado.',
        data: registradorLocatario
    });
});

// Actualizar registrador locatario => /api/v1/registradorLocatario/:id
exports.actualizarRegistradorLocatario = catchAsyncErrors( async(req, res, next) => {
    let registradorLocatario = await RegistradorLocatario.findById(req.params.id);

    if (!registradorLocatario){
        return next(new ErrorHandler('Registrador Locatario no encontrado', 404));
    }

    req.body.fecha_modificacion = Date.now()

    registradorLocatario = await RegistradorLocatario.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Registrador Locatario actualizado.',
        data : registradorLocatario
    });
});

// Mostrar todos los  registradorLocatarios   =>   /api/v1/registradorLocatarios
exports.obtenerRegistradorLocatariosPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(RegistradorLocatario.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const registradorLocatarios = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : registradorLocatarios.length,
        data : registradorLocatarios
    })
});

// obtener todos los registrador locatarios   =>    /api/v1/registradorLocatarios
exports.obtenerRegistradorLocatarios = catchAsyncErrors( async(req, res, next) => {
    const registradorLocatarios = await RegistradorLocatario.find();

    res.status(200).json({
        resultado : true,
        registros : registradorLocatarios.length,
        data : registradorLocatarios
    })
});

// Eliminar un registrador locatario   =>  /api/v1/registradorLocatario/:id
exports.borrarRegistradorLocatario = catchAsyncErrors(async (req, res, next) => {
    let reigstradorLocatario = await RegistradorLocatario.findById(req.params.id);

    if (!reigstradorLocatario) {
        return next(new ErrorHandler('No existe el registrador locatario', 404));
    }

    reigstradorLocatario = await RegistradorLocatario.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Registrador Locatario eliminado.'
    });
})
