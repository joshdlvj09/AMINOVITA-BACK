// =======================================================
// RUTAS PARA EL CONTROL DE PROVEEDORES
// Archivo: backend/routes/proveedores.js
// =======================================================

const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const auth = require('../middleware/auth'); // Middleware que valida el JWT (x-auth-token)
const isAdmin = require('../middleware/isAdmin'); // Middleware que exige rol de administrador

// ── RUTA GENERAL: /api/proveedores ───────────────────────
// Directorio privado: todas las rutas requieren sesión de administrador.

// POST: api/proveedores -> Crear un nuevo proveedor privado
router.post('/', auth, isAdmin, proveedorController.crearProveedor);

// GET: api/proveedores -> Obtener la lista completa de proveedores
router.get('/', auth, isAdmin, proveedorController.obtenerProveedores);


// ── RUTAS ESPECÍFICAS: /api/proveedores/:id ──────────────

// GET: api/proveedores/:id -> Obtener los detalles de un único proveedor para precargar el modal
router.get('/:id', auth, isAdmin, proveedorController.obtenerProveedorPorId);

// PUT: api/proveedores/:id -> Actualizar la información completa de un proveedor existente
router.put('/:id', auth, isAdmin, proveedorController.actualizarProveedor);

// DELETE: api/proveedores/:id -> Eliminar un proveedor de la base de datos
router.delete('/:id', auth, isAdmin, proveedorController.eliminarProveedor);


module.exports = router;