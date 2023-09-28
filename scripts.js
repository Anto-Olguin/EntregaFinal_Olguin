// Inicializa la puntuación en 0
let puntaje = 0
const opciones = ["piedra", "papel", "tijera"]

function eleccionPc(){
    const randomIndex = Math.floor(Math.random() * opciones.length)
    return opciones[randomIndex]
}

function ronda(eleccionJugador, eleccionCompu){
    if(eleccionJugador === eleccionCompu){
        return "Empate."
    }else if(
        (eleccionJugador === "piedra" && eleccionCompu === "tijera") ||
        (eleccionJugador === "papel" && eleccionCompu === "piedra") ||
        (eleccionJugador === "tijera" && eleccionCompu === "papel")
    ){
        // Suma 3 puntos al puntaje si ganas
        puntaje += 3;
        return "¡Ganaste!"
    }else{
        return "¡Perdiste!"
    }
}

function partida(eleccionJugador){
    const eleccionCompu = eleccionPc()
    const resultado = ronda(eleccionJugador, eleccionCompu)
    const resultadoMostrado = document.querySelector(".resultado p")
    resultadoMostrado.textContent = `Elegiste ${eleccionJugador}. La computadora eligió ${eleccionCompu}. ${resultado}`

    if(resultado === "¡Ganaste!"){
        Toastify({
            text: "¡Sumaste 3 puntos!",
            className: "info",
            style: {
                background: "#98CD3C",
            },
        }).showToast()
    }

// Guarda el puntaje en local
localStorage.setItem("puntaje", puntaje)
}

// Recupera el puntaje almacenado en local
puntaje = parseInt(localStorage.getItem("puntaje")) || 0

// Muestra el puntaje
const puntajeMostrado = document.querySelector(".puntaje")
puntajeMostrado.textContent = `Puntaje: ${puntaje}`

const botones = document.querySelectorAll("button")
botones.forEach((button) => {
    button.addEventListener("click", () => {
    partida(button.id);
    });
});