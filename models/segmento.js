const mongoose = require('mongoose');

const segmentoSchema = new mongoose.Schema({
    nombre_segmento : {
        type : String,
        required : [true, 'Ingrese el segmento.'],
        trim : true,
        maxlength : [100, 'Nombre no puede superar los 100 caracteres.']
    },
    abreviatura : {
        type : String,
        trim : true,
        maxlength : [50, 'Abreviatura no puede superar los 50 caracteres.']
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

module.exports = mongoose.model('Segmento', segmentoSchema);
