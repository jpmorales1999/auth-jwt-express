/* Verificar si se envía un Token y es válido */ 

import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
    try {
        /* Crear cabecera con el token */
        const token = req.headers['x-access-token']

        if (!token) {
            res.status(403).json({message: 'No token provided'})
        }

        /* Verificar token */
        const decoded = jwt.verify(token, config.SECRET)

        /* Nuevo req para controlar el id del usuario logueado */
        req.userId = decoded.id

        /* Validar que el token es correcto para el usuario */
        const user = await User.findById(req.userId, {password: 0})

        if (!user) {
            return res.status(404).json({message: 'No user found'})
        }

        next()
    } catch(error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

export const isAdmin = async (req, res, next) => {
    /* Reutilizamos el req.userId almacenado en la verificación del token */
    const user = await User.findById(req.userId)

    const roles = await Role.find({_id: {$in: user.roles}})

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') 
        {
            next()
            return 
        }
    }

    return res.status(403).json({message: 'Requires Admin Rol'})
}