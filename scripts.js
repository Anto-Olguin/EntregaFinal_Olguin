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
        return "¡Ganaste!"
    }else{
        return "¡Perdiste!"
    }
}

function partida(eleccionJugador) {
    const eleccionCompu = eleccionPc()
    const resultado = ronda(eleccionJugador, eleccionCompu)
    const resultadoMostrado = document.querySelector(".resultado p")
    resultadoMostrado.textContent = `Elegiste ${eleccionJugador}. La computadora eligió ${eleccionCompu}. ${resultado}`

    if (resultado === "¡Ganaste!") {
        Toastify({
            text: "¡Sumaste 3 puntos!",
            className: "info",
            style: {
            background: "#98CD3C",
            }
        }).showToast()
    }

// uso de Storage
    const resultadoJuego = {
        eleccionJugador,
        eleccionCompu,
        resultado,
        timestamp: new Date().toLocaleString()
    }

    const historial = JSON.parse(localStorage.getItem("historial")) || []
    historial.push(resultadoJuego)
    localStorage.setItem("historial", JSON.stringify(historial))
}

const botones = document.querySelectorAll("button")
botones.forEach((button) => {
    button.addEventListener("click", () => {
        partida(button.id)
    })
})