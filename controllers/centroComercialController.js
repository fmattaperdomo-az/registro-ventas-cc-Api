const CentroComercial = require('../models/centroComercial');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener un centro comercial   =>    /api/v1/centroComercial/:id
exports.obtenerCentroComercial = catchAsyncErrors( async(req, res, next) => {
    const centroComercial = await CentroComercial.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : centroComercial
    })
});

// Crear un centro comercial    =>  /api/v1/centroComercial
exports.crearCentroComercial = catchAsyncErrors(async (req, res, next) => {
    const centroComercial = await CentroComercial.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Centro comercial creado.',
        data: centroComercial
    });
});

// Actualizar centro comercial => /api/v1/centroComercial/:id
exports.actualizarCentroComercial = catchAsyncErrors( async(req, res, next) => {
    let centroComercial = await CentroComercial.findById(req.params.id);

    if (!centroComercial){
        return next(new ErrorHandler('Centro comerical no encontrada', 404));
    }

    req.body.fecha_modificacion = Date.now()

    centroComercial = await CentroComercial.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Centro comercial actualizado.',
        data : centroComercial
    });

});

// Mostrar todos los  centro comercial   =>   /api/v1/centroComerciales
exports.obtenerCentroComercialesPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(CentroComercial.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const centroComerciales = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : centroComerciales.length,
        data : centroComerciales
    })
});

// obtener todos los centro comerciales   =>    /api/v1/centroComerciales
exports.obtenerCentroComerciales = catchAsyncErrors( async(req, res, next) => {
    const centroComerciales = await CentroComercial.find();

    res.status(200).json({
        resultado : true,
        registros : centroComerciales.length,
        data : centroComerciales
    })
});

// Eliminar un centro comercial   =>  /api/v1/centroComercial/:id
exports.borrarCentroComercial = catchAsyncErrors(async (req, res, next) => {
    let centroComercial = await CentroComercial.findById(req.params.id);

    if (!centroComercial) {
        return next(new ErrorHandler('No existe el centro comercial', 404));
    }

    centroComercial = await CentroComercial.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Centro Comercial eliminado.'
    });

})


