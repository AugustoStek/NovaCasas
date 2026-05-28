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

app.listen(3000, () =>{
    console.log('server escuchado en el puerto 3000');
});
