//primero importamos la libreria expressjs para poder utilizarlo en nuestro proyecto.
const express = require('express')

// creamos una app con la libreria express
const app = express()

// creamos una lista de jugadores que se iran conectando a nuestro juego
const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }
}

// le indicamos a expressjs que cuando reciba una peticion responda con le mensaje hola.
app.get('/unirse', (req, res) => {
    const id = `${Math.random()}`
    
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader('Access-Control-Allow-Origin', '*')

    res.send(id)
})

// le indicamos que escuche constantemente en el puerto 8080 para que pueda responder cuando reciba una peticion de algun cliente.
app.listen(8080, () => {
    console.log('servidor funcionando')
})