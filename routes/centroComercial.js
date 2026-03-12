const express = require('express');
const router = express.Router();

const { 
    obtenerCentroComercial,
    obtenerCentroComerciales,
    obtenerCentroComercialesPaginada,
    crearCentroComercial,
    actualizarCentroComercial,
    borrarCentroComercial
} = require('../controllers/centroComercialController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/centroComercial/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerCentroComercial);
router.route('/centroComerciales').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerCentroComerciales);
router.route('/centroComercial').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearCentroComercial);
router.route('/centroComercial/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarCentroComercial)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarCentroComercial);

module.exports = router;
 