const Segmento = require('../models/segmento');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener un segmento   =>    /api/v1/segmento/:id
exports.obtenerSegmento = catchAsyncErrors( async(req, res, next) => {
    const segmento = await Segmento.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : segmento
    })
});

// Crear un segmento    =>  /api/v1/segmento
exports.crearSegmento = catchAsyncErrors(async (req, res, next) => {
    const segmento = await Segmento.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Segmento creado.',
        data: segmento
    });
});

// Actualizar segmento => /api/v1/segmento/:id
exports.actualizarSegmento = catchAsyncErrors( async(req, res, next) => {
    let segmento = await Segmento.findById(req.params.id);

    if (!segmento){
        return next(new ErrorHandler('Segmento no encontrado', 404));
    }

    req.body.fecha_modificacion = Date.now()

    segmento = await Segmento.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Segmento actualizado.',
        data : segmento
    });
});

// Mostrar todos los  segmentos   =>   /api/v1/segmentos
exports.obtenerSegmentosPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Segmento.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const segmentos = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : segmentos.length,
        data : segmentos
    })
});

// obtener todos los segmentos   =>    /api/v1/segmentos
exports.obtenerSegmentos = catchAsyncErrors( async(req, res, next) => {
    const segmentos = await Segmento.find();

    res.status(200).json({
        resultado : true,
        registros : segmentos.length,
        data : segmentos
    })
});

// Eliminar un segmento   =>  /api/v1/segmento/:id
exports.borrarSegmento = catchAsyncErrors(async (req, res, next) => {
    let segmento = await Segmento.findById(req.params.id);

    if (!segmento) {
        return next(new ErrorHandler('No existe el segmento', 404));
    }

    segmento = await Segmento.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Segmento eliminado.'
    });
})
