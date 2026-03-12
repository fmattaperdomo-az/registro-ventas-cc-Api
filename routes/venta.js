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

router.route('/venta').post(isAuthenticatedUser,authorizeRoles('usuario_registrador', 'administrador_centro_comercial','admin_administrador', 'propietario_sistema'),crearVenta)

router.route('/venta/:id')
    .get(isAuthenticatedUser,authorizeRoles('usuario_registrador','admin_administrador', 'propietario_sistema'),obtenerVenta)
    .put(isAuthenticatedUser,authorizeRoles('usuario_registrador','admin_administrador', 'propietario_sistema'),actualizarVenta);

router.route('/ventas').get(isAuthenticatedUser,authorizeRoles('usuario_registrador','admin_administrador', 'propietario_sistema'),obtenerVentasPaginada);
router.route('/ventas/:locatario').get(isAuthenticatedUser,authorizeRoles('usuario_registrador','admin_administrador', 'propietario_sistema'),obtenerVentasLocatario);
router.route('/ventas/:locatario/:fecha_registro').get(isAuthenticatedUser,authorizeRoles('usuario_registrador','admin_administrador', 'propietario_sistema'),obtenerVentasLocatarioFecha);
router.route('/ventas/:locatario/:fechaIni/:fechaFin').get(isAuthenticatedUser,authorizeRoles('usuario_registrador','admin_administrador', 'propietario_sistema'),obtenerVentasLocatarioRangoFechas);
router.route('/estadisticas/:topico').get(isAuthenticatedUser,authorizeRoles('usuario_registrador','admin_administrador', 'propietario_sistema'),estadisticasVentas);

module.exports = router;
