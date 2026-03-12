const express = require('express');
const router = express.Router();
 
const { 
    obtenerUsuarios,
    actualizarClave,
    actualizarUsuario,
    obtenerUsuario

 } = require('../controllers/usuarioController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/clave/actualizar').put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarClave);
router.route('/usuario/actualizar').put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarUsuario);

router.route('/usuarios').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerUsuarios);

router.route('/usuarios/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerUsuario);

module.exports = router;
