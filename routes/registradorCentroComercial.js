const express = require('express');
const router = express.Router();

const { 
    obtenerRegistradorCentroComercial,
    obtenerRegistradorCentroComerciales,
    obtenerRegistradorCentroComercialesPaginada,
    crearRegistradorCentroComercial,
    actualizarRegistradorCentroComercial,
    borrarRegistradorCentroComercial
} = require('../controllers/registradorCentroComercialController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/registradorCentroComercial/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerRegistradorCentroComercial);
router.route('/registradorCentroComerciales').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerRegistradorCentroComerciales);
router.route('/registradorCentroComercial').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearRegistradorCentroComercial);
router.route('/registradorCentroComercial/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarRegistradorCentroComercial)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarRegistradorCentroComercial);

module.exports = router;
