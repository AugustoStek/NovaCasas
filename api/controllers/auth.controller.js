const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

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

const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email }); // Buscamos un usuario con el correo electrónico proporcionado

        if(!validUser) {
            return next(errorHandler(401, 'Nombre de usuario o contraseña no validos.'));
        }

        const validPassword = await bcrypt.compare(password, validUser.password); // Comparamos la contraseña proporcionada con la contraseña hasheada almacenada en la base de datos

        if(!validPassword) {
            return next(errorHandler(401, 'Nombre de usuario o contraseña no validos.'));
        }

        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest} = validUser._doc;
        res
        
        .cookie(
            'access_token', 
            token, 
            {httpOnly: true}
        )
        .status(200)
        .json(rest);
    } catch (error) {
        next(error); // Si ocurre un error, lo pasamos al middleware de manejo de errores
    }
}

const google = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user){
            const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
            const { password: pass, ...rest} = user._doc;
            res
            .cookie(
                'access_token', 
                token,
                {httpOnly: true}
            )
            .status(200)
            .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8); // Genera una contraseña aleatoria de 8 caracteres
            const hashedPassword = await bcrypt.hash(generatedPassword, 10); // Hashea la contraseña generada
            const newUser = new User({
                username: req.body.name.split(' ').join("").toLowerCase() + Math.random().toString(36).slice(-4), // Genera un nombre de usuario único basado en el nombre del usuario y un número aleatorio
                email: req.body.email,
                password: hashedPassword, // Guardamos la contraseña hasheada en lugar de la original
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET)
            const { password: pass, ...rest} = newUser._doc;
            res
            .cookie(
                'access_token', 
                token,
                {httpOnly: true}
            )
            .status(200)
            .json(rest);
        }
    }catch(error){
        next(error);
    }
};

module.exports = {
    signup, signin, google
}
