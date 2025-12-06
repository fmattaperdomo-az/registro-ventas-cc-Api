const mongoose = require('mongoose');

const parametroSchema = new mongoose.Schema({
    nombre_parametro : {
        type : String,
        required : [true, 'Ingrese la marca.'],
        trim : true,
        maxlength : [100, 'Nombre no puede superar los 100 caracteres.']
    },
    abreviatura : {
        type : String,
        trim : true,
        maxlength : [50, 'Abreviatura no puede superar los 50 caracteres.']
    },
    valor : {
        type : String,
        required : [true, 'Ingrese el valor.'],
        trim : true,
        maxlength : [250, 'Valor no puede superar los 250 caracteres.']
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
    }
});

module.exports = mongoose.model('Parametro', parametroSchema);
