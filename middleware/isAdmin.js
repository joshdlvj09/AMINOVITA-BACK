const User = require('../models/user');

module.exports = async function (req, res, next) {
    try {
        const usuario = await User.findById(req.usuario.id);
        if (!usuario || usuario.role !== 'admin') {
            return res.status(403).json({ msg: 'Acceso denegado: se requieren permisos de administrador' });
        }
        next();
    } catch (error) {
        res.status(500).json({ msg: 'Error al verificar permisos' });
    }
};
