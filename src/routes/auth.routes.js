import { Router } from 'express'

const router = Router()

// Importación controlador auth
import { signin, signup } from '../controllers/auth.controller'
import { verifySignUp } from '../middlewares'

router.post('/signin', signin)

router.post('/signup', [verifySignUp.checkDuplicatedUsernameOrEmail, verifySignUp.checkRolesExisted], signup)

export default router