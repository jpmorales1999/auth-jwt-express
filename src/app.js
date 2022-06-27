// Importación express - Framework backend
import express from 'express'
import morgan from 'morgan'

// Iniciar Roles de la aplicación
import { createRoles } from './libs/initialSetup'

const app = express()
createRoles()

// Importación de Rutas
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

// Configuraciones
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app