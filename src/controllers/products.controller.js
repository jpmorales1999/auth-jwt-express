// Importando el modelo de la base de datos
import Product from '../models/Product'

export const createProduct = async (req, res) => {
    const { name, category, price, imageURL } = req.body

    const newProduct = new Product({name, category, price, imageURL})

    const productSave = await newProduct.save()

    res.status(200).json(productSave)
}

export const getProducts = async (req, res) => {
    const productList = await Product.find()

    res.status(200).json(productList)
}

export const getProductById = async (req, res) => {
    const oneProduct = await Product.findById(req.params.productId)

    res.status(200).json(oneProduct)
}

export const updateProductById = async (req, res) => {
    const { name, category, price, imageURL } = req.body

    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {new: true})

    res.status(200).json(updateProduct)
}

export const deleteProductById = async (req, res) => {
    const productDelete = await Product.findOneAndDelete(req.params.productId)

    res.status(200).json(productDelete)
}