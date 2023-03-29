//primero importamos la libreria expressjs para poder utilizarlo en nuestro proyecto.
const express = require('express')

// creamos una app con la libreria express
const app = express()

// le indicamos a expressjs que cuando reciba una peticion responda con le mensaje hola.
app.get('/', (req, res) => {
    res.send('Hola')
})

// le indicamos que escuche constantemente en el puerto 8080 para que pueda responder cuando reciba una peticion de algun cliente.
app.listen(8080, () => {
    console.log('servidor funcionando')
})