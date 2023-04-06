//primero importamos la libreria expressjs para poder utilizarlo en nuestro proyecto.
const express = require('express')
const cors = require('cors')

// creamos una app con la libreria express
const app = express()

app.use(cors())
app.use(express.json())

// creamos una lista de jugadores que se iran conectando a nuestro juego
const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mokepon {
    constructor (nombre) {
        this.nombre = nombre
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

app.post('/mokepon/:jugadorId', (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post('/mokepon/:jugadorId/posicion', (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post('/mokepon/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

    res.end()
})

app.get('/mokepon/:jugadorId/ataques', (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send ({
        ataques: jugador.ataques || []
    })
})
// le indicamos que escuche constantemente en el puerto 8080 para que pueda responder cuando reciba una peticion de algun cliente.
app.listen(8080, () => {
    console.log('servidor funcionando')
})