const express = require('express');
const router = express.Router();

const { 
    registrarUsuario,
    loginUsuario,
    olvidoClave,
    reseteoClave,
    logout
 } = require('../controllers/authContoller');

 const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/registrar').post(registrarUsuario);
router.route('/login').post(loginUsuario);

router.route('/clave/olvido').post(olvidoClave);

router.route('/clave/reseteo/:token').put(reseteoClave);

router.route('/logout').get(isAuthenticatedUser, logout);

module.exports = router;