const mongoose = require('mongoose');

const tipoDocumentoSchema = new mongoose.Schema({
    nombre_tipo_documento : {
        type : String,
        required : [true, 'Ingrese el nombre de documento.'],
        trim : true,
        maxlength : [100, 'Nombre de documento no puede superar los 100 caracteres.']
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

module.exports = mongoose.model('tipo_documento', tipoDocumentoSchema);
