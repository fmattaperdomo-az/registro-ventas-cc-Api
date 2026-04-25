const Usuario = require('../models/usuario');
const Registrador = require('../models/registrador');
const CentroComercial = require('../models/centroComercial');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
 
//Registrar usuario ==> /api/v1/registrar
exports.registrarUsuario = catchAsyncErrors(async (req,res,next) => {
    const {nombre_completo, correo,rol, clave, usuario_registro} = req.body;
    const usuario = await Usuario.create({
        nombre_completo, 
        correo,
        rol, 
        clave,
        usuario_registro

    });
    res.status(200).json({
        resultado: true,
        mensaje : 'Usuario registrado.',
        data : usuario
    });

    sendToken(usuario, 200, res);
});

// Login Usuario  =>  /api/v1/login
exports.loginUsuario = catchAsyncErrors( async (req, res, next) => {
    const { correo, clave } = req.body;

    // Valida el ingreso del correo y clave ingresado por el usuario
    if(!correo || !clave) {
        return next(new ErrorHandler('Ingrese el correo y clave del usuario'), 400)
    }

    // Buscando el usuario en la BD 
    const usuario = await Usuario.findOne({correo}).select('+clave');

    if(!usuario) {
        return next(new ErrorHandler('Correo y Clave inválido.', 401))
    }

    // Validación de la clave
    const isPasswordMatched = await usuario.comparePassword(clave);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Correo o Clave inválido.', 401));
    }

    let centroComercial = null;
    //Buscando el centro comercial del registrador locatario
    const registrador = await Registrador.findOne({correo : usuario.correo});
    if(registrador) {
        centroComercial = await CentroComercial.findById(registrador.centro_comercial);
    }
    sendToken(usuario, centroComercial,registrador, 200, res);
});

// Olvido de clave  =>  /api/v1/clave/olvido
exports.olvidoClave = catchAsyncErrors( async (req, res, next) => {
    const usuario = await Usuario.findOne({correo : req.body.correo});

    // Valida el correo del usuario
    if(!usuario) {
        return next(new ErrorHandler('No existe el usuario con este correo.', 404));
    }

    // Reseteo del token 
    const resetToken = usuario.getResetPasswordToken();

    await usuario.save({ validateBeforeSave : false });

    // crea el reseteo de la clave 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/clave/reseteo/${resetToken}`;

    const message = `El link de reseteo de la clave :\n\n${resetUrl}\n\n Ignorar este mensaje si no lo ha solicitado.`

    try {
        await sendEmail({
            email : usuario.correo,
            subject : 'Registro-Ventas-CC-API Recuperación de clave.',
            message
        });
    
        res.status(200).json({
            resultado : true,
            mensaje : `Correo enviado exitosamente a : ${usuario.correo}`
        });
    } catch (error) {
        usuario.resetPasswordToken = undefined;
        usuario.resetPasswordExpire = undefined;
    
        await usuario.save({ validateBeforeSave : false });

        return next(new ErrorHandler('Correo no fue enviado.'), 500);
    } 
});

// Reseteo clave   =>   /api/v1/clave/reseteo/:token
exports.reseteoClave = catchAsyncErrors(async(req, res, next) => {
    // Hash url token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const usuario = await Usuario.findOne({ 
        resetPasswordToken, 
        resetPasswordExpire: {$gt : Date.now() }
    });

    if(!usuario) {
        return next(new ErrorHandler('El token no es válido o ha expirado.', 400));
    }

    // Configura una nueva clave
    usuario.clave = req.body.clave;

    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordExpire = undefined;

    await usuario.save();

    sendToken(usuario, 200, res);
});

// Logout usuario   =>   /api/v1/logout
exports.logout = catchAsyncErrors( async(req, res, next) => {
    res.cookie('token', 'none', {
        expires : new Date(Date.now()),
        httpOnly : true 
    });

    res.status(200).json({
        resultado : true,
        mensaje : 'Logout exitosamente.'
    });
});

