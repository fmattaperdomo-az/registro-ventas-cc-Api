const Parametro = require('../models/parametro');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener un parametro   =>    /api/v1/parametro/:id
exports.obtenerParametro = catchAsyncErrors( async(req, res, next) => {
    const parametro = await Parametro.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : parametro
    })
});

// Crear un parametro    =>  /api/v1/parametro
exports.crearParametro = catchAsyncErrors(async (req, res, next) => {
    const parametro = await Parametro.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Parámetro creado.',
        data: parametro
    });
});

// Actualizar parámetro => /api/v1/parametro/:id
exports.actualizarParametro = catchAsyncErrors( async(req, res, next) => {
    let parametro = await Parametro.findById(req.params.id);

    if (!parametro){
        return next(new ErrorHandler('Parámetro no encontrado', 404));
    }

    req.body.fecha_modificacion = Date.now()

    parametro = await Parametro.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Parámetro actualizado.',
        data : parametro
    });
});

// Mostrar todos los  parametros   =>   /api/v1/parametros
exports.obtenerParametrosPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Parametro.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const parametros = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : parametros.length,
        data : parametros
    })
});

// obtener todos los parametros   =>    /api/v1/parametros
exports.obtenerParametros = catchAsyncErrors( async(req, res, next) => {
    const parametros = await Parametro.find();

    res.status(200).json({
        resultado : true,
        registros : parametros.length,
        data : parametros
    })
});

// Eliminar un parametro   =>  /api/v1/parametro/:id
exports.borrarParametro = catchAsyncErrors(async (req, res, next) => {
    let parametro = await Parametro.findById(req.params.id);

    if (!parametro) {
        return next(new ErrorHandler('No existe el parametro', 404));
    }

    parametro = await Parametro.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Parametro eliminado.'
    });
})
