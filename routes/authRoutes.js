const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { loginLimiter, authLimiter } = require('../middleware/rateLimiter');

// Rutas de Registro y Login
router.post('/register', authLimiter, authController.registrarUsuario);
router.post('/send-code', authLimiter, authController.enviarCodigoRegistro);
router.post('/login', loginLimiter, authController.iniciarSesion);

// Rutas de Recuperación de Contraseña
router.post('/olvide-password', authLimiter, authController.olvidePassword);
router.post('/nuevo-password', authLimiter, authController.guardarNuevoPassword);

// Rutas Privadas (Perfil y Favoritos)
router.get('/perfil', auth, authController.obtenerPerfil);
router.post('/favoritos', auth, authController.toggleFavorito);
router.get('/favoritos', auth, authController.obtenerFavoritos);

module.exports = router;