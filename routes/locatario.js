const express = require('express');
const router = express.Router();

const { 
    obtenerLocatario,
    obtenerLocatarios,
    obtenerLocatariosPaginada,
    crearLocatario,
    actualizarLocatario,
    borrarLocatario
} = require('../controllers/locatarioController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/locatario/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerLocatario);
router.route('/locatarios').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerLocatarios);
router.route('/locatario').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearLocatario);
router.route('/locatario/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarLocatario)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarLocatario);

module.exports = router;
