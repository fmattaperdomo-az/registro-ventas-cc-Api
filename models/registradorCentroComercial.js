const mongoose = require('mongoose');
const validator = require('validator');

const registrador_centro_comercialSchema = new mongoose.Schema({
    nombres : {
        type : String,
        required : [true, 'Ingrese los nombres.'],
        trim : true,
        maxlength : [100, 'Nombres no puede superar los 100 caracteres.']
    },
    apellidos : {
        type : String,
        required : [true, 'Ingrese sus apellidos.'],
        trim : true,
        maxlength : [100, 'Apellidos no puede superar los 100 caracteres.']
    },
    tipo_documento : {
        type : String,
        required : [true, 'Ingrese Tipo de documento.'],
        enum : {
            values : [
                'Tarjeta de Identidad',
                'Cédula',
                'NUIP',
                'Pasaporte'
            ],
            message : 'Seleccione las opciones del tipo de documento.'
        },        
        default : 'Cédula'
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
    }     
});

module.exports = mongoose.model('administrador_centro_comercial', registrador_centro_comercialSchema);
