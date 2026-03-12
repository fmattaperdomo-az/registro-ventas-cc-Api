const express = require('express');
const router = express.Router();

const { 
    obtenerSegmento,
    obtenerSegmentos,
    obtenerSegmentosPaginada,
    crearSegmento,
    actualizarSegmento,
    borrarSegmento
} = require('../controllers/segmentoController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/segmento/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerSegmento);
router.route('/segmentos').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerSegmentos);
router.route('/segmento').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearSegmento);
router.route('/segmento/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarSegmento)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarSegmento);

module.exports = router;
