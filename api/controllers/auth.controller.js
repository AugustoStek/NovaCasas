const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); 

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // El número 10 es el costo de hashing, puedes ajustarlo según tus necesidades

    const newUser = new User({ // Creamos un nuevo usuario con la contraseña hasheada
        username,
        email,
        password: hashedPassword // Guardamos la contraseña hasheada en lugar de la original
    });

    try {
        await newUser.save(); // Guardamos el nuevo usuario en la base de datos
        res.status(201).json('Usuario creado correctamente'); // Enviamos una respuesta indicando que el usuario fue creado exitosamente
        //console.log("Usuario guardado correctamente"); // Puedes usar esto para verificar en la consola que el usuario se ha guardado correctamente
    } catch (error) {
        next(error); // Si ocurre un error, lo pasamos al middleware de manejo de errores
        //next(errorHandler(550, 'error de la función signup')); // Si ocurre un error, lo pasamos al middleware de manejo de errores con un mensaje personalizado
    }
};

module.exports = {
    signup
}
