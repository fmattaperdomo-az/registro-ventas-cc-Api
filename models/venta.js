const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
    mes : {
        type : String,
        required : [true, "Ingrese el mes."],
        enum : {
            values : [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            message : "Seleccione correctamente las opciones del mes."
        }
    },
    anio : {
        type : Number,
        required : [true, "Ingrese el Año."],
        trim : true,
        maxlength : [4, "Año no puede superar los 4 caracteres."]
    },
    dia : {
        type : Number,
        required : [true, "Ingrese el día."],
        trim : true,
        maxlength : [2, "Día no puede superar los 2 caracteres."]
    },
    validado : {
        type : Number,
        required : [true, "Ingrese si es validado."],
        maxlength : [1, "Validado no puede superar los 1 caracteres."]
    },
    no_tiene_ingreso : {
        type : Number,
        required : [true, "Ingrese si no tiene ingreso."],
        maxlength : [1, "No tiene ingreso no puede superar los 1 caracteres."]
    },
    venta : {
        type : Number,
        required : [true, "La venta del día."],
        trim : true,
        maxlength : [10, "Venta no puede superar los 10 caracteres."]
    },
    fecha_registro : {
        type : Date,
        default : Date.now
    },
    fecha_modificacion : {
        type : Date,
        default : Date.now
    },
    usuario_registro : {
        type : mongoose.Schema.ObjectId,
        ref : 'Usuario',
        required : true
    },
    locatario : {
        type : mongoose.Schema.ObjectId,
        ref : 'Locatario',
        required : true
    },
    centro_comercial : {
        type : mongoose.Schema.ObjectId,
        ref : 'Centro_Comercial',
        required : true
    }
});

module.exports = mongoose.model('Venta', ventaSchema);