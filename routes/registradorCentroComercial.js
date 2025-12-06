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

router.route('/registradorCentroComercial/:id').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerRegistradorCentroComercial);
router.route('/registradorCentroComerciales').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerRegistradorCentroComerciales);
router.route('/registradorCentroComercial').post(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),crearRegistradorCentroComercial);
router.route('/registradorCentroComercial/:id')
    .put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarRegistradorCentroComercial)
    .delete(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),borrarRegistradorCentroComercial);

module.exports = router;
