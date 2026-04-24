const Registrador = require('../models/registrador');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener un registrador locatario   =>    /api/v1/registrador/:id
exports.obtenerRegistrador = catchAsyncErrors( async(req, res, next) => {
    const registrador = await Registrador.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : registrador
    })
});

// Crear un registrador locatario    =>  /api/v1/registrador
exports.crearRegistrador = catchAsyncErrors(async (req, res, next) => {
    const registrador = await Registrador.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Registrador creado.',
        data: registrador
    });
});

// Actualizar registrador locatario => /api/v1/registrador/:id
exports.actualizarRegistrador = catchAsyncErrors( async(req, res, next) => {
    let registrador = await Registrador.findById(req.params.id);

    if (!registrador){
        return next(new ErrorHandler('Registrador no encontrado', 404));
    }

    req.body.fecha_modificacion = Date.now()

    registrador = await Registrador.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Registrador actualizado.',
        data : registrador
    });
});

// Mostrar todos los  registradores   =>   /api/v1/registradores
exports.obtenerRegistradoresPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Registrador.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        
        Filters.query;

    res.status(200).json({
        success : true,
        results : registradors.length,
        data : registradores
    })
});

// obtener todos los registrador locatarios   =>    /api/v1/registradores
exports.obtenerRegistradores = catchAsyncErrors( async(req, res, next) => {
    const registradores = await Registrador.find();

    res.status(200).json({
        resultado : true,
        registros : registradores.length,
        data : registradores
    })
});

// Eliminar un registrador locatario   =>  /api/v1/registrador/:id
exports.borrarRegistrador = catchAsyncErrors(async (req, res, next) => {
    let registrador = await Registrador.findById(req.params.id);

    if (!registrador) {
        return next(new ErrorHandler('No existe el registrador', 404));
    }

    registrador = await Registrador.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Registrador eliminado.'
    });
})
