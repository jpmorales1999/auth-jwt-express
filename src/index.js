import app from './app'

// Base de datos
import './database'

app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
})