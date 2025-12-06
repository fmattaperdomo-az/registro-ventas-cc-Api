const Locatario = require('../models/locatario');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener un locatario   =>    /api/v1/locatario/:id
exports.obtenerLocatario = catchAsyncErrors( async(req, res, next) => {
    const locatario = await Locatario.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : locatario
    })
});

// Crear un locatario    =>  /api/v1/locatario
exports.crearLocatario = catchAsyncErrors(async (req, res, next) => {
    const locatario = await Locatario.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Locatario creado.',
        data: locatario
    });
});

// Actualizar locatario => /api/v1/locatario/:id
exports.actualizarLocatario = catchAsyncErrors( async(req, res, next) => {
    let locatario = await Locatario.findById(req.params.id);

    if (!locatario){
        return next(new ErrorHandler('Locatario no encontrado', 404));
    }

    req.body.fecha_modificacion = Date.now()

    locatario = await Locatario.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Locatario actualizado.',
        data : locatario
    });
});

// Mostrar todos los  locatarios   =>   /api/v1/locatarios
exports.obtenerLocatariosPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Locatario.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const locatarios = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : locatarios.length,
        data : locatarios
    })
});

// obtener todos los locatarios   =>    /api/v1/locatarios
exports.obtenerLocatarios = catchAsyncErrors( async(req, res, next) => {
    const locatarios = await Locatario.find();

    res.status(200).json({
        resultado : true,
        registros : locatarios.length,
        data : locatarios
    })
});

// Eliminar un locatario   =>  /api/v1/locatario/:id
exports.borrarLocatario = catchAsyncErrors(async (req, res, next) => {
    let locatario = await Locatario.findById(req.params.id);

    if (!locatario) {
        return next(new ErrorHandler('No existe el locatario', 404));
    }

    locatario = await Locatario.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Locatario eliminado.'
    });
})
