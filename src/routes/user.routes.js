import { Router } from 'express'

const router = Router()

// Importación de controlador
import { createUser } from '../controllers/users.controller'
import { authJwt, verifySignUp } from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkRolesExisted], createUser)

router.post('/', createUser)

export default router