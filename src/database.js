import mongoose from 'mongoose'

// Conectando a la base de datos MongoDB
mongoose.connect('mongodb://localhost/api-auth-jwt-node')
    .then(db => console.log('Base de datos Conectada'))
    .catch(error => console.log(error))
