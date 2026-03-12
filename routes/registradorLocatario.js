const express = require('express');
const router = express.Router();

const { 
    obtenerRegistradorLocatario,
    obtenerRegistradorLocatarios,
    obtenerRegistradorLocatariosPaginada,
    crearRegistradorLocatario,
    actualizarRegistradorLocatario,
    borrarRegistradorLocatario
} = require('../controllers/registradorLocatarioController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/registradorLocatario/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerRegistradorLocatario);
router.route('/registradorLocatarios').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerRegistradorLocatarios);
router.route('/registradorLocatario').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador','propietario_sistema'),crearRegistradorLocatario);
router.route('/registradorLocatario/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarRegistradorLocatario)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarRegistradorLocatario);

module.exports = router;
