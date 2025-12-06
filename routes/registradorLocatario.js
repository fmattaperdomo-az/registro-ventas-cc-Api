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

router.route('/registradorLocatario/:id').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerRegistradorLocatario);
router.route('/registradorLocatarios').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerRegistradorLocatarios);
router.route('/registradorLocatario').post(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),crearRegistradorLocatario);
router.route('/registradorLocatario/:id')
    .put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarRegistradorLocatario)
    .delete(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),borrarRegistradorLocatario);

module.exports = router;
