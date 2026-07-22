const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

exports.enviarCorreo = async (req, res) => {
    // Recibimos los datos del formulario
    const { nombre, email, empresa, mensaje } = req.body;

    try {
        // Enviar Correo con Resend
        await resend.emails.send({
            from: 'Aminovita Web <contacto@aminovitaquimicos.com.mx>',
            to: 'direccion@aminovitaquimicos.com.mx', // Se envía a la bandeja de la empresa
            reply_to: email, // Corregido: Resend requiere 'reply_to' (snake_case)
            subject: `Nuevo Mensaje de: ${nombre}`,
            html: `
                <h3>Tienes un nuevo prospecto</h3>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Correo:</strong> ${email}</p>
                <p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
                <hr>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `
        });

        res.status(200).json({ msg: '¡Correo enviado con éxito!' });

    } catch (error) {
        console.error('Error enviando correo:', error);
        res.status(500).json({ msg: 'Error al enviar el correo' });
    }
};