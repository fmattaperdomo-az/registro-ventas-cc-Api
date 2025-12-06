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

router.route('/segmento/:id').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerSegmento);
router.route('/segmentos').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerSegmentos);
router.route('/segmento').post(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),crearSegmento);
router.route('/segmento/:id')
    .put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarSegmento)
    .delete(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),borrarSegmento);

module.exports = router;
