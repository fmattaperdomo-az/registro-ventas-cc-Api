const Marca = require('../models/marca');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');
 
// obtener una marca   =>    /api/v1/marca/:id
exports.obtenerMarca = catchAsyncErrors( async(req, res, next) => {
    const marca = await Marca.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : marca
    })
});

// Crear una marca    =>  /api/v1/marca
exports.crearMarca = catchAsyncErrors(async (req, res, next) => {
    const marca = await Marca.create(req.body);

    res.status(200).json({
        resultado: true,
        mensaje: 'Marca creada.',
        data: marca
    });
});

// Actualizar marca => /api/v1/marca/:id
exports.actualizarMarca = catchAsyncErrors( async(req, res, next) => {
    let marca = await Marca.findById(req.params.id);

    if (!marca){
        return next(new ErrorHandler('Marca no encontrada', 404));
    }

    req.body.fecha_modificacion = Date.now()

    marca = await Marca.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        resultado : true,
        mensaje: 'Marca actualizada.',
        data : marca
    });

});

// Mostrar todos las marcas   =>   /api/v1/marcas
exports.obtenerMarcasPaginada = catchAsyncErrors( async (req, res, next) => {
    const apiFilters = new APIFilters(Marca.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const marcas = await apiFilters.query;

    res.status(200).json({
        success : true,
        results : marcas.length,
        data : marcas
    })
});

// obtener todas las marcas   =>    /api/v1/marcas
exports.obtenerMarcas = catchAsyncErrors( async(req, res, next) => {
    const marcas = await Marca.find();

    res.status(200).json({
        resultado : true,
        registros : marcas.length,
        data : marcas
    })
}); 

// Eliminar una marca   =>  /api/v1/marca/:id
exports.borrarMarca = catchAsyncErrors(async (req, res, next) => {
    let marca = await Marca.findById(req.params.id);

    if (!marca) {
        return next(new ErrorHandler('No existe la marca', 404));
    }

    marca = await Marca.findByIdAndDelete(req.params.id);

    res.status(200).json({
        resultado: true,
        mensaje: 'Marca eliminada.'
    });
})

