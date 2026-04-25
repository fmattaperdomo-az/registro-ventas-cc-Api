const mongoose = require('mongoose');
const validator = require('validator');

const registradorSchema = new mongoose.Schema({
    nombre_completo : {
        type : String,
        required : [true, 'Ingrese su nombre completo'],
        trim : true,
        maxlength : [200, 'Nombre completo no puede superar los 200 caracteres.']
    },
    tipo_documento : {
        type : mongoose.Schema.ObjectId,
        ref : 'Tipo_Documento',
        required : [true, 'Ingrese el código del Tipo Documento.'],
    },
    numero_documento : {
        type : String,
        required : [true, 'Ingrese el número de documento.'],
        trim : true,
        maxlength : [20, 'Documento no puede superar los 20 caracteres.']
    },
    telefono : {
        type : String,
        required : [true, 'Ingrese su teléfono.'],
        trim : true,
        maxlength : [20, 'Teléfono no puede superar los 20 caracteres.']
    },
    correo : {
        type : String,
        required : [true, 'Ingrese su correo electrónico.'],
        trim : true,
        maxlength : [100, 'Correo electrónico no puede superar los 100 caracteres.'],
        unique : true,
        validate : [validator.isEmail, 'Ingrese un correo electrónico válido']
    },
    tipo_registrador : {
        type : String,
        required : [true, 'Ingrese el tipo de registrador.'],
        enum : {
            values : [
                'Principal',
                'Secundario'
            ],
            message : 'Seleccione las opciones del tipo de documento.'
        },        
        default : 'Principal'
    },
    estado : {
        type : String,
        enum : {
            values : ['activo', 'inactivo'],
            message : 'Por favor seleccione un estado correcto'
        },
        required : [true, 'Seleccione el estado que es obligatorio'],
        default : 'activo'
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
    centro_comercial : {
        type : mongoose.Schema.ObjectId,
        ref : 'Centro_Comercial',
        required : true
    },
    locatario : {
        type : String,
        default : ''
    }
});

module.exports = mongoose.model('Registrador', registradorSchema);
