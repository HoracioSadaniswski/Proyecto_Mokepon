//VARIABLES GLOBALES coloco todas las variables que tienen relacion con el documento html
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let vidasJugador = 3
let vidasEnemigo = 3

//clase Mokepon
class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}
//objetos
let hipodoge = new Mokepon('Hipodoge', './assets/kisspng-siberian-husky-wolfdog.png', 5)

let capipepo = new Mokepon('Capipepo', './assets/kisspng-granblue-fantasy-behemoth.png', 5)

let ratigueya = new Mokepon('Ratigueya', './assets/kisspng-brave-frontier-carbuncle-dragon-.png', 5)

//arreglo o array

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya)

// en la funcion iniciarJuego llamamos al elemento boton-mascota para que al hacer clik se seleccione la mascota elegida por el jugador. 
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })

    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

// El document.getElementById me permite ocupar o traer desde el archivo html a js el elemento que queremos utilizar.
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'

    sectionSeleccionarAtaque.style.display = "flex"

    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id;        
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id; 
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id; 
    } else {
        alert('DEBES SELECCIONAR UNA MASCOTA');
    } 

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0, mokepones.length -1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1, 3)

    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO'
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

    combate()
}

function combate(){
    // creando la variable spanVidasJugador y ocupando el metodo document.getElementById ingtreso en el span vidas jugador del html para poder cambiar el resultado que me muestra el mensaje.
    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE")
    }else if((ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') || (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') || (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')) {
        crearMensaje("GANASTE")
        vidasEnemigo -= 1
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador -= 1
        spanVidasJugador.innerHTML = vidasJugador
    }

    // vamos a llamar a una funcion para que revise las vidas de cada jugador luego de un combate, para eso debemos hacer una funcion nueva.
    revisarVidas()
}

function revisarVidas(){
    if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES! GANASTE! 🎆🎉🥳")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("HAS PERDIDO! 😖😥💔")
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
// Para desabilitar los botones una vez que las vidas lleguen a 0, vamos a copiar el llamado de los botones que tenemos en la funcion iniciar juego y luego vamos a ocupar el atributo .disabled = true.
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'
}

//Para reiniciar el juego vamos a utilizar el metodo location.reload. Este metodo va a reiniciar la direccion en la que estamos, es decir va a volver a cargar la pagina html volviendo todos los parametros a 0, como si dieramos click al boton "recargar".
function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//con window.addEventListener lo que hacemos es llamar la funcion 'iniciarJuego' apenas se termine de cargar el contenido html.
window.addEventListener('load', iniciarJuego) 

