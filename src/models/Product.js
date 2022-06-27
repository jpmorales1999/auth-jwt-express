import { Schema, model } from "mongoose";

// Creando un modelo para los productos

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    imageURL: String
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema)