import { Router } from 'express'

const router = Router()

// Importación controlador productos

import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/products.controller'

// Importación middlewares para comprobar JWT
import { authJwt } from '../middlewares'

router.get('/', getProducts)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], createProduct)

router.get('/:productId', getProductById)

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin],  updateProductById)

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], deleteProductById)


export default router