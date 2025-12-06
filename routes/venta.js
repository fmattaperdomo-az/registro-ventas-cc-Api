const express = require('express');
const router = express.Router();

const { obtenerVenta,
        crearVenta,
        obtenerVentasPaginada,
        obtenerVentasLocatario,
        obtenerVentasLocatarioFecha,
        obtenerVentasLocatarioRangoFechas,
        actualizarVenta,
        estadisticasVentas} = require('../controllers/ventaController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/venta').post(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),crearVenta)

router.route('/venta/:id')
    .get(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),obtenerVenta)
    .put(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),actualizarVenta);

router.route('/ventas').get(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),obtenerVentasPaginada);
router.route('/ventas/:locatario').get(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),obtenerVentasLocatario);
router.route('/ventas/:locatario/:fecha_registro').get(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),obtenerVentasLocatarioFecha);
router.route('/ventas/:locatario/:fechaIni/:fechaFin').get(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),obtenerVentasLocatarioRangoFechas);
router.route('/estadisticas/:topico').get(isAuthenticatedUser,authorizeRoles('registrador_locatario','administrador'),estadisticasVentas);

module.exports = router;
