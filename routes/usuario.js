const express = require('express');
const router = express.Router();
 
const { 
    obtenerUsuarios,
    actualizarClave,
    actualizarUsuario
 } = require('../controllers/usuarioController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/clave/actualizar').put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarClave);
router.route('/usuario/actualizar').put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarUsuario);

router.route('/usuarios').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerUsuarios);

module.exports = router;
