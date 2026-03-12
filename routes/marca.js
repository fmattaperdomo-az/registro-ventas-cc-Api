const express = require('express');
const router = express.Router();
 
const { 
    obtenerMarca,
    obtenerMarcas,
    obtenerMarcasPaginada,
    crearMarca,
    actualizarMarca,
    borrarMarca
} = require('../controllers/marcaController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/marca/:id').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerMarca);
router.route('/marcas').get(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),obtenerMarcas);
router.route('/marca').post(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearMarca);
router.route('/marca/:id')
    .put(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),actualizarMarca)
    .delete(isAuthenticatedUser, authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),borrarMarca);

module.exports = router;
