const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');


console.log(process.env.MONGO);

mongoose.connect(process.env.MONGO).then(() => {
    console.log('conectado a la base de datos de MONGODB');
}).catch((err) => {
    console.log('error al conectar a la base de datos de MONGODB', err);
});

const app = express(); // Crear una instancia de Express

app.use(express.json()); // para que el servidor pueda entender el formato JSON en las peticiones

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use((err, req, res, next) => { // Middleware de manejo de errores
    const statusCode = err.statusCode || 500; // Si el error tiene un código de estado, úsalo; de lo contrario, usa 500 (Error Interno del Servidor)
    const message = err.message || 'Error interno del servidor'; // Si el error tiene un mensaje, úsalo; de lo contrario, usa un mensaje genérico

    return res.status(statusCode).json({ // Devuelve una respuesta JSON con el estado de error, el código de estado y el mensaje de error
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () =>{
    console.log('server escuchado en el puerto 3000');
});
