const Venta = require('../models/venta');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFilters = require('../utils/apiFilters');

// obtener un venta   =>    /api/v1/venta/:id
exports.obtenerVenta = catchAsyncErrors( async(req, res, next) => {
    const venta = await Venta.findById(req.params.id);

    res.status(200).json({
        resultado : true,
        data : venta
    })
});

// Crear una nueva venta    =>  /api/v1/venta
exports.crearVenta =  catchAsyncErrors(async(req, res, next) => {  
    var venta = await Venta.create(req.body);

    res.status(200).json({
        resultado: true,
        Mensaje: 'Venta regitrada.',
        data: venta
    });
});

// Obtener todos los registros de ventas   =>  /api/v1/ventas
exports.obtenerVentasPaginada = catchAsyncErrors(async (req, res, next) => {
    const apiFilters = new APIFilters(Venta.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .searchByQuery()
        .pagination();
 
    const ventas = await apiFilters.query;

    res.status(200).json({
        resultado: true,
        registros: ventas.length,
        data: ventas
    });
});

// Obtener todos los registros de ventas por Locatario   =>  /api/v1/ventas/:locatario
exports.obtenerVentasLocatario = catchAsyncErrors(async (req, res, next) => {
    const ventas = await Venta.find({locatario : req.params.locatario});

    res.status(200).json({
        resultado: true,
        registros: ventas.length,
        data: ventas
    });
});

// Obtener todos los registros de ventas por centro comercial   =>  /api/v1/ventas/centroComercial/:centroComercial
exports.obtenerVentasCentroComercial = catchAsyncErrors(async (req, res, next) => {
    const ventas = await Venta.find({centro_comercial : req.params.centroComercial});
    
    if(!ventas){
        return next(new ErrorHandler('Venta no encontrada', 404));
    }

    res.status(200).json({
        resultado: true,
        registros: ventas.length,
        data: ventas
    });
});

// Obtener una venta dado un locatario y una fecha fecha (yyyy/MM/dd) =>  /api/v1/ventas/:locatario/:fecha_registro
exports.obtenerVentasLocatarioFecha = catchAsyncErrors(async (req, res, next) => {
    const venta = await Venta.find({ $and: [{ locatario: req.params.locatario }, { fecha_registro: req.params.fecha_registro }] }).populate({
        path: 'venta',
        select: 'mes anio venta fecha_registro locatario'
    });

    if (!venta || venta.length === 0) {
        return next(new ErrorHandler('Venta no encontrada', 404));
    }

    res.status(200).json({
        resultado: true,
        data: venta
    });
});

// obtener todas las ventas un locatario y un rango de fecha    =>   /api/v1/ventas/:locatario/:fechaIni/:fechaFin
exports.obtenerVentasLocatarioRangoFechas = catchAsyncErrors( async (req, res, next) => {
const ventas = await Venta.find({ $and: [{ locatario: req.params.locatario }, { fecha_registro: {$gte: fechaInicio, $lt: fechaFinal} }] }).populate({
        path: 'venta',
        select: 'mes anio venta fecha_registro locatario'
    });

    if (!venta || venta.length === 0) {
        return next(new ErrorHandler('Venta no encontrada', 404));
    }

    res.status(200).json({
        success : true,
        results : ventas.length,
        data : ventas
    })
});

// Actualizar un venta  =>  /api/v1/venta/:id
exports.actualizarVenta = catchAsyncErrors(async (req, res, next) => {
    var venta = await Venta.findById(req.params.id);

    if (!venta) {
        return next(new ErrorHandler('Venta no encontrada', 404));
    }

    // Validar el rol 
    //if (venta.registrador_locatario.toString() !== req.usuario.id && req.usuario.rol !== 'administrador_centro_comercial') {
    //    return next(new ErrorHandler(`Usuario (${req.user.id}) no tiene autorización para modificar esta venta.`))
    //}

    // update fecha_modificacion to body
    req.body.fecha_modificacion = Date.now();

    venta = await Venta.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        resultado: true,
        mensaje: 'Venta actualizada.',
        data: venta
    });
});


// obtiene la estadística dato un topic(venta)  =>  /api/v1/estadistica/:topico
exports.estadisticasVentas = catchAsyncErrors(async (req, res, next) => {
    const stats = await Venta.aggregate([
        {
            $match: { mes: { $exists: "\"" + req.params.topico + "\""  }} 
        },
        {
            $group: {
                _id: { $toUpper: '$mes' },
                totalVentas: { $sum: 1 },
                avgVenta: { $avg: '$venta' },
                minVenta: { $min: '$venta' },
                maxVenta: { $max: '$venta' }                
            }
        }
    ]);

    if (stats.length === 0) {
        return next(new ErrorHandler(`No existe estadística para  - ${req.params.topic}`, 200));
    }

    res.status(200).json({
        resultado: true,
        data: stats
    });
});


