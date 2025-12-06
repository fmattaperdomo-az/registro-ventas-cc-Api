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

router.route('/locatario/:id').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerLocatario);
router.route('/locatarios').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerLocatarios);
router.route('/locatario').post(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),crearLocatario);
router.route('/locatario/:id')
    .put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarLocatario)
    .delete(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),borrarLocatario);

module.exports = router;
