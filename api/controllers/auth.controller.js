const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); 

const signup = async (req, res) => {
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
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: error.message }); // Enviamos una respuesta de error si ocurre algún problema al guardar el usuario
    }


};

module.exports = {
    signup
}
