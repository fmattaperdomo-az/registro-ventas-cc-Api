// crea y envia el token para ser guardado en cookie
const sendToken = (usuario, statusCode, res) => {
    // Crea JWT Token
    var token = usuario.getJwtToken();

    // Opciones para cookie
    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000),
        httpOnly : true
    };

     if(process.env.NODE_ENV === 'produccion') {
         options.secure = true;
     }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            resultado : true,
            token
        });

    
}

module.exports = sendToken;