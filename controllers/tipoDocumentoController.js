const TipoDocumento = require('../models/tipoDocumento');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener una tipoDocumento   =>    /api/v1/tipoDocumento/:id
exports.obtenerTipoDocumento = catchAsyncErrors( async(req, res, next) => {
    const tipoDocumento = await TipoDocumento.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : tipoDocumento
    })
});

// Crear una tipoDocumento    =>  /api/v1/tipoDocumento
exports.crearTipoDocumento = catchAsyncErrors(async (req, res, next) => {
    const tipoDocumento = await TipoDocumento.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'TipoDocumento creada.',
        data: tipoDocumento
    });
});

// Actualizar tipoDocumento => /api/v1/tipoDocumento/:id
exports.actualizarTipoDocumento = catchAsyncErrors( async(req, res, next) => {
    let tipoDocumento = await TipoDocumento.findById(req.params.id);

    if (!tipoDocumento){
        return next(new ErrorHandler('TipoDocumento no encontrada', 404));
    }

    req.body.fecha_modificacion = Date.now()

    tipoDocumento = await TipoDocumento.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'TipoDocumento actualizada.',
        data : tipoDocumento
    });

});

// Mostrar todos las tipoDocumentos   =>   /api/v1/tipoDocumentos
exports.obtenerTipoDocumentosPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(TipoDocumento.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const tipoDocumentos = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : tipoDocumentos.length,
        data : tipoDocumentos
    })
});

// obtener todas las tipoDocumentos   =>    /api/v1/tipoDocumentos
exports.obtenerTipoDocumentos = catchAsyncErrors( async(req, res, next) => {
    const tipoDocumentos = await TipoDocumento.find();

    res.status(200).json({
        resultado : true,
        registros : tipoDocumentos.length,
        data : tipoDocumentos
    })
}); 

// Eliminar una tipoDocumento   =>  /api/v1/tipoDocumento/:id
exports.borrarTipoDocumento = catchAsyncErrors(async (req, res, next) => {
    let tipoDocumento = await TipoDocumento.findById(req.params.id);

    if (!tipoDocumento) {
        return next(new ErrorHandler('No existe el tipo de documento', 404));
    }

    tipoDocumento = await TipoDocumento.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'TipoDocumento eliminada.'
    });
})

