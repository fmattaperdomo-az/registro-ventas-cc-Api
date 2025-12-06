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

router.route('/centroComercial/:id').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerCentroComercial);
router.route('/centroComerciales').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerCentroComerciales);
router.route('/centroComercial').post(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),crearCentroComercial);
router.route('/centroComercial/:id')
    .put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarCentroComercial)
    .delete(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),borrarCentroComercial);

module.exports = router;
 