const express = require('express');
const router = express.Router();
// 👇 AQUÍ ESTÁ LA CLAVE: Debe importar 'productoController'
const productoController = require('../controllers/productoController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// api/productos
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId); // Para detalles
router.post('/', auth, isAdmin, productoController.crearProducto);
router.put('/:id', auth, isAdmin, productoController.actualizarProducto);   // Para editar
router.delete('/:id', auth, isAdmin, productoController.eliminarProducto);  // Para borrar

module.exports = router;