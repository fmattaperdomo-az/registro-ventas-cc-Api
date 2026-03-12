const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const usuarioSchema = new mongoose.Schema({
    nombre_completo : {
        type : String,
        required : [true, 'Ingrese su nombre completo'],
        trim : true,
        maxlength : [200, 'Nombre completo no puede superar los 200 caracteres.']
    },
    correo : {
        type : String,
        required : [true, 'Ingrese su correo electrónico'],
        trim : true,
        maxlength : [100, 'Nombre completo no puede superar los 100 caracteres.'],
        unique : true,
        validate : [validator.isEmail, 'Ingrese un correo electrónico válido']
    },
    rol : {
        type : String,
        enum : {
            values : ['usuario_registrador', 'administrador_centro_comercial', 'admin_administrador', 'propietario_sistema'],
            message : 'Por favor seleccione un rol correcto'
        },
        required : [true, 'Seleccione el rol que es obligatorio'],
        default : 'usuario_registrador'
    },
    clave : {
        type : String,
        required : [true, 'Ingrese una contraseña'],
        minlength : [8, 'Su contraseña debe tener almenos 8 caracteres'],
        trim : true,
        maxlength : [16, 'Contraseña no puede superar los 16 caracteres.'],
        select : false
    },
    fecha_registro : {
        type : Date,
        default : Date.now
    },
    fecha_modificacion : {
        type : Date,
        default : Date.now
    },    
    resetPasswordToken : String,
    resetPasswordExpire : Date
},
{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

// Encripta la contraseña 
usuarioSchema.pre('save', async function(next) {
    if(!this.isModified('clave')) {
        next();
    }

    this.clave = await bcrypt.hash(this.clave, 10)
});

// Retorna JSON Web Token
usuarioSchema.methods.getJwtToken = function() {
    return jwt.sign({ id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    });
}

// compara la contraseña 
usuarioSchema.methods.comparePassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.clave);
}

// genera una contraseña 
usuarioSchema.methods.getResetPasswordToken = function() {
    // genera token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Resetea la contraseña
    this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

    // Expiración del token
    this.resetPasswordExpire = Date.now() + 30*60*1000;

    return resetToken;
}

module.exports = mongoose.model('Usuario', usuarioSchema);