const express = require('express');
const router = express.Router();

const { 
    obtenerParametro,
    obtenerParametros,
    obtenerParametrosPaginada,
    crearParametro,
    actualizarParametro,
    borrarParametro
} = require('../controllers/parametroController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/parametro/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerParametro);
router.route('/parametros').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerParametros);
router.route('/parametro').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearParametro);
router.route('/parametro/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarParametro)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarParametro);

module.exports = router;
