const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('MONGO configurado:', !!process.env.MONGO); // Verifica si la variable de entorno MONGO está configurada

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
/*
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Conectado a la base de datos de MongoDB');

        app.listen(3000, () => {
            console.log('Servidor escuchando en el puerto 3000');
        });
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
    });
    */

    mongoose.connect(process.env.MONGO, {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log('Conectado a la base de datos de MongoDB');

    app.listen(3000, () => {
        console.log('Servidor escuchando en el puerto 3000');
    });
})
.catch((err) => {
    console.error('ERROR AL CONECTAR A MONGODB:');
    console.error(err);
});