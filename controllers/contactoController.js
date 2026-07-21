const nodemailer = require('nodemailer');

require('dotenv').config();

exports.enviarCorreo = async (req, res) => {
    // Recibimos los datos del formulario
    const { nombre, email, empresa, mensaje } = req.body;

    try {
        // 2. Configuración del Transporte
        // Usamos SMTP explícito con el puerto 587 para evitar el bloqueo de puertos en Render
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true' ? true : false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            connectionTimeout: 10000, // 10 segundos
            greetingTimeout: 10000
        });

        // 3. Configuración del Email
        const mailOptions = {
            from: `"Aminovita Web" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Se envía a ti mismo
            replyTo: email, // Al responder, le respondes al cliente
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
        };

        // 4. Enviar
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: '¡Correo enviado con éxito!' });

    } catch (error) {
        console.error('Error enviando correo:', error);
        res.status(500).json({ msg: 'Error al enviar el correo' });
    }
};