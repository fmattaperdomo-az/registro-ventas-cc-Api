const express = require('express');
const router = express.Router();

const { 
    obtenerRegistrador,
    obtenerRegistradores,
    obtenerRegistradoresPaginada,
    crearRegistrador,
    actualizarRegistrador,
    borrarRegistrador
} = require('../controllers/registradorController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/registrador/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerRegistrador);
router.route('/registradores').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerRegistradores);
router.route('/registrador').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador','propietario_sistema'),crearRegistrador);
router.route('/registrador/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarRegistrador)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarRegistrador);

module.exports = router;
