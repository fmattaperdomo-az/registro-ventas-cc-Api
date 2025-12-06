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

router.route('/parametro/:id').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerParametro);
router.route('/parametros').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerParametros);
router.route('/parametro').post(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),crearParametro);
router.route('/parametro/:id')
    .put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarParametro)
    .delete(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),borrarParametro);

module.exports = router;
