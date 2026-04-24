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

router.route('/tipo-documento/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerTipoDocumento);
router.route('/tipo-documentos').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerTipoDocumentos);
router.route('/tipo-documento').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearTipoDocumento);
router.route('/tipo-documento/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarTipoDocumento)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarTipoDocumento);

module.exports = router;
