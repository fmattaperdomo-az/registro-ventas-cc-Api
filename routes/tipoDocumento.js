const express = require('express');
const router = express.Router();
 
const { 
    obtenerTipoDocumento,
    obtenerTipoDocumento,
    obtenerTipoDocumentosPaginada,
    crearTipoDocumento,
    actualizarTipoDocumento,
    borrarTipoDocumento
} = require('../controllers/tipoDocumentoController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/tipoDocumento/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerTipoDocumento);
router.route('/tipoDocumentos').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerTipoDocumentos);
router.route('/tipoDocumento').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearTipoDocumento);
router.route('/tipoDocumento/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarTipoDocumento)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarTipoDocumento);

module.exports = router;
