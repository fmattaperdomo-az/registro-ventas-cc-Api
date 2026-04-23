const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const centro_comercialSchema = new mongoose.Schema({
    nombre_cc : {
        type : String,
        required : [true, 'Ingrese el nombre.'],
        trim : true,
        maxlength : [100, 'Nombre no puede superar los 100 caracteres.']
    },
    nit_cc : {
        type : String,
        required : [true, 'Ingrese el NIT.'],
        trim : true,
        maxlength : [20, 'NIT no puede superar los 20 caracteres.']
    },
    alias : {
        type : String,
        required : [true, 'Ingrese su descripción.'],
        trim : true,
        maxlength : [100, 'Descripción no puede superar los 100 caracteres.']
    },
    pagina_web : String,
    direccion_principal : {
        type : String,
        required : [true, 'Ingrese la dirección del centro comercial.'],
        trim : true,
        maxlength : [250, 'Dirección del centro comercial no puede superar los 250 caracteres.']
    },
    contacto_principal : {
        type : String,
        required : [true, 'Ingrese el nombre del contacto principal.'],
        trim : true,
        maxlength : [200, 'Nombre del contacto principal no puede superar los 200 caracteres.']
    },
    telefono_principal : {
        type : String,
        required : [true, 'Ingrese el teléfono del contacto principal.'],
        trim : true,
        maxlength : [20, 'Teléfono del contacto principal no puede superar los 20 caracteres.']
    },
    correo_principal : {
        type : String,
        required : [true, 'Ingrese el correo del contacto principal.'],
        trim : true,
        maxlength : [100, 'Correo del contacto principal no puede superar los 100 caracteres.'],
        validate : [validator.isEmail, 'Ingrese un correo electrónico válido.']
    },
    activo : {
        type : Number,
        default:1
    },
    fecha_inicio : {
        type : Date,
        default : Date.now
    },    
    fecha_fin : {
        type : Date,
        default : Date.now
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

// Crea un URL Slug antes de salvar
centro_comercialSchema.pre('save', function(next) {
    this.pagina_web = slugify(this.pagina_web, {lower : true});

    next();
});

module.exports = mongoose.model('Centro_Comercial', centro_comercialSchema);
