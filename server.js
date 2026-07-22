const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Render está detrás de un proxy inverso; necesario para que express-rate-limit
// identifique correctamente la IP real de cada visitante.
app.set('trust proxy', 1);

// --- 1. MIDDLEWARES (Configuraciones) ---

// Lista blanca de orígenes permitidos a llamar la API
const allowedOrigins = [
    'https://aminovitaquimicos.com.mx',
    'https://www.aminovitaquimicos.com.mx',
    'https://aminovita.netlify.app',
    process.env.FRONTEND_URL,
    'http://localhost:5500',
    'http://127.0.0.1:5500'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Sin header Origin (curl, Postman, servidor-a-servidor) siempre se permite
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Origen no permitido por CORS'));
    }
}));

// Aumentamos el límite a 50mb para que quepan las imágenes en texto (Base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- 2. CONEXIÓN A BASE DE DATOS (Directa) ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aminovita')
    .then(() => console.log("✅ Base de Datos Conectada Exitosamente"))
    .catch(err => console.error("❌ Error al conectar BD:", err));

// --- 3. RUTAS ---

// A. Autenticación (Login, Registro, Perfil)
app.use('/api/auth', require('./routes/authRoutes'));

// B. Productos (Catálogo y Administración)
app.use('/api/productos', require('./routes/productoRoutes')); 

// C. Contacto 👇 ¡ACTIVADO Y DESCOMENTADO AQUÍ! 👇
app.use('/api/contacto', require('./routes/contacto'));

// D. Proveedores (Administración Privada)
app.use('/api/proveedores', require('./routes/proveedores'));


// --- 4. MANEJO DE ERRORES DE CORS ---
// Devuelve un JSON limpio en vez del stack trace por defecto de Express
app.use((err, req, res, next) => {
    if (err.message === 'Origen no permitido por CORS') {
        return res.status(403).json({ msg: 'Origen no permitido' });
    }
    next(err);
});


// --- 5. ARRANCAR SERVIDOR ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});