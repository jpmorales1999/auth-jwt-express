// Importación modelo de usuario
import User from '../models/User'
import Role from '../models/Role'

// Json Web Token
import jwt from 'jsonwebtoken'

// Config
import config from '../config'

export const signup = async (req, res) => {
    const { username, email, password, roles } = req.body 

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    // Comprobar si recibo roles

    if (roles) {
        // Buscar si el rol llegado por req.body se encuentra en la base de datos
        const foundRols = await Role.find({name: {$in: roles}})

        // Se agrega al document user los ids de cada rol
        newUser.roles = foundRols.map(role => role._id)
    } else {
        // Si llegan roles en el req.body, se coloca por defecto el rol user

        const role = await Role.findOne({name: "user"})

        newUser.roles = [role._id]
    }

    const saveUser = await newUser.save()

    /* Configuración JWT (id del usuario, clave secreta y configuración) */

    const token = jwt.sign({id: saveUser._id}, config.SECRET, {
        expiresIn: 86400 // 24 Horas
    })

    res.status(200).json({token})
}

export const signin = async (req, res) => {
    // Buscar usuario por email y con la relación de Roles 
     
    const userFound = await User.findOne({email: req.body.email}).populate('roles')

    if (!userFound) {
        return res.status(400).json({message: "User not found"})
    }

    const validatePassword = await User.comparePassword(req.body.password, userFound.password)

    if (!validatePassword) {
        return res.status(401).json({token: null, message: "Invalid password"})
    }

    /* Configuración JWT (id del usuario, clave secreta y configuración) */

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400 // 24 Horas
    })

    res.json({token})
}
