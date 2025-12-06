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

router.route('/marca/:id').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerMarca);
router.route('/marcas').get(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),obtenerMarcas);
router.route('/marca').post(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),crearMarca);
router.route('/marca/:id')
    .put(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),actualizarMarca)
    .delete(isAuthenticatedUser, authorizeRoles('registrador_locatario', 'registrador_centro_comercial','administrador'),borrarMarca);

module.exports = router;
