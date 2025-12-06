const RegistradorCentroComercial = require('../models/registradorCentroComercial');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener un registrador centro comercial   =>    /api/v1/registradorCentroComercial/:id
exports.obtenerRegistradorCentroComercial = catchAsyncErrors( async(req, res, next) => {
    const registradorCentroComercial = await RegistradorCentroComercial.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : registradorCentroComercial
    })
});

// Crear un registrador centro comercial    =>  /api/v1/registradorCentroComercial
exports.crearRegistradorCentroComercial = catchAsyncErrors(async (req, res, next) => {
    const registradorCentroComercial = await RegistradorCentroComercial.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Registrador Centro Comercial creado.',
        data: registradorCentroComercial
    });
});

// Actualizar registrador centro comercial => /api/v1/registradorCentroComercial/:id
exports.actualizarRegistradorCentroComercial = catchAsyncErrors( async(req, res, next) => {
    let registradorCentroComercial = await RegistradorCentroComercial.findById(req.params.id);

    if (!registradorCentroComercial){
        return next(new ErrorHandler('Registrador Locatario no encontrado', 404));
    }

    req.body.fecha_modificacion = Date.now()

    registradorCentroComercial = await RegistradorCentroComercial.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Registrador Centro Comercial actualizado.',
        data : registradorCentroComercial
    });
});

// Mostrar todos los  registrador centro comerciales   =>   /api/v1/registradorCentroComerciales
exports.obtenerRegistradorCentroComercialesPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(RegistradorCentroComercial.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const registradorCentroComerciales = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : registradorCentroComerciales.length,
        data : registradorCentroComerciales
    })
});

// obtener todos los registrador centro comerciales   =>    /api/v1/registradorCentroComerciales
exports.obtenerRegistradorCentroComerciales = catchAsyncErrors( async(req, res, next) => {
    const registradorCentroComerciales = await RegistradorCentroComercial.find();

    res.status(200).json({
        resultado : true,
        registros : registradorCentroComerciales.length,
        data : registradorCentroComerciales
    })
});

// Eliminar un registrador centro comercial   =>  /api/v1/registradorCentroComercial/:id
exports.borrarRegistradorCentroComercial = catchAsyncErrors(async (req, res, next) => {
    let registradorCentroComercial = await RegistradorCentroComercial.findById(req.params.id);

    if (!registradorCentroComercial) {
        return next(new ErrorHandler('No existe el registrador centro comercial', 404));
    }

    registradorCentroComercial = await RegistradorCentroComercial.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Registrador Locatario eliminado.'
    });
})
