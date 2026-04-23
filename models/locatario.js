const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
 
const locatarioSchema = new mongoose.Schema({
    local : {
        type : String,
        required : [true, 'Ingrese el local.'],
        trim : true,
        maxlength : [20, 'Local no puede superar los 20 caracteres.']
    },
    nombre_local : {
        type : String,
        required : [true, 'Ingrese su nombre.'],
        trim : true,
        maxlength : [100, 'Nombre no puede superar los 100 caracteres.']
    },
    nit_local : {
        type : String,
        required : [true, 'Ingrese el NIT.'],
        trim : true,
        maxlength : [20, 'NIT no puede superar los 20 caracteres.']
    },
    marca : {
        type : mongoose.Schema.ObjectId,
        ref : 'Marca',
        required : [true, 'Ingrese el código de la marca.'],
    },   
    segmento : {
        type : mongoose.Schema.ObjectId,
        ref : 'Segmento',
        required : [true, 'Ingrese el código del segmento.'],
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
    fecha_modificación : {
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

module.exports = mongoose.model('Locatario', locatarioSchema);
